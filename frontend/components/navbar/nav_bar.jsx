import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { 
  TbMessageCircle2,
  TbMessageCircle2Filled,
  TbSquareRoundedPlus,
  TbSquareRoundedPlusFilled
} from "react-icons/tb";
import { ImSphere } from "react-icons/im"; // Delete later, replace w/ profile pic of currentUser

function NavBar() {

  const history = useHistory();
  const currentUserId = useSelector(state => state.session.id);

  const handleReroute = newPath => {
    // Only push new path onto history stack if we're not already at that path
    history.location.pathname === newPath ?
      null :
      history.push(newPath)
  }

  return (
    <div className="nav-bar-container" id="content">
      <div className="nav-bar-logo">Instacam</div>
      <ul className="nav-bar-ul">
        <li className="nav-bar-li"
          onClick={() => handleReroute('/')}
        >
          <AiOutlineHome
            className="nav-bar-icon"
            fill="white"
            size="25px"
          />
          <span className="nav-bar-label">Home</span>
        </li>
        <li className="nav-bar-li"
          onClick={() => handleReroute('/search')}
        >
          <RiSearchLine 
            className="nav-bar-icon"
            size="25px"
          />  
          <span className="nav-bar-label">Search</span>
        </li>
        <li className="nav-bar-li"
          onClick={() => handleReroute('/explore')}
        >
          <MdOutlineExplore 
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Explore</span>
        </li>
        <li className="nav-bar-li"
          onClick={() => handleReroute('/messages')}
        >
          <TbMessageCircle2
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Messages</span>
        </li>
        <li className="nav-bar-li"
          onClick={() => handleReroute('/create')}
        >
          <TbSquareRoundedPlus
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Create</span>
        </li>
        <li className="nav-bar-li"
          onClick={() => handleReroute(`/profile/${currentUserId}`)}
        >
          <ImSphere
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Profile</span>
        </li>
      </ul>
      <div className="nav-bar-li"
        id="nav-bar-more"
        onClick={() => handleReroute('/more')}
      >
        <FaBars
          className="nav-bar-icon"
          size="25px"
        />
        <span className="nav-bar-label">More</span>
      </div>
    </div>
  );
};

export default NavBar;