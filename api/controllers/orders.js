const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');


module.exports.orders_get_all = (req, res) => {

    Order.find({})
         .populate('product')
         .exec((err, orders) => {
            if(err)
                return console.error(err);

            if(orders.length === 0){
                res.status(404).json({
                    message: "Not found"
                });
            }else{

                res.status(200).json({
                    message: "Got all orders",
                    total: orders.length,
                    orders: orders.map(order => {
                        return {
                           _id: order._id,
                           product: order.product,
                           quantity: order.quantity,
                           url: "localhost:3000/orders/" + order._id
                       };    
                   }),
                    request: {
                        method: "GET",  
                        url: "localhost:3000/orders"
                    }
                });
        }    
    });     
};


module.exports.orders_get_by_id = (req, res) => {

    Order.findById(req.params.orderId)
        .populate('product')
        .exec(
            (err, order) => {
                if(err)
                    return console.error(err);   

                if(order === null){
                    res.status(404).json({
                        message: "Not found!"
                    });
                }else{

                    Product.findById(order.product, (err, product) => {
                        if(err){
                            res.status(500).json({
                                message: "Could not fetch product",
                                err   
                            });
                        }


                        if(product === null){
                            res.status(404).json({
                                message: "Not a product",
                            });
                        }else{
                            res.status(200).json({
                                message: "Got an order",
                                order: {
                                    product: order.product,
                                    quantity: order.quantity 
                                },
                                request: {
                                    method: "GET",
                                    url: "localhost:3000/orders/" + order.product
                                }
                            });
                        }
                    }); 
                }    
        });
};


module.exports.orders_post = (req, res) => {
    
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });

    order.save(err => {
        if(err)
            return console.error(err);

        Product.findById(req.body.productId, (err, product) => {
            
            if(product === null){
                res.status(404).json({
                    message: "Product not found!",
                    error: err
                });
            }else{
                    res.status(201).json({
                    message: "Posted a new order",
                    createdOrder: {
                        product: product,
                        quantity: order.quantity
                    },
                    request: {
                        method: "POST",
                        url: "localhost:3000/orders/" + order._id
                    }
                });
            }
        });    
    });
};


module.exports.orders_delete = (req, res) => {

    Order.findByIdAndDelete(req.params.orderId)
         .populate('product')
         .exec(
            (err, order) => {
                if(err){
                    console.error(err);
                    return res.status(500).json({
                        error: err
                    });
                }

                if(order === null){
                    res.status(404).json({
                        message: "Not found!"
                    });
                }else{
        
                    res.status(200).json({
                        message: "Deleted an order successfully!",
                        order: {
                            product: order.product, 
                            quantity: order.quantity,
                        },
                        request: {
                            method: "DELETE",
                            url: "localhost:3000/orders/" + order._id
                        }
                    });  
                }       
    });
};