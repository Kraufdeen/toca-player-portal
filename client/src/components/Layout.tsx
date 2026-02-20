import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

type Props = {
  email: string;
  onLogout: () => void;
};

export default function Layout({ email, onLogout }: Props) {
  return (
    <div style={{ padding: "1.5rem" }}>
      <Header onLogout={onLogout} />
      <Nav />
      <div style={{ marginTop: "0.75rem", opacity: 0.8, fontSize: 12 }}>
        Signed in as {email}
      </div>
      <main style={{ marginTop: "1.5rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
