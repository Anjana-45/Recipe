// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { FcLikePlaceholder } from "react-icons/fc";
// import { FcLike } from "react-icons/fc";
// import { SlOptionsVertical } from "react-icons/sl";

// const RecipeList = () => {
//   const [recipes, setRecipes] = useState([]);  // Initialize as an empty array
//   const [likedRecipes, setLikedRecipes] = useState([]);
//   const [filteredRecipes, setFilteredRecipes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [user, setUser] = useState(null);


//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     // Fetching the list of recipes
//     fetch("http://localhost:5000/api/recipes")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Recipes data:", data);
//         // Check if the response is an array before setting state
//         if (Array.isArray(data)) {
//           setRecipes(data);  // Set recipes only if the response is an array
//           setFilteredRecipes(data);
//         } else {
//           console.error("Data is not an array:", data);
//           setRecipes([]);  // Fallback to empty array if response is not an array
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching recipes:", error);
//         setRecipes([]);  // Ensure we handle the error case gracefully
//         setLoading(false);
//       });

//     // Fetching liked recipes from localStorage (for simplicity)
//     const storedLikedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
//     setLikedRecipes(storedLikedRecipes);
//   }, []);

//   const handleLike = (recipeId) => {
//     const updatedLikedRecipes = [...likedRecipes];
//     const index = updatedLikedRecipes.indexOf(recipeId);

//     if (index === -1) {
//       // If the recipe is not liked, like it
//       updatedLikedRecipes.push(recipeId);
//     } else {
//       // If the recipe is already liked, unlike it (double tap)
//       updatedLikedRecipes.splice(index, 1);
//     }

//     setLikedRecipes(updatedLikedRecipes);
//     localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
//   };

//   const handleSearch = () => {
//     const query = searchQuery.toLowerCase().trim();

//     if (query === "") {
//       setFilteredRecipes(recipes); // reset
//       return;
//     }

//     const results = recipes.filter((recipe) =>
//       recipe.title?.toLowerCase().includes(query) ||
//       recipe.name?.toLowerCase().includes(query) ||
//       recipe.category?.toLowerCase() === query ||
//       recipe.ingredients?.some((ingredient) => ingredient.toLowerCase().includes(query))
//     );

