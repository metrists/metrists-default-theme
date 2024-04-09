const requiredServerEnvs = ["NODE_ENV"] as const;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv
      extends Record<(typeof requiredServerEnvs)[number], string> {}
  }
}

const clientEnvs = ["NODE_ENV"] as const;

export function getClientEnvironments() {
  const env: Record<string, string> = {};
  for (const key of clientEnvs) {
    env[key] = process.env[key]!;
  }
  return env;
}
