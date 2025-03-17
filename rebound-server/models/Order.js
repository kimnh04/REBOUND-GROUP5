const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  Order_ID: { type: String, required: true, unique: true },
  Order_Date: { type: Date, required: true },
  Order_Quantity: { type: Number, required: true },
  Product_ID: { type: String, required: true },
  Customer_ID: { type: String, required: true },
  Payment_ID: { type: String, required: true },
  Payment_Method: { type: String, required: true },
  Order_Total_Price: { type: Number, required: true },
  Delivery_Method: { type: String, required: true },
  Order_Status: { type: String, required: true },
  Order_Note: { type: String }
}, { timestamps: true });

// module.exports = mongoose.model('Order', OrderSchema);
const Order = mongoose.model('order', OrderSchema, "order");

module.exports = Order;