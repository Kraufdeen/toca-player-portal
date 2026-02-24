type Props = { onLogout: () => void };

export default function Header({ onLogout }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0.3 }}>TOCA Player Portal</div>
      <button
        onClick={onLogout}
        style={{
          backgroundColor: "#ffffff",
          color: "#0b1f4d",
          border: "1px solid #dbeafe",
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </div>
  );
}
