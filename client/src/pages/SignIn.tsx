import { useState } from "react";

type Props = {
  onSubmitEmail: (email: string) => void;
};

export default function SignIn({ onSubmitEmail }: Props) {
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>TOCA Player Portal</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = value.trim();
          if (!email) return;
          onSubmitEmail(email);
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ padding: 8, width: 260 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: 8 }}>
          Continue
        </button>
      </form>
    </div>
  );
}
