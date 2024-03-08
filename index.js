const mongodb = require('mongodb')
const express = require('express')
const ObjectId = require('mongodb').ObjectId;

const app = express()

app.get('/Books', async (req, res) => {
    const client = new mongodb.MongoClient("mongodb://localhost")
    await client.connect()

    const db = client.db("BooksDB")

    // const dbBooks = await db.collection("Books").find({Pages: 30});
    const dbBooks = await db.collection("Books").find();

    const books = []

    await dbBooks.forEach(b => {
        books.push(b)
    })

     console.log(books)

    res.send(books)
})





app.get('/Books/:id', async (req, res) => {

    const _id = mongodb.ObjectId(req.params.id)

    const client = new mongodb.MongoClient("mongodb://localhost")
    await client.connect()

     const db = client.db("BooksDB")

     db.collection("Books").findOne({_id: ObId}, (err, book) => {
         res.send(book)
     }) 
})






// app.get('/Books/:id', async (req, res) => {
//     const client = new mongodb.MongoClient("mongodb://localhost")
//     await client.connect()

//     const db = client.db("BooksDB")

//     // const dbBooks = await db.collection("Books").find({Pages: 30});
//     const dbBooks = await db.collection("Books").find({_id: new ObjectId(req.params.id)});

//     console.log('dbBooks: ',dbBooks)

//     const books = []

//     await dbBooks.forEach(b => {
//         books.push(b)
//     })

//     console.log(books)

//     res.send(books)
// })






// http://localhost:8000/

app.listen(8000, () => {
    console.log("http://localhost:8001/")
})

