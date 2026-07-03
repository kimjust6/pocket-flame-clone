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
const wslCwd = toWslPath(workspaceRoot);
const deployCmd = `cd ${shellQuoteSingle(wslCwd)} && npx -y -p node@24 -p phio phio deploy blinks 2>&1`;

const result = spawnSync("wsl", ["bash", "-lc", deployCmd], {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "pipe"],
});

const stdout = result.stdout || "";
const stderr = result.stderr || "";
if (stdout) process.stdout.write(stdout);
if (stderr) process.stderr.write(stderr);

if (typeof result.status !== "number") {
    throw result.error || new Error("WSL deploy did not return an exit status");
}

const combined = `${stdout}\n${stderr}`;
const deployDone = combined.includes("Deploy done!");
const hasErrorBanner = combined.includes("an error occurred");

if (result.status !== 0 && deployDone && !hasErrorBanner) {
    process.exit(0);
}

process.exit(result.status);
