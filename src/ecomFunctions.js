// const { response } = require("express");

const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    mongoURL = process.env.MONGOURL,
    collName = "products",
    dbName = "E-COMMERCE";


// Poducts//
function getProducts(req, res) {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(collName).find({}).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

function getProductById(req, res) {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const id = { _id: mongoDB.ObjectId(req.params.id) };
            const dbo = db.db(dbName)
            dbo.collection(collName).find(id).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

function getByCategory(req, res, cat) {
    category = req.params.category
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(collName).find({ "category": category }).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

function addProduct(req, res) {
    const newProduct = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(collName).insertOne(newProduct)
                .then((doc) => {
                    if (doc) {
                        console.log(doc)
                        res.send(doc).status(201)
                        db.close()
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            console.log(err);
            throw err
        })
}

function deleteProduct(req, res) {
    const id = req.params.id;
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(collName).deleteOne({ id: Number(id) })
                .then((doc) => {
                        res.send(doc)
                })
        })
        .catch((err) => {
            throw err
        })
}

function updateProduct(req, res) {
    const id = req.params.id;
    if (id == undefined) {
        return res.sendStatus(400)
    }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(collName).findOneAndUpdate({ _id: mongoDB.ObjectId(id) }, { $set: upDoc })
                .then((doc) => {
                    if (doc) {
                        res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err
        })
}


// cart//
function addToCart(req, res) {
    const id = { _id: mongoDB.ObjectId("618d8eb52f14ad79bcbfde8e") };
    const addedProd = req.body
    console.log(addedProd);
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("cart").findOneAndUpdate(id, { $push: { cart: addedProd } })
                .then((doc) => {
                    res.send(doc)
                })
        })
        .catch((err) => {
            throw err
        })
}

function deleteFromCart(req, res) {
    const id = { _id: mongoDB.ObjectId("618d8eb52f14ad79bcbfde8e") };
    const cartId = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("cart").findOneAndUpdate(id, { $pull: { cart: cartId } })
                .then((doc) => {
                    res.send(doc)
                })
        })
        .catch((err) => { throw err })
}

function deleteCartItems(req,res) {
    const id = { _id: mongoDB.ObjectId("618d8eb52f14ad79bcbfde8e") };
    const cartId = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("cart").findOneAndUpdate(id, { $pull: { cart: cartId } })
                .then((doc) => {
                    res.send(doc)
                })
        })
        .catch((err) => { throw err })
}

function getCart(req, res) {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("cart").find({}).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

function addOrder(req, res) {
    const newOreder = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("orders").insertOne(newOreder)
                .then((doc) => {
                    if (doc) {
                        console.log(doc)
                        res.send(doc).status(201)
                        db.close()
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            console.log(err);
            throw err
        })
}

function getOrders(req, res) {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("orders").find({}).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

// contact
function getContact(req, res) {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("contact").find({}).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

function addContact(req, res) {
    const newContact = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection("contact").insertOne(newContact)
                .then((doc) => {
                    if (doc) {
                        console.log(doc)
                        res.sendStatus(201)
                        db.close()
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            console.log(err);
            throw err
        })
}

module.exports = {
    getProducts, getProductById, addProduct, deleteProduct,
    updateProduct, getByCategory, getCart, addToCart, deleteFromCart, getContact, addContact,
    deleteCartItems,addOrder,getOrders
}