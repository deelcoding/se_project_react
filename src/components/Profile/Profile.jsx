import "./Profile.css";
import avatar from "../../images/user_avatar.png";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick}/>
      </section>
    </div>
  );
}

export default Profile;
