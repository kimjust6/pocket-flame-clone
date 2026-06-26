import 'dotenv/config'

import { spawnSync } from 'node:child_process'

const required = ['PB_TYPEGEN_URL', 'PB_TYPEGEN_EMAIL', 'PB_TYPEGEN_PASSWORD']
const missing = required.filter((key) => !process.env[key])

if (missing.length) {
    console.error(`Missing required env vars: ${missing.join(', ')}`)
    console.error('Create a .env file in the repo root (or set them in your shell) and try again.')
    process.exit(1)
}

const outFile = 'pb_hooks/lib/pocketbase-types.ts'
const result = spawnSync(
    'npx',
    [
        'pocketbase-typegen',
        '-o', outFile,
        '-u', process.env.PB_TYPEGEN_URL,
        '--email', `"${process.env.PB_TYPEGEN_EMAIL}"`,
        '-p', `"${process.env.PB_TYPEGEN_PASSWORD}"`
    ],
    {
        stdio: 'inherit',
        shell: true,
        env: process.env,
    },
)

process.exit(result.status ?? 1)
