import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Session = {
  id: string;
  trainerName: string;
  startTime: string;
  endTime: string;
};

export default function Home({ email }: { email: string }) {
  const [pastSessions, setPastSessions] = useState<Session[]>([]);
  const [futureAppointments, setFutureAppointments] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/home?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed (${res.status})`);
        }

        const data = await res.json();
        setPastSessions(data.pastTrainingSessions ?? []);
        setFutureAppointments(data.futureAppointments ?? []);
      } catch (e) {
        setPastSessions([]);
        setFutureAppointments([]);
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [email]);

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div style={{ color: "crimson" }}>Error: {error}</div>;

  return (
    <div>
      <h1>Home</h1>
      <div style={{ marginTop: -6, marginBottom: 14, fontSize: 12, opacity: 0.75 }}>
        Signed in as {email}
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: 460,
            backgroundColor: "#ffffff",
            border: "1px solid #dbeafe",
            borderRadius: 12,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
            padding: "1.1rem 1rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Upcoming Appointments</h2>
          {futureAppointments.length === 0 && <div>No upcoming appointments.</div>}
          {futureAppointments.map((s) => (
            <div key={s.id} style={{ marginBottom: 8 }}>
              {new Date(s.startTime).toLocaleString()} with {s.trainerName}
            </div>
          ))}
        </section>

        <section
          style={{
            width: "100%",
            maxWidth: 460,
            backgroundColor: "#ffffff",
            border: "1px solid #dbeafe",
            borderRadius: 12,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
            padding: "1.1rem 1rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Past Training Sessions</h2>
          {pastSessions.length === 0 && <div>No past sessions.</div>}
          {pastSessions.map((s) => (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <Link to={`/sessions/${s.id}`}>
                {new Date(s.startTime).toLocaleString()} with {s.trainerName}
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
