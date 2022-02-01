const mongoose= require('mongoose');

const fileUpload=new mongoose.Schema({

    name: String,
    desc: String,
    img:
    {
       
        contentType: String
    }

});
const File=mongoose.model('File',fileUpload);
exports.File=File;