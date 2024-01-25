const express = require('express');
const config = require('config');

const appForLoginRouter = require("./routes/login");
const appForCategoryRouter = require("./routes/category");
const appForProductRouter = require("./routes/product");
var app = express();

app.use((request,response,next)=>{
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    response.setHeader("Access-Control-Allow-Methods","*");
    next();
});

app.use(express.json());
app.use("/login",appForLoginRouter);
app.use("/category",appForCategoryRouter);
app.use("/product",appForProductRouter);
const portNo = config.get("PORT");

app.listen(portNo,()=>{
    console.log("Server is listening at " + portNo);
})