import "dotenv/config";
import { prisma } from "./client.js";

// Seed example for development data.
// NOTE: To create auth users, use Better Auth's signUp API instead.
// These are "raw" database records — no password or auth account is created.
// Add your seed data below as needed.

async function main() {
	console.log("🌱 Seeding database...");

	// Example: Uncomment and modify to seed your own data
	// await prisma.user.upsert({
	//   where: { email: "admin@example.com" },
	//   update: {},
	//   create: { email: "admin@example.com", name: "Admin" },
	// });

	console.log("✅ Seed complete.");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
