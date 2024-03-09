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
