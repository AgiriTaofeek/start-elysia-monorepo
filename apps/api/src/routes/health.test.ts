import { describe, expect, it } from "bun:test";
import { healthRoutes } from "./health";

describe("GET /health", () => {
	it("returns status ok", async () => {
		const response = await healthRoutes
			.handle(new Request("http://localhost/health"))
			.then((r) => r.json());

		expect(response.status).toBe("ok");
		expect(typeof response.timestamp).toBe("string");
	});
});
