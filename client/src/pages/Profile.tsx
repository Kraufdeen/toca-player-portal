import { useEffect, useState } from "react";

type Profile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  centerName: string;
  createdAt: string;
};

export default function ProfilePage({ email }: { email: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed (${res.status})`);
        }

        const data = await res.json();
        if (!cancelled) setProfile(data.profile);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [email]);

  if (loading) return <div>Loading profile…</div>;
  if (error) return <div style={{ color: "crimson" }}>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <section
        style={{
          width: "100%",
          maxWidth: 640,
          backgroundColor: "#ffffff",
          border: "1px solid #dbeafe",
          borderRadius: 12,
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
          padding: "1.2rem 1.1rem",
        }}
      >
        <h1 style={{ marginTop: 0 }}>
          {profile.firstName} {profile.lastName}
        </h1>

        <div style={{ marginTop: 12, lineHeight: 1.8 }}>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Phone:</strong> {profile.phone}</div>
          <div><strong>Gender:</strong> {profile.gender}</div>
          <div><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</div>
          <div><strong>Center:</strong> {profile.centerName}</div>
          <div><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
        </div>
      </section>
    </div>
  );
}
