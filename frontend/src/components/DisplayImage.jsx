import React, { useEffect, useState } from 'react';

const ImageDisplay = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getImages')
      .then((response) => response.json())
      .then((data) => {
        console.log("imgdata", data.imageFilenames)
        setImageUrls(data.imageFilenames);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  return (
    <div style={{ width: "700px", display: "flex", flexDirection: "column" }}>
      <h2>Images</h2>
      {/* <img src="http://localhost:5000/uploads/images/1743390069359.jpg" alt="" /> */}
      {imageUrls.map((imageUrl, index) => (
        <div key={index} style={{ width: 200, height: 200, margin: '10px' }}>
          <img 
            style={{ maxWidth: '100%', height: 'auto' }}
            src={`http://localhost:5000/uploads/images/${imageUrl}`} 
            alt={`Image ${index + 1}`} 
            onError={(e) => {
              console.error(`Error loading image: ${imageUrl}`);
              e.target.style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;