import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";


function App() {
  const [email, setEmail] = useState<string | null>(null);

  // If no email → show sign in
  if (!email) {
  return <SignIn onSubmitEmail={setEmail} />;
}


  // If email exists → show app
  return (
    <>
      <h2>Logged in as {email}</h2>

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/sessions/:id" element={<div>Session Details</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
