import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__button">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
