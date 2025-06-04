import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PremiumSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const user_id = searchParams.get("user_id");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payment/confirm?session_id=${session_id}&user_id=${user_id}`,
          { method: "GET" }
        );

        const data = await response.json();
        if (data.message === "Premium activated successfully") {
          alert("You are now a premium member!");
          localStorage.setItem("isPremium", "true"); // Store premium status
        } else {
          alert("Payment verification failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error confirming payment.");
      }
    };

    if (session_id && user_id) {
      confirmPayment();
    }
  }, [session_id, user_id]);

  return (
   <div
  style={{
    maxWidth: "400px",
    margin: "60px auto",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f0fdf4", // light green background
    textAlign: "center",
  }}
>
  <h2
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      color: "#16a34a", // green text
      marginBottom: "12px",
    }}
  >
    Payment Successful!
  </h2>
  <p
    style={{
      fontSize: "16px",
      color: "#333",
    }}
  >
    Enjoy your premium features 🎉
  </p>
</div>

  );
};

export default PremiumSuccess;
