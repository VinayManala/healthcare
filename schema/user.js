const mongoose = require('mongoose');
const Schema =  mongoose.Schema


const conn_str = "mongodb://localhost:27017/healthcare";
console.log("mongoose file running..");

mongoose.connect(conn_str,{ useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log("Connected to db healthcare...."))
.catch((e) => console.log(e));
var user = new Schema({
    name : String ,
    patientype : String,
    devices : [String],
    message : String
});

module.exports = mongoose.model('users',user);
