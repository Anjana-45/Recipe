const express=require('express')
const router=express.Router()
const Image=require('../models/imageSchema')
const fs=require('fs')
const path=require('path')

router.get('/',(req,res)=>{
    console.log("Fetching images");
    
    // First try to get images from the database
    Image.find({}, (err, images) => {
        if (err) {
            console.error("Error fetching images from database:", err);
            return res.status(500).json({error: 'Error fetching images from database'});
        }
        
        if (images && images.length > 0) {
            console.log("Found images in database:", images);
            return res.json({imageFilenames: images.map(img => img.filename)});
        }
        
        // If no images in database, fall back to reading directory
        console.log("No images in database, reading directory");
        const imageDirectory = path.join(__dirname, '..', 'uploads', 'images');
        console.log("Image directory:", imageDirectory);
        
        fs.readdir(imageDirectory,(err,files)=>{
            if(err){
                console.error("Error reading directory:", err);
                return res.status(500).json({error:'Error reading image directory'})
            }

            // Filter for image files only
            const imageFiles = files.filter(file => 
                file.match(/\.(jpg|jpeg|png|gif)$/i)
            );

            const imageFilenames=imageFiles.map((file)=>path.basename(file))
            console.log("image Filenames: ",imageFilenames)
            res.json({imageFilenames})
        });
    });
});

module.exports = router;