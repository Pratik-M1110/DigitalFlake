const express = require('express');
var appForProductRouter = express.Router();
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'digitalflake'
});

connection.connect;

appForProductRouter.get('/',(request,response)=>{
    var query = `select * from products`;
    
    connection.query(query, (error, result) => {
        if(error == null){
            var data = JSON.stringify(result);
            response.setHeader = ("Content-type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader('Content-Type',"application/json");
            response.write(error);
        }
        response.end();
    })
})

appForProductRouter.post('/add',(request,response)=>{
    console.log(request.body);
    var query = `insert into products(productName,pack_size,mrp,status,category_id) values('${request.body.productName}','${request.body.pack_size}',${request.body.mrp},'${request.body.status}',${request.body.category_id}); `;
    
    connection.query(query, (error, result) => {
        if(error == null){
            var data = JSON.stringify(result);
            response.setHeader = ("Content-type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader('Content-Type',"application/json");
            response.write(error);
        }
        response.end();
    })
})

appForProductRouter.delete('/:id',(request,response)=>{
    console.log(request.body);
    console.log("this is console");
    var query = `delete from products where id = ${request.params.id}; `;
    
    connection.query(query, (error, result) => {
        if(error == null){
            var data = JSON.stringify(result);
            response.setHeader = ("Content-type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader('Content-Type',"application/json");
            response.write(error);
        }
        response.end();
    })
})

module.exports = appForProductRouter;