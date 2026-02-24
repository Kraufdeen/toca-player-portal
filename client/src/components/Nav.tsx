import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  marginRight: 20,
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
  color: "#ffffff",
  opacity: isActive ? 1 : 0.9,
  backgroundColor: isActive ? "#1e3a8a" : "transparent",
  padding: "0.35rem 0.6rem",
  borderRadius: 6,
});

export default function Nav() {
  return (
    <nav
      style={{
        marginTop: "1rem",
        backgroundColor: "#0b1f4d",
        padding: "0.4rem 0.5rem",
        borderRadius: 8,
      }}
    >
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        About TOCA
      </NavLink>
      <NavLink to="/profile" style={linkStyle}>
        Profile
      </NavLink>
    </nav>
  );
}
