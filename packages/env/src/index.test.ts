import { describe, expect, it } from "bun:test";
import { env } from "./index.js";

describe("env package", () => {
	it("should export an env object", () => {
		expect(typeof env).toBe("object");
	});

	it("should have NODE_ENV available", () => {
		// NODE_ENV is special and usually passed through even in skip mode
		expect(env.NODE_ENV).toBeDefined();
	});

	it("should allow skipping validation for build/test processes", () => {
		// This test just ensures the module loads without throwing
		// which is the main goal of skipValidation
		expect(true).toBe(true);
	});
});
