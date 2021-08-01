require('dotenv').config();
const express = require('express');
const multer  = require('multer')
const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const mongoose = require('mongoose');
const Image = require('./models/Image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
      //cb(null,  String(uuid() + '.' + mime.extension(file.mimetype)))
    }
  })
const upload = multer({ storage, 
    fileFilter: (req, file, cb) => {
        if(["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true)
        else cb(new Error('invalid file type.'), false);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
 })

const app = express();
const PORT = 5000;
console.log(process.env);

mongoose.connect(
  process.env.MONGO_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('MongoDB Connected.');
    app.use('/upload', express.static("uploads"));
    app.post('/images', upload.single('image'), async (req, res) => {
        const image = await new Image({ 
          key: req.file.filename, 
          originalFileName: req.file.originalname 
        }).save()
        console.log(req.file)

        if(req.file=== undefined){
            return res.status(500).json({error: "server failure"});
        }else{
            return res.json(image);
        }
    });
    app.get('/images', async(req, res) => {
      const images = await Image.find();
      res.json(images);
    })
    app.listen(PORT, () => console.log("Express server listening on PORT"+PORT)
    )
  })
  .catch(err => console.log(err));




// admin
// 0e9fYdgNwGUGYsB5