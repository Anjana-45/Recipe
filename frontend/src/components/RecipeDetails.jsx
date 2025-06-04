// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/recipes/`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Recipe data:", data);
//         setRecipe(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching recipe:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Loading recipe details...</p>;
//   if (!recipe) return <p>Recipe not found.</p>;

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold">{recipe.title}</h1>

//       {recipe.image && (
//         <div className="my-4">
//           <img 
//             src={recipe.image} 
//             alt={recipe.title} 
//             className="max-w-md rounded-lg shadow-md"
//             onError={(e) => {
//               console.error("Error loading image:", recipe.image);
//               e.target.style.display = 'none';
//             }}
//           />
//         </div>
//       )}

//       <p><strong>Category:</strong> {recipe.category}</p>
//       <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
//       <p><strong>procedure:</strong> {recipe.procedure}</p> 
//     </div>
//   );
// };

// export default RecipeDetail;



import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate()
  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes`)  // ✅ Use existing route
      .then((response) => response.json())
      .then((data) => {
        const found = data.find((r) => r._id === id); // ✅ Filter by id
        if (!found) {
          console.error("Recipe not found");
        }
        setRecipe(found);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [id]);

  const backendBaseURL = "http://localhost:5000";

  if (loading) return <p>Loading recipe details...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          backgroundColor: " rgb(255, 255, 255)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          boxShadow: " rgba(0, 0, 0, 0.1) 0px 2px 10px",
          zIndex: "1000"

        }}
      >
        <button
          onClick={() => nav("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <IoChevronBackSharp />
          Back
        </button>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            flexGrow: 1,
            margin: "10px 0",
          }}
        >
          {recipe.title}
        </h1>
      </div>


      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "stretch",
          flexWrap: "wrap",
          marginTop: "80px"
        }}
      >
        {recipe.image && (
          <div style={{ flex: "1", minWidth: "300px" }}>
            <img
              src={recipe.image ? `http://localhost:5000${recipe.image}` : ""}
              alt={recipe.title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onError={(e) => {
                console.error("Error loading image:", recipe.image);
                e.target.style.display = "none";
              }}
            />

          </div>
        )}

        <div style={{ flex: "2", minWidth: "300px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Ingredients:</strong>{" "}
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients.join(", ")
              : recipe.ingredients}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Procedure:</strong> {recipe.procedure}
          </p>
        </div>
      </div>
    </div>


  );

};

export default RecipeDetail;
