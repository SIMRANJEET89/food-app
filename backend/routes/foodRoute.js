import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';

const foodRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// img strorage engine


const storage = multer.diskStorage({
    destination:  "uploads",
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage});


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood)



export default foodRouter;
