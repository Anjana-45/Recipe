import { useState } from "react";
// import "../styles/forgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/password/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Reset link sent to your email.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error sending reset email.");
    }
  };

  return (
    // <div className="p-6 max-w-md mx-auto">
    //   <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       required
    //       placeholder="Enter your email"
    //       className="border p-2 w-full mb-4"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
    //       Send Reset Link
    //     </button>
    //   </form>
    //   {message && <p className="mt-4 text-sm">{message}</p>}
    // </div>
    
    <div style={{
  padding: "24px",
  maxWidth: "400px",
  margin: "0 auto",
  boxSizing: "border-box"
}}>
  <h2 style={{
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px"
  }}>
    Forgot Password
  </h2>

  <form onSubmit={handleSubmit}>
    <input
      type="email"
      required
      placeholder="Enter your email"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box"
      }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <button
      type="submit"
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Send Reset Link
    </button>
  </form>

  {message && (
    <p style={{
      marginTop: "16px",
      fontSize: "14px",
      color: "#333"
    }}>
      {message}
    </p>
  )}
</div>

  );
};

export default ForgotPassword;
