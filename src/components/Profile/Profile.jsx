import "./Profile.css";
// import avatar from "../../images/user_avatar.png";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onCardClick, clothingItems, onAddGarment, currentUser }) {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
            onCardClick={onCardClick}
            clothingItems={clothingItems}
            onAddGarment={onAddGarment}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default Profile;
