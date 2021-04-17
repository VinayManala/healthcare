const express = require('express');
const mongo = require('mongodb');
const userSchema = require('./schema/user');
const app = express();
const ejs = require('ejs');
const port = 4000;
var bodyParser = require('body-parser');

//app.use(bodyParser.json())
//app.use(express.bodyParser());
//DATABASE CONNECT SERVER
//sudo mongod --config /etc/mongod.conf --fork

var MongoClient = require('mongodb').MongoClient;
const { urlencoded } = require('body-parser');
const user = require('./schema/user');
var url = "mongodb://localhost:27017/healthcare";
MongoClient.connect(url ,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    // const dbo = db.db('iot-healthcare');
    // const collection = dbo.collection('users');
        console.log("Database connected!");
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
//read data



// .get(async (req,res) =>{
//     let data = await user.find()
//     .select({__v:0,_id:0})
//     .limit(2)
//     .sort({name:1});
//     console.log(data);
//     res.send(data);
// })


// app.post('/new',(req,res) =>{
//     console.log("test");
//     let user_name = req.body.name;
//     let device = req.body.devices;
//     new userSchema({
//         name: req.body.name,
//     }).save(function (err,doc){
//         if(err) throw err;
//         res.send('new user registered successfully');
//     });
//     userSchema.findOneAndUpdate({
//         name : user_name,
//         $push : {
//             devices : device
//         }
//     })
// });


app.set('view engine','ejs');

app.get('/help',(req,res) =>{res.send("</br><iframe src='https://dodxtx.shinyapps.io/EMSC/' style='overflow-x: hidden; overflow-y: hidden; height: 224vh; width: 200vh'></iframe></br>");});

app.get('/back',(req,res)=>{ return res.redirect('/');});

app.get('/info',async(req,res)=> {
    const query = {'name':req.param('name')};
    const result = await user.findOne(query);
    // console.log(result);
    res.render('info',{details:result});
    
});

 app.post('/update',async (req,res) => {
    const query = {"name": req.body.name};
    const updateDocument = {
         $push: {"devices": req.body.devices},
        };
    const result = await user.updateOne(query,updateDocument);
    return res.redirect('/');
    
 });


app.post('/new', async (req,res) =>{
    r_data = req.body;
    let u1 = new userSchema(r_data);
    let result = await u1.save();
    console.log(result);
    res.redirect("/");
});

app.get('/create_user',(req,res) =>{
    res.render('create_user');
});
app.get('/add_user',(req,res)=>{
    res.render('add_user');
});

app.get('/',(req,res) =>{
    //let device_list = [{'name':'thermometer'},{'name':'ECG'}];
    MongoClient.connect(url ,{ useUnifiedTopology: true }, function(err, db) {
        const dbo = db.db('healthcare');
        const collection = dbo.collection('users');
        collection.find({}).toArray(function(err,device_list) {
        if (err) throw err;
            res.render('home',{devices: device_list});
        });
    });
});



app.listen(port,() => console.log(`Listening to port ${port}`))
