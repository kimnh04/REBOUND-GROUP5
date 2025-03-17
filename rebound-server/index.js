const express = require("express");
const session = require('express-session');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/Rebound"; // Dùng đúng tên đang tồn tại

// Configure session middleware
app.use(
    session({
        secret: 'your-session-secret-key', // Use a strong secret key in production
        resave: false, // Don't save session if it wasn't modified
        saveUninitialized: true, // Save session even if it's not modified
        cookie: {
            httpOnly: true, // Ensure client-side JavaScript can't access the cookie
            secure: false, // Set to true if using HTTPS
            maxAge: 360000, // Session expires after 1 hour (can adjust as needed)
        },
    })
);


// Debugging MongoDB URI
console.log("🔍 Connecting to MongoDB:", DB_URI);

// Kết nối MongoDB
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Thoát nếu không kết nối được
    });

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// Import Models
const Customer = require("./models/Customer");
const Admin = require("./models/Admin");
const Blog = require("./models/Blog");
const Product = require("./models/Product");
const Reservation = require("./models/Reservation");
const Order = require("./models/Order");



// Import Routes
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productRoutes = require("./routes/productRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerAdminRoutes = require("./routes/customer-adminRoutes")

// 📌 Kiểm tra MongoDB bằng cách lấy danh sách khách hàng khi khởi động
async function testDBConnection() {
    try {
        const customers = await Customer.find();
        console.log("📌 Customers in DB:", customers.length ? customers : "No customers found.");
    } catch (err) {
        console.error("❌ Error fetching customers:", err);
    }
}
// testDBConnection();


// 📌 Kiểm tra MongoDB bằng cách lấy danh sách Admin khi khởi động
async function testAdminDBConnection() {
    try {
        const admins = await Admin.find();
        console.log("📌 Admins in DB:", admins.length ? admins : "No admins found.");
    } catch (err) {
        console.error("❌ Error fetching admins:", err);
    }
}

// Gọi function kiểm tra danh sách Admin
// testAdminDBConnection();


// 📌 Kiểm tra MongoDB bằng cách lấy danh sách Blog khi khởi động
async function testBlogDBConnection() {
    try {
        const blogs = await Blog.find();
        console.log("📌 Blogs in DB:", blogs.length ? blogs : "No blogs found.");
    } catch (err) {
        console.error("❌ Error fetching blog:", err);
    }
}

// Gọi function kiểm tra danh sách Blog
// testBlogDBConnection();


// 📌 Kiểm tra MongoDB bằng cách lấy danh sách Product khi khởi động
async function testProductDBConnection() {
    try {
        const products = await Product.find();
        console.log("📌 Products in DB:", products.length ? products : "No products found.");
    } catch (err) {
        console.error("❌ Error fetching product:", err);
    }
}

// Gọi function kiểm tra danh sách Product
// testProductDBConnection();


// 📌 Kiểm tra MongoDB bằng cách lấy danh sách đặt chỗ khi khởi động
async function testReservationDBConnection() {
    try {
        const reservations = await Reservation.find();
        console.log("📌 Reservations in DB:", reservations.length ? reservations : "No reservations found.");
    } catch (err) {
        console.error("❌ Error fetching reservations:", err);
    }
}
// testReservationDBConnection();

// 📌 Kiểm tra MongoDB bằng cách lấy danh sách đơn hàng khi khởi động
async function testOrderDBConnection() {
    try {
        const orders = await Order.find();
        console.log("📌 Orders in DB:", orders.length ? orders : "No orders found.");
    } catch (err) {
        console.error("❌ Error fetching orders:", err);
    }
}
// testOrderDBConnection();
app.delete('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});


// Sử dụng Routes
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/product", productRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/customer-admin", customerAdminRoutes)


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


// Test API
app.get("/api", async (req, res) => {
    res.status(200).json({ message: "Hello from API!" });
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Rebound API!" });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
