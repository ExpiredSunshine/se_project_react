import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h2 className="item-card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="item-card__img" />
    </div>
  );
}

export default ItemCard;
