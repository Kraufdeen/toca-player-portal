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
      <div style={{ fontWeight: 700, fontSize: 20 }}>TOCA</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
