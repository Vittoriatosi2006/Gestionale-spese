type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onModifica?: () => void;
  onElimina?: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  title = "Conferma",
  message,
  onModifica,
  onElimina,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            Annulla
          </button>
          {onModifica && (
            <button className="modal-modifica" onClick={onModifica}>
              Modifica
            </button>
          )}
          {onElimina && (
            <button className="modal-elimina" onClick={onElimina}>
              Elimina
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
