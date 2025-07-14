interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[95%] max-w-5xl max-h-[90vh]  p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg sm:text-xl font-semibold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className=" overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
