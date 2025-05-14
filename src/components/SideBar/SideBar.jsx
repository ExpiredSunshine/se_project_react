import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
