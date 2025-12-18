
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  try {
    console.log("req.body:", req.body);
console.log("req.file:", req.file);
    console.log("File received:", req.file);
    // let image_filename = `${req.file.filename}`;
    const image_filename = req.file ? req.file.filename : null;
    console.log("File received:", image_filename);

    
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("error in addfood", error.message);
    res.status(500).json({ success: false, message: error.message});
  }
};


// all food list

const listFood =  async (req, res) => {
     try{
      const foods = await foodModel.find({})
      res.json({success:true, data:foods})
     }catch (error){
       console.log(error);
       res.json({success:false,message: "error"})
       
     }
}

// remove food item
const removeFood = async (req,res) => {
      try{
         const food = await foodModel.findById(req.body.id)
         fs.unlink(`uploads/${food.image}`,()=>{})


         await foodModel.findByIdAndDelete(req.body.id);
         res.json({success:true, message: 'Food Removed'})
      }catch (error){
         console.log(error);
         res.json({success:false,message:"error"})
         
      }
}

export { addFood, listFood, removeFood };
