import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleAddClick,
  clothingItems,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__label">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {clothingItems.map((item, idx) => {
          const isDefault = item.owner === null || item.owner === undefined;
          const isOwner = currentUser && item.owner === currentUser.data._id;
          if (!isDefault && !isOwner) return null;
          const uniqueKey = isDefault ? `default-${idx}` : `${item._id}-${idx}`;
          return (
            <ItemCard
              key={uniqueKey}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
