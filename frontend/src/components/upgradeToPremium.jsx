import { useState } from "react";
import "../styles/premium.css"
const UpgradeToPremium = () => {
  const [loading, setLoading] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/payment/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token-based auth
        },
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert("Failed to start payment");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong");
    }
    setLoading(false);
  };
  
  if (isPremium) {
    return (
      <div className="premium-container">
        <h2>Thank you for upgrading to Premium!</h2>
        <p>You now have access to exclusive recipes and features.</p>
      </div>
    );
  }

  return (
    <div className="premium-container">
      <h2>Upgrade to Premium</h2>
      <p>Get access to exclusive recipes and features!</p>
      <button onClick={handleUpgrade} disabled={loading}>
        {loading ? "Processing..." : "Upgrade Now"}
      </button>
    </div>
  );
};

export default UpgradeToPremium;
