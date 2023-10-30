import express from 'express';
import {createBook,getBook,updateBook,deleteBook,getBookById} from "./Controller.js"
const router = express.Router()
router.post("/createBook",createBook)
router.get("/getBook",getBook)
router.get("/getBook/:id",getBookById)
router.put("/updateBook/:id",updateBook)
router.delete("/delete/:id",deleteBook)

export default router;