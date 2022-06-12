const envVars = ['ENVIRONMENT'] as const;
export type EnvVar = typeof envVars[number];
export type EnvVars = { [key in EnvVar]: string };

export type Secret = '';
export type Secrets = { [key in Secret]: string };

export const getEnvVars = (secrets: Secret[]) => {
	const env = [...envVars, ...secrets].reduce((acc, cur) => {
		acc[cur] = getEnvVar(cur);
		return acc;
	}, {} as EnvVars & Secrets);

	return env;
};

export const getEnvVar = (name: EnvVar | Secret): string => {
	const ret = process.env[name];

	if (!ret) throw `Environment variable "${name}" not found`;

	return ret;
};
