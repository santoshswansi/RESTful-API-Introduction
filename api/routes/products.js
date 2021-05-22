const express = require('express');
const multer = require('multer');

// go one folder back and find product.js in models folder
const ProductsController = require('../controllers/products');

//middleware
const checkAuth = require('../middleware/check_auth');


// setting up destination & filename for the binary 
// file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // null for no error
        cb(null, './uploads/');
    },
    
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const fileFilter = (req, file, cb) => {

    // accept the file if its mimetype is either image/jpeg
    // or image/png
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileSize: 1024*1024*5, // accepts file of fileSize upto 5MB
    fileFilter: fileFilter
});

const router = express.Router();


// get all products
router.get('/', ProductsController.products_get_all);


// get single product
router.get('/:productId', ProductsController.products_get_by_id);



// post a new product
router.post('/',  upload.single('productImage'), checkAuth, ProductsController.products_post);


// update an existing product
router.patch('/:productId', checkAuth, ProductsController.products_update);


// delete an existing product
router.delete('/:productId', checkAuth, ProductsController.products_delete);


module.exports = router;