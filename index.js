import express from 'express';
import mongoose from "mongoose";
import router from './route.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/",router);
mongoose
  .connect("mongodb://127.0.0.1:27017/book-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(3000, () => console.log(`Server running on port 3000`))
  )
  .catch((error) => console.log("Mongo Error", error.message));
