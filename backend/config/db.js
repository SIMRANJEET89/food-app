import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://simranjeetkour8407_db_user:simran1908@food-app.ypmg9ix.mongodb.net/food-app?retryWrites=true&w=majority&appName=food-app"
      
    );

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};