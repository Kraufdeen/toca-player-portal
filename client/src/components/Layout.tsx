import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

type Props = {
  email: string;
  onLogout: () => void;
};

export default function Layout({ email, onLogout }: Props) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#0f172a" }}>
      <div
        style={{
          backgroundColor: "#0b1f4d",
          color: "#ffffff",
          padding: "1rem 1.5rem",
        }}
      >
        <Header onLogout={onLogout} />
        <div style={{ marginTop: "0.75rem", opacity: 0.9, fontSize: 12 }}>
          Signed in as {email}
        </div>
        <Nav />
      </div>
      <main style={{ padding: "1.5rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
