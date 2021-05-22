const mongoose = require('mongoose');


// Create a orders' schema
const ordersSchema = mongoose.Schema({
    _id : {type: mongoose.Schema.Types.ObjectId},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, default: 1}
});


// Export a collection named orders 
module.exports = mongoose.model('Order', ordersSchema);
 
