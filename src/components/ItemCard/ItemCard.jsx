import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card">
      <h2 className="item-card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        src={item.link}
        alt={item.name}
        className="item-card__img"
      />
    </li>
  );
}

export default ItemCard;
