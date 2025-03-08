import "./Profile.css";
import avatar from "../../images/user_avatar.png";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ onCardClick, clothingItems, onAddGarment, onEditProfile }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddGarment={onAddGarment}
        />
      </section>
    </div>
  );
}

export default Profile;
