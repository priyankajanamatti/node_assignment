var Category = require("../models/category");

module.exports = {

    add_category: function (data, callback) {
        categorydata = function () {

            Category.findOne({
                "category_id": data.category_id
            }, function (err, category_data) {
                if (err) {
                    callback({
                        statuscode: 500,
                        error: err,
                        msg: "finding category_id database error"
                    });
                } else if (category_data != null) {
                    callback({
                        statuscode: 304,
                        msg: "Category already exist"
                    });

                } else {
                    var addcategory = new Category();
                    addcategory.category_id = data.category_id;
                    addcategory.category_name = data.category_name;
                    addcategory.save(function (err, result) {
                        if (err) {
                            callback({
                                statuscode: 500,
                                error: err,
                                msg: "Database error in saving newly added category"
                            });
                        } else {
                            callback({
                                statuscode: 200,
                                msg: "New Category added successfully",
                                data: result
                            });
                        }
                    });

                }
            });
        }
        process.nextTick(categorydata);
    },


    

    list_all_categories: function (callback) {
        categoryData = function () {
            Category.find({}, function (err, categories) {
                if (err) {
                    callback({
                        msg: "Error in finding categories from database",
                        statuscode: 500,
                    });
                } else if (categories == null) {
                    callback({
                        msg: "No categories found",
                        statuscode: 404,
                    });
                }
                callback({
                    msg: "List of categories",
                    statuscode: 200,
                    data: categories
                });
            });
        }
        process.nextTick(categoryData);
    }

    


}
