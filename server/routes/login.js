const express = require('express');
var appForLoginRouter = express.Router();
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'digitalflake'
});

connection.connect;

appForLoginRouter.post('/',(request,response)=>{
    var query = `select * from users where email = '${request.body.email}' and password = '${request.body.password}'`;
    
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

module.exports = appForLoginRouter;