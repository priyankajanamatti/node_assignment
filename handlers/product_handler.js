var Product = require("../models/products");

module.exports = {

    add_product: function (data, callback) {
        productdata = function () {

            Product.findOne({
                "product_id": data.product_id
            }, function (err, eventdata) {
                if (err) {
                    callback({
                        statuscode: 500,
                        error: err,
                        msg: "finding product_id database error"
                    });
                } else if (eventdata != null) {
                    callback({
                        statuscode: 304,
                        msg: "Product already exist"
                    });

                } else {
                    var addproduct = new Product();
                    addproduct.product_id = data.product_id;
                    addproduct.product_name = data.product_name;
                    addproduct.category_name = data.category_name;
                    addproduct.category_id = data.category_id;

                    addproduct.save(function (err, result) {
                        if (err) {
                            callback({
                                statuscode: 500,
                                error: err,
                                msg: "Database error in saving newly added product"
                            });
                        } else {
                            callback({
                                statuscode: 200,
                                msg: "New Product added successfully",
                                data: result
                            });
                        }
                    });

                }
            });
        }
        process.nextTick(productdata);
    },


    

    list_products: function (callback) {
        productdata = function () {
            Product.find({}, function (err, products) {
                if (err) {
                    callback({
                        msg: "Error in finding products from database , an error",
                        statuscode: 500,
                    });
                } else if (products == null) {
                    callback({
                        msg: "No products found",
                        statuscode: 404,
                    });
                }
                callback({
                    msg: "List of products",
                    statuscode: 200,
                    data: products
                });
            });
        }
        process.nextTick(productdata);
    },
    
    delete_products_by_category: function (data, callback) {
        categorydata = function () {

            Product.find({"category_name":data.category_name}, function (err, products) {
                if (err) {
                    callback({
                        msg: "Error in finding products from database , an error",
                        statuscode: 500,
                    });
                } else if (products == null) {
                    callback({
                        msg: "No products found",
                        statuscode: 404,
                    });
                }else{

                    Product.remove({
                        "category_name": data.category_name
                    }, function (err, deletedproducts) {
                        if (err) {
                            callback({
                                msg: "Error while deleting products from database",
                                statuscode: 500,
                            });
                        } else{
                            callback({
                                msg: "Products of category "+data.category_name+" are deleted successfully",
                                statuscode: 200,
                                data:{products,deletedproducts}
                            });
                        }
                       
                    });
                   
                }
               
            });
            
        }
        process.nextTick(categorydata);
    },

    


}
