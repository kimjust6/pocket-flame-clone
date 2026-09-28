import { spawnSync } from "node:child_process";

function toWslPath(winPath) {
    const normalized = winPath.replace(/\\/g, "/");
    const match = normalized.match(/^([A-Za-z]):\/(.*)$/);
    if (!match) {
        throw new Error(`Unable to convert path to WSL format: ${winPath}`);
    }
    const drive = match[1].toLowerCase();
    const rest = match[2];
    return `/mnt/${drive}/${rest}`;
}

function shellQuoteSingle(value) {
    return `'${value.replace(/'/g, `"'"'`)}'`;
}

const workspaceRoot = process.cwd();
const isWindows = process.platform === "win32";

const targetCwd = isWindows ? toWslPath(workspaceRoot) : workspaceRoot;
const deployCmd = `cd ${shellQuoteSingle(targetCwd)} && npx -y -p node@24 -p phio phio deploy blinks 2>&1`;

const command = isWindows ? "wsl" : "bash";
const args = isWindows ? ["bash", "-lc", deployCmd] : ["-lc", deployCmd];

const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "pipe"],
});

const stdout = result.stdout || "";
const stderr = result.stderr || "";
if (stdout) process.stdout.write(stdout);
if (stderr) process.stderr.write(stderr);

if (typeof result.status !== "number") {
    throw result.error || new Error(`${isWindows ? "WSL" : "Linux"} deploy did not return an exit status`);
}

const combined = `${stdout}\n${stderr}`;
const deployDone = combined.includes("Deploy done!");
const hasErrorBanner = combined.includes("an error occurred");

if (result.status !== 0 && deployDone && !hasErrorBanner) {
    process.exit(0);
}

process.exit(result.status);
