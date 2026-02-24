import { Outlet } from "react-router-dom";
import Header from "./Header";

type Props = {
  onLogout: () => void;
};

export default function Layout({ onLogout }: Props) {
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
      </div>
      <main style={{ padding: "1.5rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
