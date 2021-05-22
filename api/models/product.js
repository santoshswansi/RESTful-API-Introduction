const mongoose = require('mongoose');

// Create a Products' schema
const productsSchema = mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    price: {type: String, required: true},
    image: {type: String, required: true}
});


// Export a collection named products 
module.exports = mongoose.model('Product', productsSchema);
 