interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                    <div className="relative bg-white p-4 rounded-lg z-10 mx-4 md:mx-0 md:w-1/4 shadow-lg">
                        <button
                            className="absolute top-3 right-3 text-black hover:text-gray-700 font-semibold focus:outline-none"
                            onClick={onClose}
                        >
                            X
                        </button>
                        <div className="mt-2">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
