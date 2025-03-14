import { useFetcher } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { ModalBody, ModalHeader } from "~/lib/ModalContext";

export function DeskpadDiscountModal() {
	const fetcher = useFetcher({ key: "deskpad-modal" });

	const { customerCreate: { customer = null } = {} } =
		(fetcher.data as { customerCreate: { customer: Pick<Customer, "email"> | null } }) ?? {};
	const submitted = !!customer;
	const email = customer?.email || fetcher.formData?.get("email")?.toString() || "";

	return (
		<>
			<ModalHeader title="save 50% on a deskpad" />
			<ModalBody>
				{!submitted ? (
					<>
						<p className="text-cocoa-100 font-medium mb-4">
							enter your email to get an additional <span className="font-semibold">50% off</span> on a
							brown sugar boba deskpad!
						</p>

						<fetcher.Form method="post" action="/signup" className="flex flex-col sm:flex-row gap-2 w-full">
							<Input className="flex-1" type="email" name="email" placeholder="your email" required />
							<Input type="hidden" name="apply_discount" value="DESKPAD50" />
							<Button
								type="submit"
								className="flex justify-center items-center p-2 h-10 w-10 rounded-full"
								disabled={fetcher.state !== "idle" || submitted}
								color="accent">
								<ArrowRightIcon className="text-yogurt-100 w-5 h-5" />
							</Button>
						</fetcher.Form>
					</>
				) : (
					<div className="flex flex-col text-center">
						<p className="text-cocoa-100">
							thanks for signing up! check out with <span className="font-semibold">{email}</span> to
							automatically get a discount.
						</p>
					</div>
				)}
			</ModalBody>
		</>
	);
}
