import { Image } from "~/components/elements/Image";
import { ButtonLink } from "~/components/elements/Button";
import { Renders } from "./constants";

export function IntroSection() {
	return (
		<section className="xs:mt-18 lg:mt-0 flex flex-col lg:flex-row items-center sm:w-full sm:max-w-screen-2xl">
			<Image {...Renders.BoardTilt} className="w-full lg:w-1/2 lg:max-w-xl xl:max-w-3xl" />
			<div className="relative sm:-mt-12 lg:mt-0 gap-y-4 max-w-[30ch] md:max-w-[35ch] xl:max-w-[40ch] text-balance">
				<h2 className="mb-8 text-3xl sm:text-4xl xl:text-5xl font-medium text-cocoa-120 text-right md:text-center lg:text-left text-balance">
					<span className="italic">created for </span>
					<br />
					<span className="text-[#A8593F]">bubble tea</span>
					<span className="italic"> lovers</span>
				</h2>
				<ButtonLink
					external={true}
					url="https://youtu.be/c2XSvORM5wE"
					color="yogurt"
					className="py-4 text-shrub visited:text-blurple hover:text-yogurt-100 xs:text-xl font-medium w-full border-2 border-shrub visited:border-blurple hover:border-transparent">
					watch the intro video{"   "}→
				</ButtonLink>
			</div>
		</section>
	);
}
