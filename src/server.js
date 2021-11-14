require("dotenv").config();
const express = require("express"),
    app = express(),
    path = require("path"),
    impFunctions = require("./ecomFunctions");
    
app.use(express.json()),
app.use(express.static(path.join(__dirname,"..","public")))
let freeId = 0;

// Products//
app.get("/products",(req,res)=>{
    impFunctions.getProducts(req,res)
})

app.get("/products/product/:id",(req,res)=>{
    impFunctions.getProductById(req,res)
})

app.delete("/products/:id",(req,res)=>{
    impFunctions.deleteProduct(req,res)
})

app.patch("/products/:id",(req,res)=>{
    impFunctions.updateProduct(req,res)
})

app.post("/html/addProduct.html",(req,res)=>{
    impFunctions.addProduct(req,res)
})

// Show Category//
app.get("/products/:category", (req,res)=>{
    impFunctions.getByCategory(req,res)
})

// Cart//
app.get("/cart",(req,res)=>{
    impFunctions.getCart(req,res)
})

app.patch("/cart/delete",(req,res)=>{
    impFunctions.deleteFromCart(req,res)
})

app.patch("/cart/deleteAll",(req,res)=>{
    impFunctions.deleteCartItems(req,res)
})

app.patch("/cart/update",(req,res)=>{
    req.body.cartId = freeId++
    impFunctions.addToCart(req,res)
})

app.get("/orders",(req,res)=>{
    impFunctions.getOrders(req,res)
})

app.post("/orders",(req,res)=>{
    impFunctions.addOrder(req,res)
})


//contact//
app.get("/contact",(req,res)=>{
    impFunctions.getContact(req,res)
})

app.post("/contact",(req,res)=>{
    impFunctions.addContact(req,res)
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})