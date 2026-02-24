import { useState } from "react";

type Props = {
  onSubmitEmail: (email: string) => Promise<string | null>;
};

export default function SignIn({ onSubmitEmail }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>TOCA Player Portal</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const email = value.trim();
          if (!email) {
            setError("Email is required");
            return;
          }

          setIsSubmitting(true);
          setError(null);
          const submitError = await onSubmitEmail(email);
          setIsSubmitting(false);
          if (submitError) {
            setError(submitError);
          }
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ padding: 8, width: 260 }}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          style={{ marginLeft: 8, padding: 8 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Checking..." : "Continue"}
        </button>
      </form>
      {error && <div style={{ color: "crimson", marginTop: 12 }}>{error}</div>}
    </div>
  );
}
