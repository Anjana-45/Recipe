const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the absolute path to the uploads/images directory
const uploadDir = path.join(__dirname, '..', 'uploads', 'images');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log('Multer storage destination:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = uniqueSuffix + ext;
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  console.log('Processing file:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });
  
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    console.log('File accepted:', file.originalname);
    cb(null, true);
  } else {
    console.log('File rejected:', file.originalname, 'Invalid mimetype:', file.mimetype);
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer upload instance
const multerConfig = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Export both single and any methods
module.exports = {
  single: multerConfig.single.bind(multerConfig),
  any: multerConfig.any.bind(multerConfig)
};
