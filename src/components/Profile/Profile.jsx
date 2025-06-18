import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleAddClick,
  onCardClick,
  clothingItems,
  onSignOutClick,
  onEditProfileClick,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          isLoggedIn={isLoggedIn}
          onSignOutClick={onSignOutClick}
          onEditProfileClick={onEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
