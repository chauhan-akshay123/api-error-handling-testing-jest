const { getBooks, getBookById, getReviews, getReviewsById } = require("./book.js");
const express = require("express");
const app = express();
app.use(express.json());

// API to get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found." });
    }
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get book by Id
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: "Book not found" });    
    }
    return res.status(200).json(book); 
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    return res.status(200).json(reviews); // Added return for correct response
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get reviews by Id
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await getReviewsById(parseInt(req.params.id));
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
