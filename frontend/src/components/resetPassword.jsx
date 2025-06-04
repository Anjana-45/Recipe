import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  
  const {id, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/password/reset-password/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful.");
        setTimeout(() => navigate("/"), 2000); // Redirect to login after 2s
      } else {
        setMessage(data.message || "Invalid or expired token.");
      }
    } catch (err) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div
  style={{
    padding: "24px",
    maxWidth: "400px",
    margin: "40px auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  }}
>
  <h2
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
    }}
  >
    Reset Password
  </h2>

  <form onSubmit={handleReset}>
    <input
      type="password"
      required
      placeholder="Enter new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "100%",
        borderRadius: "4px",
        marginBottom: "16px",
        fontSize: "16px",
      }}
    />

    <button
      type="submit"
      style={{
        backgroundColor: "#16a34a", // Tailwind's green-600
        color: "#fff",
        padding: "10px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        width: "100%",
      }}
    >
      Reset Password
    </button>
  </form>

  {message && (
    <p
      style={{
        marginTop: "16px",
        fontSize: "14px",
        color: "#333",
        textAlign: "center",
      }}
    >
      {message}
    </p>
  )}
</div>


    
  );
};

export default ResetPassword;
