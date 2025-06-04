// import { useNavigate } from "react-router-dom"
// function FrontPage(){
//     const navigate=useNavigate()
//     return(
//         <div>
            
//             <img src="https://thumbs.dreamstime.com/b/christmas-mas-baking-culinary-background-cooking-recipe-xmas-noel-gingerbread-cookies-kitchen-table-ingredients-161556625.jpg" alt="" />
//             <div>
//                 <p>Try out Premium recipes...</p>
//             </div>
//             <button onClick={()=>navigate("/login")}>Login </button>
//         </div>
//     )
// }
// export default FrontPage

import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img
        src="https://thumbs.dreamstime.com/b/christmas-mas-baking-culinary-background-cooking-recipe-xmas-noel-gingerbread-cookies-kitchen-table-ingredients-161556625.jpg"
        alt="Delicious Recipes"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      <div style={{
        position: "relative",
        zIndex: 1,
        color: "white",
        textAlign: "center",
        padding: "20px",
        top: "50%",
        transform: "translateY(-50%)"
      }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px", color:"black" }}>
          Welcome to FlavorHub!
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px", maxWidth: "600px", margin: "0 auto", color:"black" }}>
          Discover, share, and explore a variety of delicious recipes — from quick bites to premium gourmet dishes. Your perfect meal starts here!
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login to Explore
        </button>
      </div>
    </div>
  );
}

export default FrontPage;
