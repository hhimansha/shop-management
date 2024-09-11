const Order = require('../Models/order.model'); // Assuming the model is in the models directory


exports.placeOrder = async (req, res) => {
    try {
        // Get user ID from authenticated user
        const userId = req.user.userId;

        // Extract order details from the request body
        const { name, address, mobile, totalAmount, items } = req.body;
        // Create a new order
        const order = new Order({
            name,
            address,
            mobile,
            totalAmount,
            user: userId, // Automatically set the user from authenticated user
            items
        });

        // Save the order to the database
        await order.save();

        // Respond with success
        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error placing order',
            
        });
    }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;


        const order = await Order.findByIdAndUpdate(orderId, req.body , { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating order status', error });
    }
};

// Assign driver to order (Admin)
exports.assignDriver = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { driverId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.assignedDriver = driverId;
        await order.save();

        res.status(200).json({ message: 'Driver assigned successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning driver', error });
    }
};

// Delete an order (Admin)
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
