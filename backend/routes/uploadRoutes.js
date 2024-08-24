import path from 'path';
import express from 'express';
import multer from 'multer';  //A middleware for handling multipart/form-data, which is primarily used for uploading files.

const router = express.Router();
  //want the image to be saved in the disk on the server  
const storage = multer.diskStorage({                             //storage:  Place to save files
  destination(req, file, cb) {   //cb: callback function
    cb(null, 'uploads/');  //upload is in the root  (null pertain to error)
  },
  filename(req, file, cb) {
    cb( null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function checkFileType(file, cb) {                             // conditions to filter the files.
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);  //Allows the file to be uploaded if it passes the checks.
  } else {
    cb(new Error('Images only!!!'));  //Rejects the file with an error if it doesn't pass the checks.// first return is error
  }
}

const upload = multer({ 
  storage,checkFileType
  
  
  }
);  //use multer function(used to upload files) with Place to save files, Condition to filter as parameters 
const uploadSingleImage = upload.single('image');  // just upload single image/ but multiple images can be uploaded with array


router.post('/', upload.single('image'),(req,res)=>{
  res.send({
    message:'Image Uploaded',
    image: `/${req.file.path}`
  })
})

export default router;