import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content-item modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__item-close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button onClick={() => onDelete(card)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
