export type Color =
	| "accent"
	| "yogurt"
	| `yogurt-${number}`
	| "cocoa"
	| `cocoa-${number}`
	| "shrub"
	| "blurple"
	| "lilac";
export type MakePropertiesOptional<T, K extends string> = T extends T
	? Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>
	: never;

export function throttle<T extends (...args: any[]) => any>(fn: T, n: number): T {
	let last: number | undefined;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let result: ReturnType<T>;

	return function (this: any, ...args: Parameters<T>): ReturnType<T> {
		const now = Date.now();

		if (!last || now >= last + n) {
			last = now;
			result = fn.apply(this, args);
		} else {
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				last = Date.now();
				result = fn.apply(this, args);
			}, n - (now - last));
		}

		return result;
	} as T;
}
