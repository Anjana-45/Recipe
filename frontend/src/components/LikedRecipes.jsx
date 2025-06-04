// frontend/pages/LikedRecipes.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import '../styles/FavRecipes.css';

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem("likedRecipes")) || [];
    setLikedRecipes(storedLiked);

    fetch("http://localhost:5000/api/recipes")
      .then(res => res.json())
      .then(data => setAllRecipes(data))
      .catch(err => console.error("Error fetching recipes:", err));
  }, []);

  const handleUnlike = (recipeId) => {
    const updatedLikes = likedRecipes.filter(id => id !== recipeId);
    setLikedRecipes(updatedLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
  };

  const filteredRecipes = allRecipes.filter(recipe => likedRecipes.includes(recipe._id));

  return (
    // <div className="p-5">
    //   <h2 className="text-2xl font-bold mb-4"style={{placeSelf:"center"}}>Your Fav Recipes</h2>
    //   {filteredRecipes.length === 0 ? (
    //     <p style={{placeSelf:"center"}}>No liked recipes found.</p>
    //   ) : (
    //     <div className="grid grid-cols-3 gap-4">
    //       {filteredRecipes.map(recipe => (
    //         <div key={recipe._id} className="p-4 border rounded-lg shadow-md relative">
    //           <h2 className="text-xl font-bold">{recipe.title}</h2>
    //           <p className="text-gray-500">{recipe.category}</p>
    //           <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
    //           <p><strong>Procedure:</strong> {recipe.procedure}</p>
    //           {recipe.image && (
    //             <img
    //               src={recipe.image}
    //               alt={recipe.title}
    //               className="object-cover w-full h-48 rounded mt-2"
    //               onError={(e) => e.target.style.display = 'none'}
    //             />
    //           )}
    //           <Link to={`/recipe/${recipe._id}`} className="text-blue-500 hover:underline block mt-2">
    //             View Details
    //           </Link>
    //           <button
    //             onClick={() => handleUnlike(recipe._id)}
    //             className="absolute top-2 right-2 text-xl"
    //             title="Unlike"
    //           >
    //             <FcLike className="text-red-500" />
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="fav-recipes-container">
  <h2 className="fav-recipes-title">Your Fav Recipes</h2>
  {filteredRecipes.length === 0 ? (
    <p className="no-recipes">No liked recipes found.</p>
  ) : (
    <div className="recipe-grid">
      {filteredRecipes.map(recipe => (
        <div key={recipe._id} className="recipe-card">
          <h2>{recipe.title}</h2>
          <p>{recipe.category}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Procedure:</strong> {recipe.procedure}</p>
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <Link to={`/recipe/${recipe._id}`} className="text-blue-500 hover:underline block mt-2">
            View Details
          </Link>
          <button
            onClick={() => handleUnlike(recipe._id)}
            className="unlike-button"
            title="Unlike"
          >
            <FcLike />
          </button>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default LikedRecipes;





// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FcLike } from "react-icons/fc";
// import '../styles/FavRecipes.css';

// const LikedRecipes = () => {
//   const [likedRecipes, setLikedRecipes] = useState([]);
//   const [allRecipes, setAllRecipes] = useState([]);

//   // Fetch all recipes once
//   useEffect(() => {
//     fetch("http://localhost:5000/api/recipes")
//       .then(res => res.json())
//       .then(data => setAllRecipes(data))
//       .catch(err => console.error("Error fetching recipes:", err));
//   }, []);

//   // Fetch user's wishlist from backend on mount
//   useEffect(() => {
//     fetch("http://localhost:5000/api/wishlist", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}` // send user token for auth
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         // data.wishlist is array of recipe objects (populated)
//         const likedIds = data.wishlist.map(recipe => recipe._id);
//         setLikedRecipes(likedIds);
//       })
//       .catch(err => console.error("Error fetching wishlist:", err));
//   }, []);

//   // When user unlikes a recipe, remove it via backend API
//   const handleUnlike = (recipeId) => {
//     fetch("http://localhost:5000/api/wishlist/remove", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify({ recipeId }),
//     })
//     .then(res => res.json())
//     .then(data => {
//       setLikedRecipes(data.wishlist); // update liked recipes from response
//     })
//     .catch(err => console.error("Error removing from wishlist:", err));
//   };

//   const filteredRecipes = allRecipes.filter(recipe => likedRecipes.includes(recipe._id));

//   return (
//     <div className="fav-recipes-container">
//       <h2 className="fav-recipes-title">Your Fav Recipes</h2>
//       {filteredRecipes.length === 0 ? (
//         <p className="no-recipes">No liked recipes found.</p>
//       ) : (
//         <div className="recipe-grid">
//           {filteredRecipes.map(recipe => (
//             <div key={recipe._id} className="recipe-card">
//               <h2>{recipe.title}</h2>
//               <p>{recipe.category}</p>
//               <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
//               <p><strong>Procedure:</strong> {recipe.procedure}</p>
//               {recipe.image && (
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   className="recipe-image"
//                   onError={(e) => e.target.style.display = 'none'}
//                 />
//               )}
//               <Link to={`/recipe/${recipe._id}`} className="text-blue-500 hover:underline block mt-2">
//                 View Details
//               </Link>
//               <button
//                 onClick={() => handleUnlike(recipe._id)}
//                 className="unlike-button"
//                 title="Unlike"
//               >
//                 <FcLike />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LikedRecipes;
