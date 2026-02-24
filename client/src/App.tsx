import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SessionDetails from "./pages/SessionDetails";




function App() {
  const [email, setEmail] = useState<string | null>(null);

  async function handleSignIn(emailInput: string): Promise<string | null> {
    const normalizedEmail = emailInput.trim().toLowerCase();

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return body.error ?? "Invalid email";
      }

      setEmail(normalizedEmail);
      return null;
    } catch {
      return "Unable to reach server";
    }
  }

  // If no email - show sign in
  if (!email) {
  return <SignIn onSubmitEmail={handleSignIn} />;
}


  // If email exists - show app
  return (
  <Routes>
    <Route
      element={
        <Layout
          onLogout={() => setEmail(null)}
        />
      }
    >
      <Route path="/" element={<Home email={email} />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile email={email} />} />
      <Route path="/sessions/:id" element={<SessionDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

}

export default App;
