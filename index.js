const mongodb = require('mongodb')
const express = require('express')

const app = express()

// Get all books
app.get('/Books', async (req, res) => {
    const client = new mongodb.MongoClient("mongodb://localhost")
    await client.connect()
    const db = client.db("BooksDB")

    const dbBooks = await db.collection("Books").find();

    const books = []

    await dbBooks.forEach(b => {
        books.push(b)
    })

    res.send(books)
})

// Add a new book hardcoded
app.get('/Books/add', async (req, res) => {
    const client = new mongodb.MongoClient("mongodb://localhost")
    await client.connect()

    const db = client.db("BooksDB")

    const book = {
        title: "The Hobbit",
        pages: 300,
        author: "J.R.R. Tolkien"
    };

    await db.collection("Books").insertOne(book);

    res.send("Book added")
});

app.get('/Books/:id', async (req, res) => {

    // Get the id from the URL (don't forget "new")
    const _id = new mongodb.ObjectId(req.params.id)

    const client = new mongodb.MongoClient("mongodb://localhost")
    await client.connect()
    const db = client.db("BooksDB")

    const book = await db.collection("Books").findOne({ _id })

    res.send(book)
})

// http://localhost:8000/
app.listen(8000, () => {
    console.log("http://localhost:8000/")
})
