const express = require('express');

const checkAuth = require('../middleware/check_auth');
const OrdersController = require('../controllers/orders');

const router = express.Router();


router.get('/', checkAuth, OrdersController.orders_get_all);


router.get('/:orderId', checkAuth, OrdersController.orders_get_by_id);


router.post('/', checkAuth, OrdersController.orders_post);


router.delete('/:orderId', checkAuth, OrdersController.orders_delete);    

module.exports = router;