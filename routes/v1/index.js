var bCrypt = require('bcrypt-nodejs');
var async = require('async');
var express = require('express');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var email = require("../../utils/mailer");
var router = express.Router();
var BASE_API_URL = "";
var version = "1.0"; // version code
/* congig */
var configuration = require("../../config");

/* controllers */
var ProductHandler = require("../../handlers/product_handler");
var CategoryHandler = require("../../handlers/category_handler");


module.exports = function (passport) {

    /*API to accress root*/
    router.get(BASE_API_URL + '/', function (req, res) {

        var reponseJson = {
            statuscode: 200,
            msgkey: "login.first.to.access.api",
            v: version
        };
        res.json(reponseJson);
    });

   

    

    /* API for GET Home Page */
    router.get(BASE_API_URL + '/home', function (req, res) {
        if (req.user.username) {
            var reponseJson = {
                statuscode: 200,
                msgkey: "login.success",
                v: version,
                data: req.user
            };
        }
        res.json(reponseJson);
    });


    
  


    router.post(BASE_API_URL + '/add_product', function (req, res) {
        var data = req.body;
        ProductHandler.add_product(data, function (response) {
            response.version = version;
            res.json(response);
        });
    });


    router.get(BASE_API_URL + '/list_products', function (req, res) {
        ProductHandler.list_products(function (response) {
            response.version = version;
            res.json(response);
        });
    });
    

    router.post(BASE_API_URL + '/delete_products_by_category', function (req, res) {
        var data = req.body;
        ProductHandler.delete_products_by_category(data, function (response) {
            response.version = version;
            res.json(response);
        });
    });

    router.post(BASE_API_URL + '/add_category', function (req, res) {
        var data = req.body;
        CategoryHandler.add_category(data, function (response) {
            response.version = version;
            res.json(response);
        });
    });

    router.get(BASE_API_URL + '/list_all_categories', function (req, res) {
       
        CategoryHandler.list_all_categories( function (response) {
            response.version = version;
            res.json(response);
        });
    });

    return router;
};
