import {
  validateOrder,
  createOrder,
  insertOrderItems,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../Models/orderModel.js";

export const createNewOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { user_id, status, items } = req.body;

    const order = await createOrder({ user_id, status });
    await insertOrderItems(order.id, items);

    res.status(201).json({
      message: "Order created successfully",
      order: { ...order, items },
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error loading orders" });
  }
};

// Obtener orden por ID
export const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order" });
  }
};
// Actualizar estado
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "preparing", "delivered"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const updated = await updateOrderStatus(req.params.id, status);

    res.json({
      message: "Order status updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const result = await deleteOrder(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};
