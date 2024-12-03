const express = require("express");
const mongoose = require("mongoose");
const User = require("./userSchema");
const ProductsData = require("./productsSchema");
const eachProduct = require("./eachProductDataSchema");
const categoryData = require("./categorySchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "guru";
app.use(express.json());
app.use(cors());
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, secretkey, {
    expiresIn: "7d",
  });
};
mongoose
  .connect("mongodb://localhost:27017/NxtTrends")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection error", err);
  });

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send({ message: "user registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = generateToken(user);
    res.status(200).send({ token: token, message: "user logged successfully" });
  } catch (error) {
    console.log("Login error ", error);
    res.status(500).send({ message: "Error logging user" });
  }
});

app.get("/getProducts", async (req, res) => {
  const { sort_by, category, title_search, rating } = req.query;
  const products = await ProductsData.find();
  try {
    let filteredProducts = [...products];

    if (title_search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(title_search.toLowerCase())
      );
    }
    if (category && category !== "") {
      const data = await categoryData.find({
        category: parseInt(category, 10),
      }).lean();
      filteredProducts = data[0].data
    }
    if (rating) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.rating) >= parseFloat(rating)
      );
    }

    if (sort_by === "PRICE_HIGH") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort_by === "PRICE_LOW") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (filteredProducts.length === 0) {
      return res
        .status(200)
        .send({ message: "No products found", products: [] });
    }

    return res
      .status(200)
      .send({
        message: "Products fetched successfully",
        products: filteredProducts,
      });
  } catch (error) {
    console.log("Products fetching error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.get("/eachProductData/:productId", async (req, res) => {
  let { productId } = req.params;
  productId = parseInt(productId, 10);

  if (isNaN(productId)) {
    return res.status(400).send({ message: "Invalid product ID" });
  }

  try {
    const product = await eachProduct.findOne({ id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
});

app.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});
