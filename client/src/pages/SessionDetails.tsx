import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type TrainingSession = {
  id: string;
  playerId: string;
  trainerName: string;
  startTime: string;
  endTime: string;
  numberOfBalls: number;
  bestStreak: number;
  numberOfGoals: number;
  score: number;
  avgSpeedOfPlay: number;
  numberOfExercises: number;
};

export default function SessionDetails() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/training-sessions/${encodeURIComponent(id!)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed (${res.status})`);
        }
        const data = await res.json();

        // Expecting backend to return { trainingSession: {...} }
        const s = data.trainingSession ?? data.session ?? data;
        if (!cancelled) setSession(s ?? null);
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
  }, [id]);

  if (loading) return <div>Loading session...</div>;
  if (error) return <div style={{ color: "crimson" }}>Error: {error}</div>;
  if (!session) return <div>Session not found.</div>;

  const start = new Date(session.startTime).toLocaleString();
  const end = new Date(session.endTime).toLocaleString();

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/">Back to Home</Link>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
      <section
        style={{
          width: "100%",
          maxWidth: 700,
          backgroundColor: "#ffffff",
          border: "1px solid #dbeafe",
          borderRadius: 12,
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
          padding: "1.2rem 1.1rem",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Session Details</h1>

        <div style={{ marginTop: 16, lineHeight: 1.9 }}>
          <div><strong>Trainer:</strong> {session.trainerName}</div>
          <div><strong>Start:</strong> {start}</div>
          <div><strong>End:</strong> {end}</div>
        </div>

        <h2 style={{ marginTop: 20 }}>Performance</h2>
        <div style={{ marginTop: 8, lineHeight: 1.9 }}>
          <div><strong>Score:</strong> {session.score}</div>
          <div><strong>Goals:</strong> {session.numberOfGoals}</div>
          <div><strong>Balls Played:</strong> {session.numberOfBalls}</div>
          <div><strong>Best Streak:</strong> {session.bestStreak}</div>
          <div><strong>Avg Speed of Play:</strong> {session.avgSpeedOfPlay}</div>
          <div><strong>Exercises:</strong> {session.numberOfExercises}</div>
        </div>
      </section>
      </div>
    </div>
  );
}
