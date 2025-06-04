import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login Response Data:", data);

        if (data.isAdmin) {
          alert("Admin login")
          navigate("/admin");
          console.log("Login Response Data:", data);

        } else {
          alert("Login Successfull!");
          navigate("/home");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  // const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // console.log(loggedInUser.isPremium); // should show true/false based on backend data

  return (

    //     <div
    //   style={{
    //     maxWidth: '400px',
    //     margin: '80px auto',
    //     padding: '30px 40px',
    //     backgroundColor: '#ffffff',
    //     borderRadius: '12px',
    //     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    //     fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    //   }}
    // >
    //   <div>
    //     <img src="https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg" alt="" />
    //   </div>
    //    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

    //   <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '28px', color: '#333' }}>
    //     LOGIN
    //   </h1>
    //   </div>
    //   <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Enter your email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //       style={{
    //         padding: '12px 14px',
    //         border: '1px solid #ccc',
    //         borderRadius: '6px',
    //         fontSize: '15px',
    //       }}
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Enter your password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //       style={{
    //         padding: '12px 14px',
    //         border: '1px solid #ccc',
    //         borderRadius: '6px',
    //         fontSize: '15px',
    //       }}
    //     />
    //     <button
    //       type="submit"
    //       style={{
    //         padding: '12px',
    //         backgroundColor: '#007bff',
    //         color: 'white',
    //         border: 'none',
    //         borderRadius: '6px',
    //         fontSize: '16px',
    //         cursor: 'pointer',
    //       }}
    //       onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
    //       onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
    //     >
    //       LOGIN
    //     </button>
    //   </form>

    //   <h5 style={{ textAlign: 'center', marginTop: '14px', fontSize: '14px', color: '#555' }}>
    //     <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
    //       Forgot Password ?
    //     </Link>
    //   </h5>

    //   <h5 style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' }}>
    //     Don’t have an account?{' '}
    //     <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
    //       Register
    //     </Link>
    //   </h5>
    // </div>


    // <div>
    //   <img
    //     src="https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg"
    //     alt="header"
    //     style={{
    //       width: '100vw',
    //       height: '180vh',
    //       objectFit: 'cover',
    //       borderRadius: '8px',
    //       marginBottom: '20px',
    //     }}
    //   />

    //   <div
    //     style={{
    //       maxWidth: '400px',
    //       margin: '80px auto',
    //       padding: '30px 40px',
    //       backgroundColor: '#ffffff',
    //       borderRadius: '12px',
    //       boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    //       fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    //     }}
    //   >
    //     {/* Header Image */}


    //     {/* Logos and Title */}
    //     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '10px', marginTop: "-887px" }}>
    //       <img
    //         src="https://img.freepik.com/premium-vector/fresh-recipe-logo-book-logo_614438-458.jpg"
    //         alt="logo"
    //         style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
    //       />
    //       <img
    //         src="https://www.brandbucket.com/sites/default/files/logo_uploads/539539/large_recipeease.png"
    //         alt="heading"
    //         style={{ height: '40px', objectFit: 'contain' }}
    //       />
    //     </div>

    //     <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '28px', color: 'white' }}>
    //       LOGIN
    //     </h1>

    //     {/* Form */}
    //     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Enter your email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //         style={{
    //           padding: '12px 14px',
    //           border: '1px solid #ccc',
    //           borderRadius: '6px',
    //           fontSize: '15px',
    //         }}
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Enter your password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //         style={{
    //           padding: '12px 14px',
    //           border: '1px solid #ccc',
    //           borderRadius: '6px',
    //           fontSize: '15px',
    //         }}
    //       />
    //       <button
    //         type="submit"
    //         style={{
    //           padding: '12px',
    //           backgroundColor: '#007bff',
    //           color: 'white',
    //           border: 'none',
    //           borderRadius: '6px',
    //           fontSize: '16px',
    //           cursor: 'pointer',
    //           transition: 'background-color 0.3s',
    //         }}
    //         onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
    //         onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
    //       >
    //         LOGIN
    //       </button>
    //     </form>

    //     {/* Links */}
    //     <h5 style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'white' }}>
    //       <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
    //         Forgot Password?
    //       </Link>
    //     </h5>

    //     <h5 style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: 'white' }}>
    //       Don’t have an account?{' '}
    //       <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
    //         Register
    //       </Link>
    //     </h5>
    //   </div>
    // </div>


    <div>
  <img
    src="https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg"
    alt="header"
    style={{
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '20px',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
      filter: 'brightness(0.6)',
    }}
  />

  <div
    style={{
      maxWidth: '400px',
      position: 'relative',
      zIndex: 1,
      margin: '80px auto',
      padding: '30px 40px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}
  >
    {/* Logos and Title */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '10px',
        marginTop: '-28px',
      }}
    >
      <img
        src="https://img.freepik.com/premium-vector/fresh-recipe-logo-book-logo_614438-458.jpg"
        alt="logo"
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <img
        src="https://www.brandbucket.com/sites/default/files/logo_uploads/539539/large_recipeease.png"
        alt="heading"
        style={{
          height: '40px',
          objectFit: 'contain',
        }}
      />
    </div>

    <h1
      style={{
        textAlign: 'center',
        marginBottom: '24px',
        fontSize: '28px',
        color: '#333',
      }}
    >
      LOGIN
    </h1>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
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
        placeholder="Enter your password"
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
      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        LOGIN
      </button>
    </form>

    {/* Links */}
    <h5
      style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '14px',
        color: '#333',
      }}
    >
      <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
        Forgot Password?
      </Link>
    </h5>

    <h5
      style={{
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '14px',
        color: '#333',
      }}
    >
      Don’t have an account?{' '}
      <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
        Register
      </Link>
    </h5>
  </div>
</div>

  );
}
