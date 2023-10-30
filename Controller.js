import BookModel from "./BookModel.js";
//create Route
export const createBook = async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    if (title == "" || author == "" || summary == "") {
      res
        .status(400)
        .json({ errorMsg: "Please enter value of title/author/summary" });
    }
    const newBook = new BookModel({
      title,
      author,
      summary,
    });
    await newBook.save()
    res.status(200).json({ Msg: "Created Book Successfully..."});
  } catch (error) {
    res.status(400).json({success:false, errorMsg: error});
  }
};
//get route
export const getBook = async (req, res) => {
  try {
    const getBook = await BookModel.find();
    res.status(200).json({ success:true, data: getBook });
  } catch (error) {
    console.log("Backend Error", error);
    res.status(400).json({success:false, errorMsg: error});
  }
};
//get route by id
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const getBook = await BookModel.find({ _id: id });
    if(getBook.length < 1) res.status(400).json({success:false, errorMsg: "Book Not Found By Id"});
    res.status(200).json({ success:true, data: getBook });
  } catch (error) {
    res.status(400).json({success:false, errorMsg: error.message});
  }
};
//update route by id
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookUpdate = req.body;
    if (
      bookUpdate.title == "" ||
      bookUpdate.author == "" ||
      bookUpdate.summary == ""
    ) {
      res
        .status(400)
        .json({ errorMsg: "Please enter value of title/author/summary" });
    }
    const updatedBook = await BookModel.findByIdAndUpdate(id, bookUpdate, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ success:false ,errorMsg: "Book not found" });
    }
    res.status(200).json({success:true,data:updateBook});
  } catch (error) {
    res.status(400).json({success:false, errorMsg: error.message});
  }
};
//delete route
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BookModel.findOneAndDelete({ _id: id });
    if(data==null) res.status(400).json({success:false, errorMsg: "Not Found Data"});
    res.status(200).json({success:true, Msg: "Book Deleted Successfully...." });
  } catch (error) {
    res.status(400).json({success:false, errorMsg: error});
  }
};
