const express = require('express');
var appForCategoryRouter = express.Router();
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'digitalflake'
});

connection.connect;

appForCategoryRouter.get('/',(request,response)=>{
    console.log("this is console");
    var query = `select * from category`;
    
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

appForCategoryRouter.get('/:id',(request,response)=>{
    console.log("this is console");
    var query = `select * from category where id=${request.params.id}`;
    
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

appForCategoryRouter.post('/add',(request,response)=>{
    console.log(request.body);
    console.log("this is console");
    var query = `insert into category(name,description,status) values('${request.body.name}','${request.body.description}','${request.body.status}') `;
    
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

appForCategoryRouter.delete('/:id',(request,response)=>{
    console.log(request.body);
    console.log("this is console");
    var query = `delete from category where id = ${request.params.id}; `;
    
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

module.exports = appForCategoryRouter;