import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";




function App() {
  const [email, setEmail] = useState<string | null>(null);

  // If no email → show sign in
  if (!email) {
  return <SignIn onSubmitEmail={setEmail} />;
}


  // If email exists → show app
  return (
  <Routes>
    <Route
      element={
        <Layout
          email={email}
          onLogout={() => setEmail(null)}
        />
      }
    >
      <Route path="/" element={<Home email={email} />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile email={email} />} />
      <Route path="/sessions/:id" element={<div>Session Details</div>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

}

export default App;
