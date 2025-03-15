import {
	useEffect,
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
	type DependencyList,
} from "react";

export interface ModalProps {
	id: string;
	component: ReactNode;
	onClose?: () => void;
}

interface ModalContextType {
	modals: ModalProps[];
	dismissedModals: Set<string>;
	pushModal: (modal: ModalProps) => void;
	popModal: (id: string) => void;
	clearModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modals, setModals] = useState<ModalProps[]>([]);
	const [dismissedModals, setDismissedModals] = useState<Set<string>>(new Set());

	const pushModal = useCallback(
		(modal: ModalProps) => {
			if (dismissedModals.has(modal.id)) return;

			setModals((prev) => {
				const exists = prev.some((m) => m.id === modal.id);
				return exists ? prev : [...prev, modal];
			});
		},
		[dismissedModals],
	);

	const popModal = useCallback((id: string) => {
		setDismissedModals((prev) => {
			const newSet = new Set(prev);
			newSet.add(id);
			return newSet;
		});

		setModals((prev) => {
			const modalToRemove = prev.find((modal) => modal.id === id);
			if (modalToRemove?.onClose) {
				modalToRemove.onClose();
			}
			return prev.filter((modal) => modal.id !== id);
		});
	}, []);

	const clearModals = useCallback(() => {
		modals.forEach((modal) => {
			if (modal.onClose) {
				modal.onClose();
			}

			setDismissedModals((prev) => {
				const newSet = new Set(prev);
				newSet.add(modal.id);
				return newSet;
			});
		});
		setModals([]);
	}, [modals]);

	const currentModal = modals[modals.length - 1];

	return (
		<ModalContext.Provider value={{ modals, dismissedModals, pushModal, popModal, clearModals }}>
			{children}
			{modals.length > 0 && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
					aria-hidden={modals.length === 0}>
					<div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-auto">
						<div className="w-full max-w-2xl px-6 py-4 bg-yogurt-60 rounded-lg shadow-lg overflow-hidden">
							{currentModal.component}
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const ModalHeader = ({ title }: { title: string }) => {
	const { popModal, modals } = useModal();
	const id = modals[modals.length - 1].id;
	return (
		<div className="flex flex-row justify-between items-center mb-2">
			<h3 className="text-lg font-semibold text-cocoa-120">{title}</h3>
			<button className="p-1 hover:bg-cocoa-60 rounded" onClick={() => popModal(id)} aria-label="Close modal">
				<svg
					className="w-5 h-5 stroke-cocoa-100"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
		</div>
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

export function withModalDelay(id: string, Component: ReactNode, delayMs = 0, deps: DependencyList = []) {
	return () => {
		const { pushModal, dismissedModals } = useModal();

		const isModalDismissed = dismissedModals.has(id);

		useEffect(() => {
			if (isModalDismissed) return;

			const timer = setTimeout(() => {
				pushModal({
					id,
					component: Component,
				});
			}, delayMs);

			return () => {
				clearTimeout(timer);
			};
		}, [...deps, isModalDismissed]);

		return null;
	};
}
