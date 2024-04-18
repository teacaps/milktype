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
	let last: number;
	let timeout: ReturnType<typeof setTimeout>;
	let result: ReturnType<T>;
	return function (this: any, ...args: Parameters<T>): ReturnType<T> {
		const now = Date.now();
		if (last && now < last + n) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				last = now;
				result = fn.apply(this, args);
			}, n);
		} else {
			last = now;
			result = fn.apply(this, args);
		}
		return result;
	} as T;
}
