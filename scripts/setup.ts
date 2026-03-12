import { randomBytes } from "node:crypto";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const ENV_CONFIGS = [
	{
		path: join(ROOT, "apps/api/.env"),
		example: join(ROOT, "apps/api/.env.example"),
		generateSecrets: true,
	},
	{
		path: join(ROOT, "apps/web/.env"),
		example: join(ROOT, "apps/web/.env.example"),
	},
	{
		path: join(ROOT, "packages/database/.env"),
		example: join(ROOT, "packages/database/.env.example"),
	},
];

function generateSecret() {
	return randomBytes(32).toString("hex");
}

async function setup() {
	console.log("🚀 Starting monorepo setup...");

	for (const config of ENV_CONFIGS) {
		const filename = config.path.split("/").slice(-2).join("/");

		if (!existsSync(config.example)) {
			console.warn(`⚠️ Example file missing for ${filename}`);
			continue;
		}

		if (existsSync(config.path)) {
			console.log(`✅ ${filename} already exists.`);
		} else {
			console.log(`📝 Creating ${filename}...`);
			copyFileSync(config.example, config.path);
		}

		if (config.generateSecrets) {
			let content = readFileSync(config.path, "utf-8");
			if (content.includes("change-me-to-a-random-secret")) {
				console.log(`🔑 Generating secure secret for ${filename}...`);
				const secret = generateSecret();
				content = content.replace("change-me-to-a-random-secret", secret);
				writeFileSync(config.path, content);
			}
		}
	}

	console.log(
		"\n✨ Setup complete! You can now run 'bun db:up' and 'bun dev'.",
	);
}

setup().catch((err) => {
	console.error("❌ Setup failed:", err);
	process.exit(1);
});
