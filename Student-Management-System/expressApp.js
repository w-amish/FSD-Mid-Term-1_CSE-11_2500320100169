
import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
    {
        id: 1,
        bookName: "Java Programming",
        author: "James Gosling",
        price: 500,
        quantity: 5,
        category: "Programming"
    },
    {
        id: 2,
        bookName: "Python Basics",
        author: "Guido van Rossum",
        price: 400,
        quantity: 3,
        category: "Programming"
    },
    {
        id: 3,
        bookName: "Data Structures",
        author: "Mark Allen Weiss",
        price: 600,
        quantity: 4,
        category: "Computer Science"
    }
];

app.get("/", (req, res) => {
    res.send("Welcome to Student Management System API");
});

app.get("/books", (req, res) => {
    res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);
});

app.post("/books", (req, res) => {
    const { bookName, author, price, quantity, category } = req.body;

    if (!bookName || !author || typeof price !== "number" ||
        typeof quantity !== "number" || !category) {
        return res.status(400).json({
            message: "Please provide valid book details"
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        bookName,
        author,
        price,
        quantity,
        category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { bookName, author, price, quantity, category } = req.body;

    if (!bookName || !author || typeof price !== "number" ||
        typeof quantity !== "number" || !category) {
        return res.status(400).json({
            message: "Please provide valid book details"
        });
    }

    book.bookName = bookName;
    book.author = author;
    book.price = price;
    book.quantity = quantity;
    book.category = category;

    res.status(200).json({
        message: "Book updated successfully",
        book: book
    });
});

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
