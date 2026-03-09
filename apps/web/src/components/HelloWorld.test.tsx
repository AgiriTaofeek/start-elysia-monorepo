import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelloWorld } from "./HelloWorld";

describe("HelloWorld Component", () => {
	it("renders the heading and text correctly", () => {
		render(<HelloWorld />);

		const heading = screen.getByRole("heading", { name: /Hello World/i });
		expect(heading).toBeInTheDocument();

		const text = screen.getByText(/Frontend unit testing is working!/i);
		expect(text).toBeInTheDocument();
	});
});
