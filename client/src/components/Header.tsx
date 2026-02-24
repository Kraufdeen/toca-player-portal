import Nav from "./Nav";

type Props = { onLogout: () => void };

export default function Header({ onLogout }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      <img
        src="/images/toca-soccer-logo.png"
        alt="TOCA Soccer"
        style={{
          width: 128,
          height: 128,
          objectFit: "contain",
          marginTop: 2,
        }}
      />

      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0.3 }}>TOCA Player Portal</div>
        <Nav />
      </div>

      <button
        onClick={onLogout}
        style={{
          backgroundColor: "#ffffff",
          color: "#0b1f4d",
          border: "1px solid #dbeafe",
          fontWeight: 600,
          alignSelf: "start",
        }}
      >
        Logout
      </button>
    </div>
  );
}
