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
	pushModal: (modal: ModalProps) => void;
	popModal: (id: string) => void;
	clearModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modals, setModals] = useState<ModalProps[]>([]);

	const pushModal = useCallback((modal: ModalProps) => {
		setModals((prev) => {
			const exists = prev.some((m) => m.id === modal.id);
			return exists ? prev : [...prev, modal];
		});
	}, []);

	const popModal = useCallback((id: string) => {
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
		});
		setModals([]);
	}, [modals]);

	const currentModal = modals[modals.length - 1];

	return (
		<ModalContext.Provider value={{ modals, pushModal, popModal, clearModals }}>
			{children}
			{modals.length > 0 && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
					aria-hidden={modals.length === 0}>
					<div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-auto">
						<div className="w-full max-w-2xl mx-4 mb-4 bg-yogurt-60 rounded-lg shadow-lg overflow-hidden">
							{currentModal.component}
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const ModalHeader = ({ title }: { title: string }) => {
	const { clearModals } = useModal();
	return (
		<div className="flex flex-row justify-between items-center mt-4 mb-2 px-6">
			<h3 className="text-lg font-semibold text-cocoa-120">{title}</h3>
			<button className="p-1 hover:bg-cocoa-60 rounded" onClick={() => clearModals()} aria-label="Close modal">
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
	return <div className="px-6 pb-6">{children}</div>;
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
		const { pushModal, popModal } = useModal();
		const [mounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
			const timer = setTimeout(() => {
				pushModal({ id, component: Component });
			}, delayMs);

			return () => {
				clearTimeout(timer);
				if (mounted) {
					popModal(id);
				}
			};
		}, deps);

		return null;
	};
}
