// ItemCard.jsx
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const myId = currentUser?._id || currentUser?.data?._id;

  // Always treat likes as an array, even if undefined
  const likesArray = Array.isArray(item.likes) ? item.likes : [];

  // Only show the button when a user is logged in
  const isAuthorized = Boolean(myId);

  // Check if current user’s ID is in that array
  const isLiked = isAuthorized
    ? likesArray.some((userId) => userId === myId)
    : false;

  const likeButtonClass = isLiked
    ? "item-card__like-btn liked"
    : "item-card__like-btn";

  const handleLike = () => onCardLike({ id: item._id, isLiked });

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>

        {isAuthorized && (
          <button
            className={likeButtonClass}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          />
        )}
      </div>

      <img
        className="item-card__img"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}
