const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

var UsersModel = require('../schema/user');
// app.post("/student", (req,res) =>{
//     res.setHeader('Content-Type','text/html');
//     res.send('<h3 style="color:red>Welcome to student screen</h3>');

// });


// app.listen(8989,() =>{
//     console.log("Listening at port 8989.");


// });

// const bodyParse = require('body-parser');
// app.use(bodyParse.urlencoded({ extended:true}));
// app.use(express.json());

app.route("/add")
.get((req,res)=>{
    res.setHeader("Content-Type","text/html");
    console.log(req.body);
    res.render('add_user');
})

.post((req,res)=>{
    res.setHeader("Content-Type","text/html");
    console.log(req.body);


    const mybodyData = {
        user_name : req.body.user_name,
        user_passwd : req.body.user_passwd,
        user_email: req.body.user_email

    }

    var data = UsersModel(mybodyData);

    data.save(function(err) {
        if (err) {
            res.render('add_user',{message:"user registered not done"});
        }
        else {
            res.render('add_user',{message: "user registered successful"});
        }

    })

});