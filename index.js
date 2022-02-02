const mongoose = require('mongoose');
const express=require('express');
const bodyParser= require('body-parser');
const ejs=require('ejs');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const {File}=require('./model/files');
const port =process.env.PORT || 3000;
const app=express();
// const upload = multer({ dest: './public/data/uploads/' })
//middele ware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connecting to mongodb 
mongoose.connect('mongodb://localhost/fileupload')
.then(()=>console.log('connected to mongodb'))
.catch(err=> console.error('could not connect'));

 
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/',(req,res)=>{
    res.render('index');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


app.post("/uploadp",upload.single('myImage'),(req,res)=>{
  
    var img = fs.readFileSync(req.file.path);
    console.log(img);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:Buffer.from(encode_img,'base64')
        
    };
    File.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            // console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
});
// connceting to browser 
app.listen(port,()=>console.log(`listen to port ${port}..`) );


