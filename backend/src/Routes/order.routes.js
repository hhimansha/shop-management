const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../Controllers/order.controller');
const { adminMiddleware, isAdmin } = require('../Middlewares/admin.auth');
const authMiddleware = require('../Middlewares/user.auth')

// Place an order (User)
router.post('/place-order', authMiddleware, placeOrder);

// Get all orders (Admin)
router.get('/orders', adminMiddleware, isAdmin, getAllOrders);

// Update order status (Admin)
router.put('/order/:orderId/status', adminMiddleware, isAdmin, updateOrderStatus);

// Delete an order (Admin)
router.delete('/order/:orderId', adminMiddleware, isAdmin, deleteOrder);

module.exports = router;
