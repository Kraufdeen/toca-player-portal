import { useState } from "react";

type Props = {
  onSubmitEmail: (email: string) => Promise<string | null>;
};

export default function SignIn({ onSubmitEmail }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          minHeight: 440,
          backgroundColor: "#0b1f4d",
          color: "#ffffff",
          borderRadius: 12,
          padding: "1.5rem 1.5rem 1.75rem",
          boxShadow: "0 12px 28px rgba(2, 6, 23, 0.22)",
          transform: "translateY(2vh)",
        }}
      >
        <img
          src="/images/toca-soccer-logo.png"
          alt="TOCA Soccer"
          style={{
            display: "block",
            width: "100%",
            maxWidth: 300,
            height: "auto",
            margin: "0 auto -34px",
          }}
        />
        <p
          style={{
            marginTop: 0,
            marginBottom: 18,
            textAlign: "center",
            opacity: 0.95,
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.2,
            width: "100%",
          }}
        >
          Player Portal Sign In
        </p>

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
            placeholder="Email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              padding: "0.75rem 0.8rem",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              fontSize: 16,
            }}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            style={{
              marginTop: 12,
              width: "100%",
              padding: "0.7rem",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0b1f4d",
              fontWeight: 700,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking..." : "Continue"}
          </button>
        </form>
        {error && (
          <div style={{ color: "#fecaca", marginTop: 10, textAlign: "center" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
