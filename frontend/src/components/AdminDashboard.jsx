import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "../styles/adminDashboard.css"
const AdminDashboard = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [approvedRecipes, setApprovedRecipes] = useState([]);
  const [rejectedRecipes, setRejectedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [showAddForm, setShowAddForm] = useState(false);
  // const [showUsers, setShowUsers] = useState(false);
  // const [showPending, setShowPending] = useState(false);
  // const [showAllRecipes, setShowAllRecipes] = useState(false);
  // const [showRejected, setShowRejected] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    procedure: "",
    image: null,
    category: "veg",
    isPremium: false,
  });

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token} ` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) {
          navigate("/home");
        } else {
          setIsAdmin(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error verifying admin:", err);
        navigate("/login");
      });
  }, [navigate]);



  useEffect(() => {
    const token = localStorage.getItem("token");
    //   if (token) {
    //     fetchAllRecipes(token);
    //   }
    // }, [showPending, showRejected, showAllRecipes]);
    if (token && activeTab === "all") {
      fetchAllRecipes(token);
    }
  }, [activeTab]);
  const fetchAllRecipes = (token) => {
    fetch("http://localhost:5000/api/admin/recipes", {
      headers: { Authorization: ` Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Received data is not an array');
        }
        console.log('All recipes:', data); // Debug log

        setAllRecipes(data);
        setApprovedRecipes(data.filter((r) => r.status === "approved"));
        setPendingRecipes(data.filter((r) => r.status === "pending"));
        setRejectedRecipes(data.filter((r) => r.status === "rejected"));

        console.log('Pending recipes:', data.filter((r) => r.status === "pending")); // Debug log

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all recipes:", err);
        setLoading(false);
      });
  };

  const filteredUsers = users.filter((user) =>
    (user.name?.toLowerCase() || user.email?.toLowerCase()).includes(searchQuery.toLowerCase())
  );

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/deleteUser/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      alert("User removed");
      fetchAllUsers(); // Refresh user list
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };


  const fetchAllUsers = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };


  const approveRecipe = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in as an admin to approve recipes.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/recipes/approve/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different status codes for clarity
        switch (response.status) {
          case 401:
            alert("Unauthorized: Please log in again.");
            break;
          case 403:
            alert("Forbidden: Only admin can approve recipes.");
            break;
          case 404:
            alert(data.message || "Recipe or user not found.");
            break;
          case 500:
            alert("Server error occurred while approving the recipe.");
            break;
          default:
            alert(data.message || "An unexpected error occurred.");
        }
        console.error("Error approving recipe:", data.message || data.error);
        return;
      }

      // Success
      alert(data.message);
      console.log("Recipe approved:", data);
      fetchAllRecipes(token); // Refresh the list
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please check your internet connection or try again later.");
    }
  };



  const deleteRecipe = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Recipe deleted successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete recipe error:", error);
    }
  };


  const rejectRecipe = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/recipes/reject/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token} ` },
      });
      fetchAllRecipes(token);
    } catch (err) {
      console.error("Error rejecting recipe:", err);
    }
  };
  // const restoreRejectedRecipe = async (id) => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     await fetch("http://localhost:5000/api/recipes/restore/${id}", {
  //       method: "PUT",
  //       headers: { Authorization: ` Bearer ${token} ` },
  //     });
  //     fetchAllRecipes(token);
  //   } catch (err) {
  //     console.error("Error restoring rejected recipe:", err);
  //   }
  // };

const restoreRecipe = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/admin/recipes/restore/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Recipe restored to pending.");
      // fetchRejectedRecipes(); 
       fetchAllRecipes(token);
    } else {
      alert(data.message || "Failed to restore recipe.");
    }
  } catch (error) {
    console.error("❌ Error restoring recipe:", error);
    alert("Server error");
  }
};

  const handleEditRecipe = (recipe) => {
    console.log("Editing recipe:", recipe);

    setNewRecipe({
      _id: recipe._id,
      title: recipe.title || "",
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients || "",
      procedure: recipe.procedure || "",
      image: recipe.image || null,
      category: recipe.category || "veg",
      isPremium: recipe.isPremium || false,
    });

    setEditingRecipeId(recipe._id);
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setNewRecipe({ ...newRecipe, [name]: checked });
    } else if (name === "image") {
      setNewRecipe({ ...newRecipe, image: files[0] });
    } else {
      setNewRecipe({ ...newRecipe, [name]: value });
    }
  };


  const handleAddRecipe = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (let key in newRecipe) {
      if (key === "ingredients") {
        const ingredientsArray = newRecipe.ingredients.split(",").map(i => i.trim());
        formData.append(key, JSON.stringify(ingredientsArray));
      } else if (key === "image" && newRecipe.image instanceof File) {
        formData.append(key, newRecipe.image);
      } else {
        formData.append(key, newRecipe[key]);
      }
    }

    try {
      const res = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add recipe");

      alert("Recipe added successfully!");
      resetForm();
      fetchAllRecipes(token);
    } catch (err) {
      console.error("Add recipe error:", err);
      alert("Failed to add recipe. Please try again.");
    }
  };

  const handleUpdateRecipe = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (let key in newRecipe) {
      if (key === "ingredients") {
        const ingredientsArray = newRecipe.ingredients.split(",").map(i => i.trim());
        formData.append(key, JSON.stringify(ingredientsArray));
      } else if (key === "image" && newRecipe.image instanceof File) {
        formData.append(key, newRecipe.image);
      } else {
        formData.append(key, newRecipe[key]);
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/api/recipes/update/${newRecipe._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update recipe");
      }

      alert("Recipe updated successfully!");
      resetForm();
      fetchAllRecipes(token);
    } catch (err) {
      console.error("Update recipe error:", err);
      alert(err.message || "Failed to update recipe. Please try again.");
    }
  };

  const resetForm = () => {
    setNewRecipe({
      title: "",
      ingredients: "",
      procedure: "",
      image: null,
      category: "veg",
      isPremium: false,
    });
    setEditingRecipeId(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };


  const filteredRecipes = (recipes) =>
    Array.isArray(recipes)
      ? recipes.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : [];

  if (!isAdmin) return null;
  if (loading) return <p>Loading dashboard...</p>;


  const moveToPending = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/moveToPending/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pending" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to move to pending: ${errorData.message || errorData.error}`);
        return;
      }

      alert("Recipe moved to pending!");
      fetchAllRecipes(token); // Refresh the lists
    } catch (err) {
      console.error("Error moving recipe to pending:", err);
      alert("Error occurred while moving recipe to pending.");
    }
  };




  return (











    <div style={{ padding: "20px" }}>
      <h2 className="header" style={{ justifyContent: "center" }}> Admin Dashboard - Manage Recipes</h2>
      <div className="full-body">

        <div className="titles">
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: activeTab === null ? "#007bff" : "transparent",
              color: activeTab === null ? "white" : "black",
              padding: "8px 12px", borderRadius: "4px", border: "1px solid #007bff", cursor: "pointer",
            }}><IoMdArrowBack />Logout
          </button>

          <button
            onClick={() => setActiveTab(activeTab === "add" ? null : "add")}
            style={{
              backgroundColor: activeTab === "add" ? "#007bff" : "transparent",
              color: activeTab === "add" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #007bff",
              cursor: "pointer",
            }}
          >
            {activeTab === "add" ? "Close Add Form" : "➕ Add New Recipe"}
          </button>

          <button
            onClick={() => setActiveTab(activeTab === "pending" ? null : "pending")}
            style={{
              backgroundColor: activeTab === "pending" ? "#007bff" : "transparent",
              color: activeTab === "pending" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #007bff",
              cursor: "pointer",
            }}
          >
            {activeTab === "pending" ? "Hide Pending Recipes" : "🔄 View Pending Recipes"}
          </button>

          <button
            onClick={() => setActiveTab(activeTab === "rejected" ? null : "rejected")}
            style={{
              backgroundColor: activeTab === "rejected" ? "#007bff" : "transparent",
              color: activeTab === "rejected" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #007bff",
              cursor: "pointer",
            }}
          >
            {activeTab === "rejected" ? "Hide Rejected Recipes" : "❌ Rejected Recipes"}
          </button>

          <button
            onClick={() => {
              if (activeTab !== "users") fetchAllUsers();
              setActiveTab(activeTab === "users" ? null : "users");
            }}
            style={{
              backgroundColor: activeTab === "users" ? "#007bff" : "transparent",
              color: activeTab === "users" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #007bff",
              cursor: "pointer",
            }}
          >
            {activeTab === "users" ? "Hide Users" : "👥 See Users"}
          </button>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (activeTab !== "all") fetchAllRecipes(token);
              setActiveTab(activeTab === "all" ? null : "all");
            }}
            style={{
              backgroundColor: activeTab === "all" ? "#007bff" : "transparent",
              color: activeTab === "all" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #007bff",
              cursor: "pointer",
            }}
          >
            {activeTab === "all" ? "🙈 Hide All Recipes" : "🔎 See All Recipes"}
          </button>
        </div>



        <div className="Right-box ">
          
          <div className="Add">
            {/* {showAddForm && ( */}
            {activeTab === "add" && (
              <div style={{ border: "1px solid #999", borderRadius: "8px", padding: "15px", marginTop: "20px" }}>
                <h3>{isEditing ? "Edit Recipe" : "Add New Recipe"}</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="Recipe Title"
                  value={newRecipe.title}
                  onChange={handleInputChange}
                  style={{ display: "block", margin: "10px 0" }}
                />
                <textarea
                  name="ingredients"
                  placeholder="Ingredients (comma-separated)"
                  value={newRecipe.ingredients}
                  onChange={handleInputChange}
                  style={{ display: "block", margin: "10px 0" }}
                />
                <textarea
                  name="procedure"
                  placeholder="Method"
                  value={newRecipe.procedure}
                  onChange={handleInputChange}
                  style={{ display: "block", margin: "10px 0" }}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: "block", margin: "10px 0" }}
                />
                <select
                  name="category"
                  value={newRecipe.category}
                  onChange={handleInputChange}
                  style={{ display: "block", margin: "10px 0" }}
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
                <label style={{ display: "block", margin: "10px 0" }}>
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={newRecipe.isPremium}
                    onChange={handleInputChange}
                  />{" "}
                  Only for Subscribed Users (Premium)
                </label>
                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={isEditing ? handleUpdateRecipe : handleAddRecipe}
                    style={{ marginRight: "10px" }}
                  >
                    {isEditing ? "Update Recipe" : "Add Recipe"}
                  </button>
                  <button onClick={resetForm}>Cancel</button>
                </div>
              </div>
            )}
          </div>
          {/* {showPending && ( */}
          {activeTab === "pending" && (
            <>
              <div style={{ display: "block" }}>
                <h1>Pending Recipe</h1>
                <h3>🕒 Pending Recipes ({pendingRecipes.length})</h3>
              </div>
              {pendingRecipes.length === 0 ? (
                <p>No pending recipes found</p>
              ) : (
                <>
                  <div>
                    <button
                      onClick={async () => {
                        if (!window.confirm("Are you sure you want to reject ALL pending recipes?")) return;
                        const token = localStorage.getItem("token");
                        for (const recipe of pendingRecipes) {
                          await rejectRecipe(recipe._id);
                        }
                      }}
                      style={{
                        backgroundColor: "#d9534f",
                        color: "white",
                        marginBottom: "10px"
                      }}
                    >
                      ❌ Reject All Pending
                    </button>
                  </div>
                  {pendingRecipes.map((recipe) => (
                    <div
                      key={recipe._id}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        margin: "10px 0",
                      }}
                    >
                      {editingRecipeId === recipe._id ? (
                        <div style={{ padding: "15px" }}>
                          <h3>Edit Recipe</h3>
                          <input
                            type="text"
                            name="title"
                            placeholder="Recipe Title"
                            value={newRecipe.title}
                            onChange={handleInputChange}
                            style={{ display: "block", margin: "10px 0", width: "100%" }}
                          />
                          <textarea
                            name="ingredients"
                            placeholder="Ingredients (comma-separated)"
                            value={newRecipe.ingredients}
                            onChange={handleInputChange}
                            style={{ display: "block", margin: "10px 0", width: "100%" }}
                          />
                          <textarea
                            name="procedure"
                            placeholder="Method"
                            value={newRecipe.procedure}
                            onChange={handleInputChange}
                            style={{ display: "block", margin: "10px 0", width: "100%" }}
                          />
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleInputChange}
                            style={{ display: "block", margin: "10px 0" }}
                          />
                          <select
                            name="category"
                            value={newRecipe.category}
                            onChange={handleInputChange}
                            style={{ display: "block", margin: "10px 0" }}
                          >
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                          </select>
                          <label style={{ display: "block", margin: "10px 0" }}>
                            <input
                              type="checkbox"
                              name="isPremium"
                              checked={newRecipe.isPremium}
                              onChange={handleInputChange}
                            />{" "}
                            Only for Subscribed Users (Premium)
                          </label>
                          <div style={{ marginTop: "15px" }}>
                            <button
                              onClick={handleUpdateRecipe}
                              style={{ marginRight: "10px" }}
                            >
                              Update Recipe
                            </button>
                            <button onClick={resetForm}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4>{recipe.title}</h4>
                          <p>Category: {recipe.category}</p>
                          <p>Submitted by: {recipe?.submittedBy || recipe?.user?.email || "Unknown"}</p>
                          <p>Status: <strong>{recipe.status}</strong></p>
                          <div style={{ marginTop: "10px" }}>
                            <button onClick={() => approveRecipe(recipe._id)}>✅ Approve</button>
                            <button onClick={() => rejectRecipe(recipe._id)} style={{ marginLeft: "10px" }}>❌ Reject</button>
                            <button onClick={() => handleEditRecipe(recipe)} style={{ marginLeft: "10px" }}>✏ Edit</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
          {/* {showRejected && ( */}

          {activeTab === "rejected" && (
            <div>
              <h3>❌ Rejected Recipes</h3>
              {rejectedRecipes.length === 0 ? (
                <p>No rejected recipes.</p>
              ) : (
                rejectedRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <h4>{recipe.title}</h4>
                    <p>Category: {recipe.category}</p>
                    <p>Submitted by: {recipe?.user?.email || "Unknown"}</p>
                    <p>Status: <strong>{recipe.status}</strong></p>
                    <button onClick={() => restoreRecipe(recipe._id)}>🔄 Restore</button>
                    <button onClick={() => deleteRecipe(recipe._id)}>Permanently Delete</button>
                  </div>
                ))

              )}
            </div>
          )}

          {/* {showAllRecipes && ( */}
          {activeTab === "all" && (
            <div>
              <h3>All Recipes</h3>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search Recipes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                />
              </div>
              {filteredRecipes(allRecipes).map((recipe) => (
                <div
                  key={recipe._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                >
                  {editingRecipeId === recipe._id ? (
                    <div style={{ padding: "15px" }}>
                      <h3>Edit Recipe</h3>
                      <input
                        type="text"
                        name="title"
                        placeholder="Recipe Title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        style={{ display: "block", margin: "10px 0", width: "100%" }}
                      />
                      <textarea
                        name="ingredients"
                        placeholder="Ingredients (comma-separated)"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange}
                        style={{ display: "block", margin: "10px 0", width: "100%" }}
                      />
                      <textarea
                        name="procedure"
                        placeholder="Method"
                        value={newRecipe.procedure}
                        onChange={handleInputChange}
                        style={{ display: "block", margin: "10px 0", width: "100%" }}
                      />
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        style={{ display: "block", margin: "10px 0" }}
                      />
                      <select
                        name="category"
                        value={newRecipe.category}
                        onChange={handleInputChange}
                        style={{ display: "block", margin: "10px 0" }}
                      >
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                      </select>
                      <label style={{ display: "block", margin: "10px 0" }}>
                        <input
                          type="checkbox"
                          name="isPremium"
                          checked={newRecipe.isPremium}
                          onChange={handleInputChange}
                        />{" "}
                        Only for Subscribed Users (Premium)
                      </label>
                      <div style={{ marginTop: "15px" }}>
                        <button
                          onClick={handleUpdateRecipe}
                          style={{ marginRight: "10px" }}
                        >
                          Update Recipe
                        </button>
                        <button onClick={resetForm}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4>{recipe.title}</h4>
                      <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
                      <p><strong>Procedure:</strong> {recipe.procedure}</p>
                      <p>Category: {recipe.category}</p>
                      <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
                        <button onClick={() => deleteRecipe(recipe._id)} style={{ marginLeft: "10px" }}>❌ Delete</button>
                        <button onClick={() => moveToPending(recipe._id)} style={{ marginLeft: "10px" }}>Move to pending</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* {showUsers && ( */}
          {activeTab === "users" && (
            <div style={{ marginTop: "30px" }}>
              <h3>👥 Registered Users</h3>
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "5px", marginBottom: "15px", width: "100%" }}
              />
              {filteredUsers.length === 0 ? (
                <p>No users found.</p>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong>{user.name}</strong> <br />
                      <small>{user.email}</small>
                    </div>
                    <button
                      onClick={() => deleteUser(user._id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>


  );
};
export default AdminDashboard;


