var mongoose = require('mongoose');
module.exports = mongoose.model('category', {
    category_id: String,
    category_name: String,
    created_at:{
        type: Date,
        default: Date.now
    },
    is_active:{
        type:Boolean,
        default:true
    }
});