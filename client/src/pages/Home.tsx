import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Session = {
  id: string;
  trainerName: string;
  startTime: string;
  endTime: string;
};

export default function Home({ email }: { email: string }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/training-sessions?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed (${res.status})`);
        }

        const data = await res.json();
        setSessions(data.trainingSessions ?? []);
      } catch (e) {
        setSessions([]);
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [email]);

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div style={{ color: "crimson" }}>Error: {error}</div>;

  const now = new Date();

  const past = sessions.filter(
    (s) => new Date(s.endTime) < now
  );

  const future = sessions.filter(
    (s) => new Date(s.startTime) >= now
  );

  return (
    <div>
      <h1>Home</h1>

      <h2>Upcoming Appointments</h2>
      {future.length === 0 && <div>No upcoming sessions.</div>}
      {future.map((s) => (
        <div key={s.id}>
          {new Date(s.startTime).toLocaleString()} with {s.trainerName}
        </div>
      ))}

      <h2 style={{ marginTop: 24 }}>Past Training Sessions</h2>
      {past.length === 0 && <div>No past sessions.</div>}
      {past.map((s) => (
        <div key={s.id}>
          <Link to={`/sessions/${s.id}`}>
            {new Date(s.startTime).toLocaleString()} with {s.trainerName}
          </Link>
        </div>
      ))}
    </div>
  );
}
