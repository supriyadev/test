const mongoose= require('mongoose');

const fileUpload=new mongoose.Schema({

  
    image:
    {
       
        contentType: String
    }

});
const File=mongoose.model('File',fileUpload);
exports.File=File;