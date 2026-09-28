import { spawnSync } from "node:child_process";

function shellQuoteSingle(value) {
    return `'${value.replace(/'/g, `"'"'`)}'`;
}

const workspaceRoot = process.cwd();
const deployCmd = `cd ${shellQuoteSingle(workspaceRoot)} && npx -y -p node@24 -p phio phio deploy blinks 2>&1`;

const result = spawnSync("bash", ["-lc", deployCmd], {
    encoding: "utf8",
    stdio: ["inherit", "pipe", "pipe"],
});

const stdout = result.stdout || "";
const stderr = result.stderr || "";
if (stdout) process.stdout.write(stdout);
if (stderr) process.stderr.write(stderr);

if (typeof result.status !== "number") {
    throw result.error || new Error("Linux deploy did not return an exit status");
}

const combined = `${stdout}\n${stderr}`;
const deployDone = combined.includes("Deploy done!");
const hasErrorBanner = combined.includes("an error occurred");

if (result.status !== 0 && deployDone && !hasErrorBanner) {
    process.exit(0);
}

process.exit(result.status);