//     setFilteredRecipes(results);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   const handleViewLiked = () => {
//     navigate("/liked-recipes");
//   };
// console.log("User object:", user);

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   return (
//     <div>
//       {/* Fixed Header */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           backgroundColor: '#ffffff',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '10px 20px',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//           zIndex: 1000,

//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <img
//             src="https://img.freepik.com/premium-vector/fresh-recipe-logo-book-logo_614438-458.jpg"
//             alt="logo"
//             style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
//           />
//           <img
//             src="https://www.brandbucket.com/sites/default/files/logo_uploads/539539/large_recipeease.png"
//             alt="heading"
//             style={{ height: '40px', objectFit: 'contain' }}
//           />
//         </div>


//         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: "35px" }}>

//           <input
//             type="text"
//             placeholder="Search recipes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
//           />
//           <button onClick={handleSearch} style={{ padding: '8px 14px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
//             Search
//           </button>
//         </div>
//         <div style={{ marginLeft: "50px", fontWeight: "bold", fontSize: "16px" }}>


//           <div style={{ position: 'relative', marginRight: "35px", display: "flex", gap: "10px" }}>
//             <div>
//   <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', color: '#333' }}>{user?.name || "guest"}
//   {user?.isPremium && (<span role="img" aria-label="premium user" style={{ fontSize: '20px' }}>
//       🥇
//     </span>)}
//     </p>
// </div>

//             <button
//               onClick={toggleDropdown}
//               style={{
//                 padding: '8px',
//                 backgroundColor: '#f8f9fa',
//                 border: '1px solid #ccc',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//               }}
//               title="More Options"
//             >
//               <SlOptionsVertical size={18} color="#333" />
//             </button>

//             {showDropdown && (
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '100%',
//                   right: 0,
//                   backgroundColor: 'white',
//                   border: '1px solid #ccc',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                   padding: '10px',
//                   marginTop: '8px',
//                   zIndex: 1000,
//                   width: '200px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '10px',
//                 }}
//               >
//                 <button onClick={handleViewLiked} style={{
//                   padding: '10px 20px',
//                   color: 'black',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                 }}>See your Fav <FcLike /></button>
//                 <button onClick={() => navigate("/add-recipe")} style={{
//                   padding: '10px 20px',
//                   color: 'black',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                 }}>Add your Recipe</button>
//                 <button onClick={() => navigate("/messages")} style={{
//                   padding: '10px 20px',
//                   color: 'black',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer', color: 'black'
//                 }}>Messages</button>
//                 {/* <button onClick={() => navigate("/upgrade")} style={{
//                 padding: '10px 20px',
//                 color: 'black',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//               }}>Upgrade to premium</button> */}
//                 {!user?.isPremium && (
//                   <button
//                     onClick={() => navigate("/upgrade")}
//                     style={{
//                       padding: '10px 20px',
//                       color: 'black',
//                       border: 'none',
//                       borderRadius: '6px',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     Upgrade to premium
//                   </button>
//                 )}

//                 <button onClick={() => navigate("/")} style={{
//                   padding: '10px 20px',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer', color: '#dc3545'
//                 }}>Logout</button>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* Recipes Grid */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//           gap: '20px',
//           padding: '20px',
//           marginTop: '72px'
//         }}
//       >
//         {loading ? (
//           <div style={{ justifyItems: "center" }}><b>Loading recipes...</b></div>
//         ) : filteredRecipes.length > 0 ? (
//           filteredRecipes.map((recipe) => (
//             <div key={recipe._id} style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//               <div

//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   width: '100%',
//                   maxWidth: '300px',
//                 }}
//               >
//                 <h2
//                   style={{
//                     fontSize: '18px',
//                     fontWeight: 'bold',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     flex: 1,
//                     marginRight: '10px',
//                   }}
//                   title={recipe.title}
//                 >
//                   {recipe.title}
//                 </h2>
//                 <img
//                   src={
//                     recipe.category.toLowerCase() === 'veg'
//                       ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrMiFM_AJxei0-KyqfxNkvnpH8pDeYqD_DhknUH95DfV15cfkDMsnFOSYYJo5-6WrRuY&usqp=CAU'
//                       : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzc24-YnyWcEVTjC1qI-GFGiYiQjUf3uqKQ&s'
//                   }
//                   alt={recipe.category}
//                   style={{ width: '24px', height: '24px', flexShrink: 0 }}
//                 />
//               </div>

//               <h3>{recipe.name}</h3>
//               <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
//               {/* <p><strong>Procedure:</strong> {recipe.procedure}</p> */}
//               <p className="text-gray-700 mt-2"><strong>Procedure:</strong>
//                 {recipe.procedure.length > 10
//                   ? ` ${recipe.procedure.slice(0, 10)}...`
//                   : recipe.procedure}
//               </p>
//               {recipe.image && (
//                 <div style={{ width: '100%', height: '200px', marginTop: '10px' }}>
//                   <img
//                     src={recipe.image}
//                     alt={recipe.title}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
//                     onError={(e) => {
//                       e.target.src = 'path_to_placeholder_image.jpg';
//                     }}
//                   />
//                 </div>
//               )}
//               <div>
//                 <button
//                   onClick={() => handleLike(recipe._id)}
//                   style={{
//                     marginTop: '12px',
//                     padding: '8px 12px',
//                     // backgroundColor: likedRecipes.includes(recipe._id) ? '#dc3545' : '#6c757d',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {likedRecipes.includes(recipe._id) ? <FcLike /> : <FcLikePlaceholder />}
//                 </button>
//               </div>
//               <Link to={`/recipe/${recipe._id}`} style={{ color: '#007bff', textDecoration: 'none', display: 'block', marginTop: '10px' }}>
//                 View Details
//               </Link>
//             </div>
//           ))
//         ) : (
//           <div>No recipes found.</div>

//         )}
//       </div>

//     </div>


//   );
// };

// export default RecipeList;




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { SlOptionsVertical } from "react-icons/sl";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  // Pagination/explore button state for each section
  const [showAllRecipesCount, setShowAllRecipesCount] = useState(7);
  const [showPremiumRecipesCount, setShowPremiumRecipesCount] = useState(7);
  const [showVegRecipesCount, setShowVegRecipesCount] = useState(7);
  const [showNonVegRecipesCount, setShowNonVegRecipesCount] = useState(7);

  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch recipes and liked recipes on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setRecipes([]);
        setLoading(false);
      });

    const storedLikedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
    setLikedRecipes(storedLikedRecipes);
  }, []);

  // Like/unlike recipe handler
  const handleLike = (recipeId) => {
    const updatedLikedRecipes = [...likedRecipes];
    const index = updatedLikedRecipes.indexOf(recipeId);

    if (index === -1) {
      updatedLikedRecipes.push(recipeId);
    } else {
      updatedLikedRecipes.splice(index, 1);
    }

    setLikedRecipes(updatedLikedRecipes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
  };
  // const handleLike = async (recipeId) => {
  //   try {
  //     const isLiked = likedRecipes.includes(recipeId);

  //     const url = isLiked
  //       ? "http://localhost:5000/api/wishlist/remove"
  //       : "http://localhost:5000/api/wishlist/add";

  //     const method = isLiked ? "DELETE" : "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ recipeId }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       // Backend returns updated wishlist array
  //       setLikedRecipes(data.wishlist);
  //       // Optionally update localStorage for fallback/cache
  //       localStorage.setItem("likedRecipes", JSON.stringify(data.wishlist));
  //     } else {
  //       console.error("Error updating wishlist:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error in handleLike:", error);
  //   }
  // };



  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (recipe.title && recipe.title.toLowerCase().includes(q)) ||
      (recipe.name && recipe.name.toLowerCase().includes(q)) ||
      (recipe.category && recipe.category.toLowerCase() === q) ||
      (recipe.ingredients && recipe.ingredients.some((ing) => ing.toLowerCase().includes(q)))
    );
  });

  // Separate filtered recipes into categories
  const allRecipes = filteredRecipes;
  const premiumRecipes = filteredRecipes.filter((r) => r.isPremium);
  const vegRecipes = filteredRecipes.filter((r) => r.category?.toLowerCase() === "veg");
  const nonVegRecipes = filteredRecipes.filter((r) => r.category?.toLowerCase() === "non-veg");

  // Explore more handlers for pagination
  const exploreMoreAll = () => setShowAllRecipesCount((count) => count + 7);
  const exploreMorePremium = () => setShowPremiumRecipesCount((count) => count + 7);
  const exploreMoreVeg = () => setShowVegRecipesCount((count) => count + 7);
  const exploreMoreNonVeg = () => setShowNonVegRecipesCount((count) => count + 7);


  const renderRecipeCard = (recipe) => (
    <div
      key={recipe._id}
      style={{
        padding: "16px",
        border: recipe.view === "premium" ? "2px solid #fbbf24" : "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        backgroundColor: recipe.view === "premium" ? "#fffbea" : "#fff",
        marginBottom: "20px",
      }}
    >
      {recipe.view === "premium" && (
        <div
          style={{
            padding: "4px 8px",
            backgroundColor: "#fbbf24",
            color: "#92400e",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "8px",
            display: "inline-block",
          }}
        >
          Premium
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "300px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
            marginRight: "10px",
          }}
          title={recipe.title}
        >
          {recipe.title}
        </h2>
        <img
          src={
            recipe.category?.toLowerCase() === "veg"
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrMiFM_AJxei0-KyqfxNkvnpH8pDeYqD_DhknUH95DfV15cfkDMsnFOSYYJo5-6WrRuY&usqp=CAU"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzc24-YnyWcEVTjC1qI-GFGiYiQjUf3uqKQ&s"
          }
          alt={recipe.category}
          style={{ width: "24px", height: "24px", flexShrink: 0 }}
        />
      </div>

      <h3>{recipe.name}</h3>
      {/* <p>
        <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
      </p>
      <p style={{ color: "#555", marginTop: "8px" }}>
        <strong>Procedure:</strong>{" "}
        {recipe.procedure.length > 10 ? `${recipe.procedure.slice(0, 10)}...` : recipe.procedure}
      </p> */}

      {recipe.image && (
        <div style={{ position: "relative", marginTop: "10px" }}>
          <img
              src={recipe.image ? `http://localhost:5000${recipe.image}` : ""}
              alt={recipe.title}
              style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
              onError={(e) => {
                console.error("Error loading image:", recipe.image);
                e.target.style.display = "none";
              }}
            />
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(recipe._id);
              }}
            >
              {likedRecipes.includes(recipe._id) ? (
                <FcLike size={24} />
              ) : (
                <FcLikePlaceholder size={24} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* <Link
        to={`/recipe/${recipe._id}`}
        style={{
          color: "#007bff",
          textDecoration: "none",
          display: "block",
          marginTop: "10px",
        }}
      >
        View Details
      </Link> */}
      {recipe.view === "premium" && (
                    <div>
                      {/* <span className="premium-badge"></span>  */}
                      {user?.isPremium ? (
                        <Link to={`/recipe/${recipe._id}`}>Premium Recipe</Link>
                      ) : (
                        <Link to="/upgrade">Premium Recipe</Link>
                      )}
                    </div>
                  )}
                  {recipe.view !== "premium" && (
  <div>
    <Link to={`/recipe/${recipe._id}`}>Explore Recipe</Link>
  </div>
)}
    </div>
  );


  // Render a section with title, recipe cards, and explore button
  const renderSection = (title, recipesArray, showCount, onExplore) => {
    if (!recipesArray.length) return null;
    return (
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>{title}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {recipesArray.slice(0, showCount).map(renderRecipeCard)}
          {recipesArray.length > showCount && (
            <button
              onClick={onExplore}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "8px",
                border: "2px solid #007bff",
                backgroundColor: "white",
                color: "#007bff",
                alignSelf: "center",
                justifySelf: "center",
                height: "60px",
                maxWidth: "300px",
              }}
            >
              Explore More
            </button>
          )}
        </div>
      </div>
    );
  };

  // Search handling (on button click or enter key)
  const handleSearch = () => {

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Navigate to liked recipes page
  const handleViewLiked = () => {
    navigate("/liked-recipes");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div>
      {/* Fixed Header */}
//       <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,

        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://img.freepik.com/premium-vector/fresh-recipe-logo-book-logo_614438-458.jpg"
            alt="logo"
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <img
            src="https://www.brandbucket.com/sites/default/files/logo_uploads/539539/large_recipeease.png"
            alt="heading"
            style={{ height: '40px', objectFit: 'contain' }}
          />
        </div>


        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: "35px" }}>

          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
          />
          {/* <button onClick={handleSearch} style={{ padding: '8px 14px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Search
          </button> */}
        </div>
        <div style={{ marginLeft: "50px", fontWeight: "bold", fontSize: "16px" }}>


          <div style={{ position: 'relative', marginRight: "35px", display: "flex", gap: "10px" }}>
            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', color: '#333' }}>{user?.name || "guest"}
                {user?.isPremium && (<span role="img" aria-label="premium user" style={{ fontSize: '20px' }}>
                  🥇
                </span>)}
              </p>
            </div>

            <button
              onClick={toggleDropdown}
              style={{
                padding: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
              title="More Options"
            >
              <SlOptionsVertical size={18} color="#333" />
            </button>

            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px',
                  marginTop: '8px',
                  zIndex: 1000,
                  width: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <button onClick={handleViewLiked} style={{
                  padding: '10px 20px',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}>See your Fav <FcLike /></button>
                <button onClick={() => navigate("/add-recipe")} style={{
                  padding: '10px 20px',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}>Add your Recipe</button>
                <button onClick={() => navigate("/messages")} style={{
                  padding: '10px 20px',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer', color: 'black'
                }}>Messages</button>

                {!user?.isPremium && (
                  <button
                    onClick={() => navigate("/upgrade")}
                    style={{
                      padding: '10px 20px',
                      color: 'black',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Upgrade to premium
                  </button>
                )}

                <button onClick={() => navigate("/login")} style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer', color: '#dc3545'
                }}>Logout</button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Recipes Grid */}



      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderBottom: "1px solid #ddd",
          zIndex: 999,
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Recipe List</h1>

        <div style={{ position: "relative" }}>
          <SlOptionsVertical
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={toggleDropdown}
            aria-label="Options"
          />
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "8px 0",
                width: "150px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={handleViewLiked}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                Liked Recipes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div style={{ height: "60px" }}></div>

      {/* Loading indicator */}
      {loading && <p style={{ textAlign: "center" }}>Loading recipes...</p>}

      {/* Recipe sections */}
      {!loading && (
        <div style={{ padding: "0 20px 40px" }}>
          {renderSection("All Recipes", allRecipes, showAllRecipesCount, exploreMoreAll)}
          {renderSection("Premium Recipes", premiumRecipes, showPremiumRecipesCount, exploreMorePremium)}
          {renderSection("Veg Recipes", vegRecipes, showVegRecipesCount, exploreMoreVeg)}
          {renderSection("Non-Veg Recipes", nonVegRecipes, showNonVegRecipesCount, exploreMoreNonVeg)}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
