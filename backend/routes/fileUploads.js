const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig.js');
const Image = require('../models/imageSchema.js');
const path = require('path');

// Use the correct middleware function — upload.single("image")
router.post('/', upload.single("image"), async (req, res) => {
  console.log("File upload request received");
  
  if (req.file) {
    console.log("File uploaded successfully:", req.file);
    console.log("File path:", req.file.path);
    console.log("File destination:", req.file.destination);
    
    // Create a relative path for storage in the database
    const relativePath = path.relative(path.join(__dirname, '..'), req.file.path);
    console.log("Relative path:", relativePath);
    
    const image = new Image({ 
      filename: req.file.filename,
      path: relativePath
    });
    
    await image.save();
    console.log("Image saved to database");

    return res.status(200).json({
      success: true,
      message: 'Image uploaded!',
      file: {
        filename: req.file.filename,
        path: relativePath
      }
    });
  }

  console.log("No file uploaded");
  return res.status(400).json({
    success: false,
    error: 'Image upload failed!',
  });
});

module.exports = router;
