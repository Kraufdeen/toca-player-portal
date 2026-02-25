import { exec } from "child_process";

const PORT = process.env.PORT ?? "3000";

function run(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({
        code: error?.code ?? 0,
        stdout: stdout ?? "",
        stderr: stderr ?? "",
      });
    });
  });
}

async function stopWindows(port) {
  const list = await run(`netstat -ano | findstr :${port}`);
  const pids = new Set();

  for (const line of list.stdout.split(/\r?\n/)) {
    if (!line.trim() || !line.includes("LISTENING")) {
      continue;
    }
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid)) {
      pids.add(pid);
    }
  }

  if (pids.size === 0) {
    console.log(`No process is listening on port ${port}.`);
    return;
  }

  for (const pid of pids) {
    const kill = await run(`taskkill /PID ${pid} /F`);
    if (kill.code === 0) {
      console.log(`Stopped PID ${pid} on port ${port}.`);
    } else {
      console.log(`Failed to stop PID ${pid}: ${kill.stderr.trim() || kill.stdout.trim()}`);
    }
  }
}

async function stopUnix(port) {
  const list = await run(`lsof -ti :${port}`);
  const pids = [...new Set(list.stdout.split(/\r?\n/).map((v) => v.trim()).filter(Boolean))];

  if (pids.length === 0) {
    console.log(`No process is listening on port ${port}.`);
    return;
  }

  for (const pid of pids) {
    const kill = await run(`kill -9 ${pid}`);
    if (kill.code === 0) {
      console.log(`Stopped PID ${pid} on port ${port}.`);
    } else {
      console.log(`Failed to stop PID ${pid}: ${kill.stderr.trim() || kill.stdout.trim()}`);
    }
  }
}

if (process.platform === "win32") {
  await stopWindows(PORT);
} else {
  await stopUnix(PORT);
}
