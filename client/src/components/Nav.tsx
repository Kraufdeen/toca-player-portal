import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? 700 : 400,
});

export default function Nav() {
  return (
    <nav style={{ marginTop: "1rem" }}>
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
