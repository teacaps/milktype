import { redirect } from "@remix-run/server-runtime";

export function loader() {
	return redirect("https://discord.gg/DbVEDaFqTd", 301);
}
