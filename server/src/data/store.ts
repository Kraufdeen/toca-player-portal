import fs from "fs";
import path from "path";

/**
 * Types match the sample JSON exactly (based on your zip).
 * Keep them here for now to avoid extra files while you're moving fast.
 */

export type Profile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string; // ISO string
  centerName: string;
  createdAt: string; // ISO string
};

export type Appointment = {
  id: string;
  playerId: string;
  trainerName: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
};

export type TrainingSession = {
  id: string;
  playerId: string;
  trainerName: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string

  numberOfBalls: number;
  bestStreak: number;
  numberOfGoals: number;
  score: number;
  avgSpeedOfPlay: number;
  numberOfExercises: number;
};

export type HomeData = {
  pastTrainingSessions: TrainingSession[];
  futureAppointments: Appointment[];
};

// ---- internal cache ----

type StoreCache = {
  profiles: Profile[];
  appointments: Appointment[];
  trainingSessions: TrainingSession[];
};

let cache: StoreCache | null = null;

function dataPath(fileName: string): string {
  return path.join(__dirname, "../../data", fileName);
}


function readJsonFile<T>(fileName: string): T {
  const fullPath = dataPath(fileName);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

export function loadStore(forceReload = false): void {
  if (cache && !forceReload) return;

  cache = {
    profiles: readJsonFile<Profile[]>("profiles.json"),
    appointments: readJsonFile<Appointment[]>("appointments.json"),
    trainingSessions: readJsonFile<TrainingSession[]>("trainingSessions.json"),
  };
}

function ensureLoaded(): StoreCache {
  if (!cache) loadStore(false);
  // cache is guaranteed now
  return cache!;
}

// ---- query helpers ----

export function getProfiles(): Profile[] {
  return ensureLoaded().profiles;
}

export function getAppointments(): Appointment[] {
  return ensureLoaded().appointments;
}

export function getTrainingSessions(): TrainingSession[] {
  return ensureLoaded().trainingSessions;
}

export function findProfileByEmail(email: string): Profile | undefined {
  const normalized = email.trim().toLowerCase();
  return ensureLoaded().profiles.find(
    (p) => p.email.trim().toLowerCase() === normalized
  );
}

export function getProfileById(playerId: string): Profile | undefined {
  return ensureLoaded().profiles.find((p) => p.id === playerId);
}

export function getAppointmentsByPlayerId(playerId: string): Appointment[] {
  return ensureLoaded().appointments.filter((a) => a.playerId === playerId);
}

export function getTrainingSessionsByPlayerId(playerId: string): TrainingSession[] {
  return ensureLoaded().trainingSessions.filter((s) => s.playerId === playerId);
}

export function getTrainingSessionById(sessionId: string): TrainingSession | undefined {
  return ensureLoaded().trainingSessions.find((s) => s.id === sessionId);
}

/**
 * Home screen needs:
 * - past training sessions (endTime < now), sorted most recent first
 * - future appointments (startTime > now), sorted soonest first
 */
export function getHomeData(playerId: string, now: Date = new Date()): HomeData {
  const nowMs = now.getTime();

  const pastTrainingSessions = getTrainingSessionsByPlayerId(playerId)
    .filter((s) => new Date(s.endTime).getTime() < nowMs)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const futureAppointments = getAppointmentsByPlayerId(playerId)
    .filter((a) => new Date(a.startTime).getTime() > nowMs)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return { pastTrainingSessions, futureAppointments };
}
