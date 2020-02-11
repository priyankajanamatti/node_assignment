var mongoose = require('mongoose');
module.exports = mongoose.model('products', {
    product_id: String,
    product_name: String,
    category_name:String,
    category_id:String,
    created_at:{
        type: Date,
        default: Date.now

    },
    is_active:{
        type:Boolean,
        default:true
    }
});