import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;         // FIXED
    const itemId = req.body.itemId;

    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found" });

    // INITIALIZE CART
    let cartData = user.cartData || {};

    // ADD ITEM
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in addToCart" });
  }
};


// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;      // FIXED
    const itemId = req.body.itemId;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    let cartData = user.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in removeFromCart" });
  }
};


// Get user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId;      // FIXED

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getCart" });
  }
};

export { addToCart, removeFromCart, getCart }; 