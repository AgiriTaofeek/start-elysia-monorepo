import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const [health, setHealth] = useState<string>("checking...");

	useEffect(() => {
		api.health
			.get()
			.then(({ data }) => {
				setHealth(data ? `API online — ${data.timestamp}` : "no response");
			})
			.catch(() => setHealth("API offline"));
	}, []);

	return (
		<div className="flex min-h-svh p-6">
			<div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
				<div>
					<h1 className="font-medium">Project ready!</h1>
					<p>You may now add components and start building.</p>
					<p className="text-muted-foreground">
						API status: <span className="font-mono">{health}</span>
					</p>
					<Button className="mt-2">Button</Button>
				</div>
			</div>
		</div>
	);
}
