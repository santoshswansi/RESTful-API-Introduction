require('dotenv').config();
const express = require('express');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const morgan = require('morgan');


mongoose.set('useCreateIndex', true);

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

// support parsing of application/json type post data
app.use(bodyParser.json());

// serve uploads folder as static folder to the web
app.use('/uploads', express.static('uploads')); 


//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Handling CORS(Cross-Origin Resource Sharing)
/*
    Cross-origin resource sharing (CORS) is a mechanism that
    allows restricted resources on a web page to be
    requested from another domain outside the domain from
    which the first resource was served
*/

// app.use((req, res) => {
//     // request from all domains are allowed 
//     res.header("Access-Control-Allow-Origin", "*");
    
//     // headers to be used during an actual request
//     res.header("Access-Control-Allow-Headers",
//                'Origin, X-Requested-With, Content-Type, Accept, Authorization');


//     // if the request method is either "POST" or "PUT"
//     /* Browser will always send "OPTIONS" method first when
//        the HTTP request is either "POST" or "PUT" */
//     if(req.method === 'OPTIONS'){
//         res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE, GET, POST");
//         return res.status(200).json({});
//     }           
// });


// connect to mongodb local server
mongoose.connect("mongodb://admin-santo:" + process.env.MONGODB_ATLAS_PW + "@cluster0-shard-00-00.xvgag.mongodb.net:27017,cluster0-shard-00-01.xvgag.mongodb.net:27017,cluster0-shard-00-02.xvgag.mongodb.net:27017/" + process.env.DB_NAME + "?ssl=true&replicaSet=atlas-11ez4s-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});



// whenever we go to /products route, it will be 
// forwarded to to corresponding file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);




// to handle requests of other routes 
app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(port, (err) => {
    if(err)
        return console.error(err);

    console.log(`Server started on port ${port}`);    
});
