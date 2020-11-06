const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const secret_key = process.env.AWS_SECRET_ACCESS_KEY;
const access_key = process.env.AWS_ACCESS_KEY_ID;

AWS.config.update({
  accessKeyId: access_key,
  secretAccessKey: secret_key,
  region: "us-east-1",
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3: s3,
  bucket: "yumblr",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.name);
  },
});

const upload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // only 5 MB files max
  },
});

const singlePublicFileUpload = async (file, userId) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  const Key = 'users/' + userId + '/' + new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: "yumblr",
    Key,
    Body: buffer,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);

router.post("/", singleMulterUpload("file"), asyncHandler(async (req, res) => {
  const photoData = req.body;
  const userId = req.body.id;

  photoData.url = await singlePublicFileUpload(req.file, userId);
  const url = photoData.url
  console.log(url)
  return res.json ({ url })

    })
);


module.exports = router;
