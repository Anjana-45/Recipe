// import { useEffect, useState } from "react";
// import "../styles/messages.css"
// import { useNavigate } from "react-router-dom";


// const MessagesPage = () => {
//   const [userRecipes, setUserRecipes] = useState([]);
//   const [userEmail, setUserEmail] = useState(""); // Get this from your auth logic
//   const navigate=useNavigate()

// useEffect(() => {
//   fetch("http://localhost:5000/api/recipes/user", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`, // include token
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Fetched recipes data:", data.recipes); // log it
//       setUserRecipes(data.recipes); // might need to use data.recipes instead
//     })
//   //   .then((data) => {
//   // console.log("Full response:", data);
//   // console.log("Fetched recipes data:", data.recipes);
//   // setUserRecipes(data.recipes);
//   // if (data.recipes && Array.isArray(data.recipes)) {
//   //       setUserRecipes(data.recipes);
//   //     } else {
//   //       setUserRecipes([]); // prevent crash
//   //     }
// // })
  

    

//     .catch((err) => console.error("Error fetching user recipes:", err));
// }, []);


//   return (
  
// <div className="container">
//   <div className="header">
//     <button onClick={() => navigate("/home")}style={{marginLeft:"10px"}}>Back</button>
//     <h2 style={{marginRight:"208px"}}>Your Recipe Status & Messages</h2>
//   </div>

//   {userRecipes?.length === 0 ? (
//     <p style={{ placeSelf: "center", marginTop: "150px" }}>You haven’t added any recipes yet.</p>
//   ) : (
//     <div className="space-y-4">
//       {userRecipes.map((recipe) => (
//         <div key={recipe._id} className="recipe-card">
//           <h3 className="recipe-title">{recipe.title}</h3>
//           <p>
//             Status:
//             <span className={`recipe-status ${recipe.status}`}>
//               {recipe.status}
//             </span>
//           </p>

//           {recipe.status === "approved" && (
//             <div className="status-msg approved">
//               🎉 Congratulations! You've earned +5 bonus points!
//             </div>
//           )}
//           {recipe.status === "rejected" && (
//             <div className="status-msg rejected">
//               ❌ Sorry, your recipe was rejected.
//             </div>
//           )}
//           {recipe.status === "pending" && (
//             <div className="status-msg pending">
//               ⏳ Awaiting admin approval.
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )}
// </div>
//   );
// };

// export default MessagesPage;






// import { useEffect, useState } from "react";
// import "../styles/messages.css";
// import { useNavigate } from "react-router-dom";

// const MessagesPage = () => {
//   const [userRecipes, setUserRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/recipes/user/points", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // include token
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched recipes data:", data.recipes);
//         if (data.recipes && Array.isArray(data.recipes)) {
//           setUserRecipes(data.recipes);
//         } else {
//           setUserRecipes([]);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user recipes:", err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="container">
//         <p>Loading your recipes...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container">
//         <p style={{ color: "red" }}>Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="header">
//         <button onClick={() => navigate("/home")} style={{ marginLeft: "10px" }}>
//           Back
//         </button>
//         <h2 style={{ marginRight: "208px" }}>Your Recipe Status & Messages</h2>
//       </div>

//       {userRecipes.length === 0 ? (
//         <p style={{ placeSelf: "center", marginTop: "150px" }}>You haven’t added any recipes yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {userRecipes.map((recipe) => (
//             <div key={recipe._id} className="recipe-card">
//               <h3 className="recipe-title">{recipe.title}</h3>
//               <p>
//                 Status:
//                 <span className={`recipe-status ${recipe.status}`}>{recipe.status}</span>
//               </p>

//               {recipe.status === "approved" && (
//                 <div className="status-msg approved">
//                   🎉 Congratulations! You've earned +5 bonus points!
//                 </div>
//               )}
//               {recipe.status === "rejected" && (
//                 <div className="status-msg rejected">❌ Sorry, your recipe was rejected.</div>
//               )}
//               {recipe.status === "pending" && (
//                 <div className="status-msg pending">⏳ Awaiting admin approval.</div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesPage;






import { useEffect, useState } from "react";
import "../styles/messages.css"
import { useNavigate } from "react-router-dom";


const MessagesPage = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Get this from your auth logic
  const navigate=useNavigate()

useEffect(() => {
  fetch("http://localhost:5000/api/recipes/user/points", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // include token
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched recipes data:", data.recipes); // log it
      setUserRecipes(data.recipes) 
      .then((data) => {
  console.log("Full response:", data);
  console.log("Fetched recipes data:", data.recipes);
  setUserRecipes(data.recipes);
  if (data.recipes && Array.isArray(data.recipes)) {
        setUserRecipes(data.recipes);
      } else {
        setUserRecipes([]); // prevent crash
      }
})// might need to use data.recipes instead
    })
    .catch((err) => console.error("Error fetching user recipes:", err));
}, []);


  return (
  
<div className="container">
  <div className="header">
    <button onClick={() => navigate("/home")}style={{marginLeft:"10px"}}>Back</button>
    <h2 style={{marginRight:"208px"}}>Your Recipe Status & Messages</h2>
  </div>

  {userRecipes?.length === 0 ? (
    <p style={{ placeSelf: "center", marginTop: "150px" }}>You haven’t added any recipes yet.</p>
  ) : (
    <div className="space-y-4">
      {userRecipes.map((recipe) => (
        <div key={recipe._id} className="recipe-card">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p>
            Status:
            <span className={`recipe-status ${recipe.status}`}>
              {recipe.status}
            </span>
          </p>

          {recipe.status === "approved" && (
            <div className="status-msg approved">
              🎉 Congratulations! You've earned +5 bonus points!
            </div>
          )}
          {recipe.status === "rejected" && (
            <div className="status-msg rejected">
              ❌ Sorry, your recipe was rejected.
            </div>
          )}
          {recipe.status === "pending" && (
            <div className="status-msg pending">
              ⏳ Awaiting admin approval.
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default MessagesPage;
