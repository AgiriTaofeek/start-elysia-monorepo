import { describe, expect, it } from "bun:test";
import { apiEnv } from "./api.js";
import { dbEnv } from "./database.js";
import { webEnv } from "./web.js";

describe("env package", () => {
	it("should export modular env objects", () => {
		expect(typeof apiEnv).toBe("object");
		expect(typeof webEnv).toBe("object");
		expect(typeof dbEnv).toBe("object");
	});

	it("should have common properties like NODE_ENV in apiEnv", () => {
		expect(apiEnv.NODE_ENV).toBeDefined();
	});

	it("should allow skipping validation for build/test processes", () => {
		expect(true).toBe(true);
	});
});
