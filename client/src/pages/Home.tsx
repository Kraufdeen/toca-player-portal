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

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/training-sessions?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      setSessions(data.trainingSessions ?? []);
      setLoading(false);
    }

    load();
  }, [email]);

  if (loading) return <div>Loading sessions...</div>;

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
