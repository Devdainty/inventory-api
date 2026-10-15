const getAllOrders = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: [
        { id: 1, item: "Laptop", status: "Processing", buyer: "Alice" },
        { id: 2, item: "Keyboard", status: "Shipped", buyer: "Bob" },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllOrders };
