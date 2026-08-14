import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Here is the handleSubmit function that will be called when the form is submitted. It will send a POST request to the login endpoint with the email and password entered by the user.
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
  alert("Email and Password are required.");
  return;
}

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/Auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);
  } catch (error) {
    console.error("Login error:", error);
  }
};


  // The return statement renders the login form with input fields for email and password, and a submit button. When the form is submitted, it calls the handleSubmit function to process the login request.
  return (
    <div>
      <h1>Mini Employee Management System</h1>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default App;