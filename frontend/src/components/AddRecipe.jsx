import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addRecipe.css"

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [category, setCategory] = useState("veg");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add a recipe");
      return;
    }

    // Validate required fields
    if (!title || !ingredients || !procedure || !category || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", JSON.stringify(ingredients.split(",").map(item => item.trim())));
    formData.append("procedure", procedure);
    formData.append("category", category);
    
    // Ensure we're using the correct field name for the file
    if (image instanceof File) {
      formData.append("image", image, image.name);
    } else {
      setError("Invalid image file");
      return;
    }

    try {
      console.log('Sending form data:', {
        title,
        ingredients: ingredients.split(",").map(item => item.trim()),
        procedure,
        category,
        imageName: image.name,
        imageType: image.type
      });

      const response = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to add recipe");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError(error.message || "Failed to add recipe");
    }
  };

  return (
    // <div className="max-w-2xl mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
    //   {error && <div className="text-red-500 mb-4">{error}</div>}
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div>
    //       <label className="block mb-1">Title</label>
    //       <input
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //     </div>
        
    //     <div>
    //       <label className="block mb-1">Ingredients (comma-separated)</label>
    //       <textarea
    //         value={ingredients}
    //         onChange={(e) => setIngredients(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //         placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs"
    //       />
    //     </div>
        
    //     <div>
    //       <label className="block mb-1">Procedure</label>
    //       <textarea
    //         value={procedure}
    //         onChange={(e) => setProcedure(e.target.value)}
    //         className="w-full p-2 border rounded h-32"
    //         required
    //       />
    //     </div>
        
    //     <div>
    //       <label className="block mb-1">Category</label>
    //       <select
    //         value={category}
    //         onChange={(e) => setCategory(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       >
    //         <option value="veg">Vegetarian</option>
    //         <option value="non-veg">Non-Vegetarian</option>
    //       </select>
    //     </div>
        
    //     <div>
    //       <label className="block mb-1">Recipe Image</label>
    //       <input
    //         type="file"
    //         name="image"
    //         id="image"
    //         accept="image/*"
    //         onChange={handleImageUpload}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <p className="text-sm text-gray-500 mt-1">Max file size: 5MB. Supported formats: JPG, JPEG, PNG, GIF</p>
    //     </div>
        
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    //     >
    //       Add Recipe
    //     </button>
    //   </form>
    // </div>

    <div className="add-recipe-container">
  <h2 className="form-title">Add New Recipe</h2>
  {error && <div className="error-message">{error}</div>}
  <form onSubmit={handleSubmit} className="recipe-form">
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Ingredients (comma-separated)</label>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs"
      />
    </div>

    <div className="form-group">
      <label>Procedure</label>
      <textarea
        value={procedure}
        onChange={(e) => setProcedure(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="veg">Vegetarian</option>
        <option value="non-veg">Non-Vegetarian</option>
      </select>
    </div>

    <div className="form-group">
      <label>Recipe Image</label>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleImageUpload}
        required
      />
      <p className="form-note">Max file size: 5MB. Supported formats: JPG, JPEG, PNG, GIF</p>
    </div>

    <button type="submit" className="submit-button">Add Recipe</button>
    <button onClick={()=>navigate("/home")}className="back-button">Back</button>
  </form>
</div>

  );
};

export default AddRecipe;

