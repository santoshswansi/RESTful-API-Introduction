const mongoose = require('mongoose');

const Product = require('../models/product');

module.exports.products_get_all = (req, res) => {

    Product.find({}, (err, products) => {
        if(err)
            return console.error(err);

        if(products.length === 0){
            res.status(404).json({
                message: "Products list is empty!"
            });
        }else{
            res.status(200).json({
                message: "Got all products successfully!",
                length: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        url: "localhost:3000/products/" + product._id
                    };
                }),
                requests: {
                    method: "GET",
                    url: "localhost:3000/products"
                }
            });  
        }    
    });
};


module.exports.products_get_by_id = (req, res) => {
 
    Product.findById(req.params.productId, (err, product) => {
        if(err)
            return console.error(err);
   
        if(product === null){
            res.status(404).json({
                message: "Not found!"
            });
        }else{
            res.status(200).json({
                message: "Got a product",
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                },
                request: {
                    method: "GET",
                    url: "localhost:3000/products/" + product._id
                }
            });
        }
    });
};


module.exports.products_post = (req, res) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: parseInt(req.body.price),
        image: req.file.path
    });

    console.log(req.file);

    product.save()
           .then(prod => {
               res.status(200).json({
                   message: "Posted successfully!",
                   createdProduct: {
                       _id: prod._id,
                       name: prod.name,
                       price: prod.price,
                       image: prod.image
                   },
                   request: {
                        method: "POST",
                        url: "localhost:3000/products/" + prod._id
                   }
               }); 
           })
           .catch(err => {
               if(err){
                    console.error(err);
                    res.status(500).json({
                        err,
                        message: "Not able to post"
                    });
               }   
           }); 
};


module.exports.products_update = (req, res) => {

    Product.findById(req.params.productId, (err, product) => {
        if(err){
            console.error(err); 
            return res.status(500).json({
                error: err
            });
        }
        
        if(!req.body.name && !req.body.price){
            return res.json({
                message: "name or price is required!"
            });
        }

        if(product){
            if(req.body.name)
                 product.name = req.body.name;

            if(req.body.price)
                product.price = parseInt(req.body.price);  

            product.save();

            return res.status(200).json({
                message: "Updated a product successfully",
                updatedProduct: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                },
                request: {
                    method: "PATCH",
                    url: "localhost:3000/products/" + product._id
                }
            });    
        }


        res.status(404).json({
            message: "Not found"
        }); 
    });
};

module.exports.products_delete = (req, res) => {
    
    Product.findByIdAndDelete(req.params.productId, (err, product) => {
        if(err){
            console.error(err);
            return res.status(500).json({
                error: err
            });
        }
        
         
        if(product === null){
            res.status(404).json({
                message: "Not found!"
            });
        }else{
           res.status(200).json({
                message: "Deleted a product successfully!",
                deletedProduct: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                },
                request: {
                    method: "DELETE",
                    url: "localhost:3000/products/" + product._id
                }
           });    
        }
    });
};