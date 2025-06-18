import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  isFormValid,
  secondaryAction,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit"
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
            {secondaryAction && (
              <button
                type="button"
                className="modal__secondary-btn"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
