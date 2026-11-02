
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Student Management System</h1>");
    }

    else if (req.url === "/books" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(books));
    }

    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Library Book Management System</h1>");
    }

    else if (req.url === "/home" && req.method === "GET") {

        const filePath = path.join(__dirname, "public", "index.html");

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading HTML file");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }
    else if (req.url === "/add-book" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                const newBook = JSON.parse(body);

                if (
                    newBook.id === undefined ||
                    !newBook.bookName ||
                    !newBook.author ||
                    typeof newBook.price !== "number" ||
                    typeof newBook.quantity !== "number"
                ) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Please provide valid book details"
                    }));

                    return;
                }

                books.push(newBook);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Book added successfully",
                    book: newBook
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
