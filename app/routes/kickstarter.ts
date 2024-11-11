import { redirect } from "@remix-run/server-runtime";

export function loader() {
	return redirect("https://kickstarter.com/projects/milktype/sprout-75-the-bubble-tea-mechanical-keyboard", 301);
}
