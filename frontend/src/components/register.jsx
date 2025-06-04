import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div>
    //   <h1>REGISTER</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
    //     <input type="email" name="email" placeholder="Enter valid email" value={formData.email} onChange={handleChange} required />
    //     <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
    //     <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
    //     <button type="submit" disabled={loading}>{loading ? "Registering..." : "REGISTER"}</button>
    //   </form>
    //   <h5>Already have an account? <Link to="/">LOGIN</Link></h5>
    // </div>

    <div
  style={{
    maxWidth: '450px',
    margin: '80px auto',
    padding: '30px 40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
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
  <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '28px', color: '#333' }}>
    REGISTER
  </h1>
</div>
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      value={formData.name}
      onChange={handleChange}
      required
      style={{
        padding: '12px 14px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px',
      }}
    />
    <input
      type="email"
      name="email"
      placeholder="Enter valid email"
      value={formData.email}
      onChange={handleChange}
      required
      style={{
        padding: '12px 14px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px',
      }}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
      style={{
        padding: '12px 14px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px',
      }}
    />
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
      style={{
        padding: '12px 14px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px',
      }}
    />
    <button
      type="submit"
      disabled={loading}
      style={{
        padding: '12px',
        backgroundColor: loading ? '#aaa' : '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => {
        if (!loading) e.target.style.backgroundColor = '#218838';
      }}
      onMouseOut={(e) => {
        if (!loading) e.target.style.backgroundColor = '#28a745';
      }}
    >
      {loading ? 'Registering...' : 'REGISTER'}
    </button>
  </form>

  <h5 style={{ textAlign: 'center', marginTop: '14px', fontSize: '14px', color: '#555' }}>
    Already have an account?{' '}
    <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
      LOGIN
    </Link>
  </h5>
</div>

  );
}
