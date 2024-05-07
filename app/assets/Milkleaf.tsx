import { twJoin } from "tailwind-merge";

export function Milkleaf({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 48 48" className={twJoin(className, "fill-current")}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="m43.239 4.953.028.267c.013.148.046.534.066.814.038.56.083 1.369.106 2.37.046 2 .007 4.77-.335 7.838-.683 6.125-2.577 13.495-7.457 18.326-5.693 6.14-13.994 9.227-24.67 9.227-1.02 0-2.063-.029-3.125-.087-.163 0-.636-.01-1.358-.071l-1.05-.057-.012-.214c-.468-8.4-.223-14.036.865-18.395 1.09-4.368 3.023-7.44 5.898-10.717 2.577-3.342 6.77-5.757 12.061-7.292 5.298-1.536 11.718-2.197 18.774-2.014l.209.005ZM31.403 30.63c-3.854 4.158-9.39 6.627-16.535 7.23L26.515 25.95a2.866 2.866 0 0 0-.032-4.05 2.862 2.862 0 0 0-4.046.031L10.46 34.097c.203-4.513 1.366-10.625 5.53-15.435 4.31-4.98 12.461-7.653 21.678-8-.052 2.371-.281 5.851-1.134 9.46-.884 3.74-2.433 7.6-5.13 10.508Z"
			/>
		</svg>
	);
}