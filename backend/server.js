const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
    process.env.MONGO_URI,
)
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

// Model
const User = mongoose.model("User", userSchema);


// ================= REGISTER =================

app.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "User already exists"
            });
        }

        // create new user
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.json({
            message: "Registration successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {

            return res.json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            role: user.role,
            name: user.name,
            email: user.email,
            id: user._id
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// ================= GET USERS =================

app.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ================= UPDATE USER =================

app.put("/update-user/:id", async (req, res) => {

    try {

        const { name, email, role } = req.body;

        await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role
        });

        res.json({
            message: "User updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ================= DELETE USER =================

app.delete("/delete-user/:id", async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ================= SERVER =================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});