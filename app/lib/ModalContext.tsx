import {
	useEffect,
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
	type DependencyList,
} from "react";
import { CookieConsentModal } from "~/components/global/modals/CookieConsentModal";
import { DeskpadDiscountModal } from "~/components/global/modals/DeskpadDiscountModal";
import { Image } from "~/components/elements/Image";
import { ChevronUpIcon } from "~/assets/icons/ChevronUp";
import { useCookies } from "react-cookie";

interface ModalState<Name extends ModalName> {
	name: Name;
	props: ModalProps<Name>;
	minimized?: boolean;
}

interface ModalContextType {
	modals: Array<ModalState<ModalName>>;
	dismissedModals: Set<string>;
	pushModal: <T extends ModalName>(modal: ModalState<T>) => void;
	popModal: (modal: ModalName) => void;
	updateModalState: (name: string, state: Partial<ModalState<ModalName>>) => void;
	clearModals: () => void;
}

const Modals = {
	CookieConsent: CookieConsentModal,
	DeskpadDiscount: DeskpadDiscountModal,
} as const satisfies Record<string, ModalBody>;
type ModalName = keyof typeof Modals;
type ModalProps<T extends ModalName> = Parameters<(typeof Modals)[T]>[0];
type ModalBody = ((props: any) => ReactNode) & { title: string; image?: string };

const dummyModal = () => null;
dummyModal.title = "whoops, you're not supposed to see this";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modals, setModals] = useState<Array<ModalState<ModalName>>>([]);
	const [dismissedModals, setDismissedModals] = useState<Set<string>>(new Set());
	const [, setCookie] = useCookies(modals.map((m) => "modal-dismissed-" + m.name));

	const pushModal = useCallback(
		<T extends ModalName>({ name, ...state }: ModalState<T>) => {
			if (dismissedModals.has(name)) return;

			setModals((prev) => {
				const exists = prev.find((m) => m.name === name);
				return exists ? prev : [...prev, { name, ...state } as any];
			});
		},
		[dismissedModals],
	);

	const popModal = useCallback(
		(name: string) => {
			if (!name) return;

			setDismissedModals((prev) => new Set([...prev, name]));
			setModals((prev) => prev.filter((modal) => modal.name !== name));
			setCookie("modal-dismissed-" + name, true, { path: "/" });
		},
		[setDismissedModals, setModals],
	);

	const updateModalState = useCallback(
		(name: string, state: Partial<ModalState<ModalName>>) => {
			setModals((prev) => {
				const modalIndex = prev.findIndex((modal) => modal.name === name);
				if (modalIndex === -1) return prev;

				const updatedModal = { ...prev[modalIndex], ...state };
				const newModals = [...prev];
				newModals[modalIndex] = updatedModal;
				return newModals;
			});
		},
		[setModals],
	);

	const clearModals = useCallback(() => {
		setDismissedModals((prev) => new Set([...prev, ...modals.map((m) => m.name)]));
		setModals([]);
	}, [modals, setDismissedModals, setModals]);

	const currentModal = modals[modals.length - 1];
	const Modal: ModalBody = currentModal ? Modals[currentModal.name] : dummyModal;

	return (
		<ModalContext.Provider value={{ modals, dismissedModals, pushModal, popModal, updateModalState, clearModals }}>
			{children}
			{modals.length > 0 && (
				<div
					className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
					aria-hidden={modals.length === 0}>
					<div className="fixed bottom-4 left-0 right-0 mx-4 flex justify-center pointer-events-auto">
						<div className="flex flex-col items-center w-full max-w-screen-sm p-4 bg-yogurt-60 rounded-2xl drop-shadow-xl overflow-hidden">
							{Modal.image && !currentModal.minimized && (
								<Image
									src={Modal.image}
									className="w-auto max-w-[75%] mb-4 h-auto aspect-[2/1] rounded-lg"
								/>
							)}
							<ModalHeader title={Modal.title} minimized={currentModal.minimized} />
							{!currentModal.minimized && (
								<ModalBody>
									<Modal {...(currentModal.props as any)} />
								</ModalBody>
							)}
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const ModalHeader = ({ title, minimized }: { title: string; minimized?: boolean }) => {
	const { popModal, updateModalState, modals } = useModal();
	const name = modals[modals.length - 1]?.name;

	const expandModal = useCallback(() => {
		updateModalState(name, { minimized: false });
	}, [name, updateModalState]);

	const contents = (
		<>
			<h3 className="text-lg font-semibold text-cocoa-120">{title}</h3>
			{minimized ? (
				<div className="p-1 hover:bg-cocoa-60 rounded">
					<ChevronUpIcon className="w-5 h-5 text-cocoa-100" />
				</div>
			) : (
				<button
					className="p-1 hover:bg-cocoa-60 rounded"
					onClick={() => popModal(name)}
					aria-label="Close modal">
					<svg
						className="w-5 h-5 stroke-cocoa-100"
						fill="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			)}
		</>
	);
	const containerClasses = "w-full flex flex-row justify-between items-center mb-2";
	return minimized ? (
		<button className={containerClasses} onClick={expandModal} aria-label="Expand modal">
			{contents}
		</button>
	) : (
		<div className={containerClasses}>{contents}</div>
	);
};

export const ModalBody = ({ children }: { children: ReactNode }) => {
	return <div className="mb-4">{children}</div>;
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export function withModalDelay<T extends ModalName>(
	modal: T,
	delayMs = 0,
	props: ModalProps<T> = {},
	initiallyMinimized = false,
	deps: DependencyList = [],
) {
	return () => {
		const { pushModal, updateModalState, dismissedModals } = useModal();
		const [cookies] = useCookies(["modal-dismissed-" + modal]);

		const isModalDismissed = dismissedModals.has(modal);

		useEffect(() => {
			if (isModalDismissed) return;

			const timer = setTimeout(() => {
				pushModal({ name: modal, props, minimized: initiallyMinimized });
			}, delayMs);

			return () => {
				clearTimeout(timer);
			};
		}, [...deps, isModalDismissed]);

		useEffect(() => {
			if (!initiallyMinimized) return;
			// don't force a modal open if the user has dismissed it before
			if (cookies["modal-dismissed-" + modal]) return;

			setTimeout(() => {
				updateModalState(modal, { minimized: false });
			}, 2 * delayMs);
		});

		return null;
	};
}
