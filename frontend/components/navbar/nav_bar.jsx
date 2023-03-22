import React from "react";
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

  return (
    <div className="nav-bar-container" id="content">
      <div className="nav-bar-logo">Instacam</div>
      <ul className="nav-bar-ul">
        <li className="nav-bar-li">
          <AiOutlineHome
            className="nav-bar-icon"
            fill="white"
            size="25px"
          />
          <span className="nav-bar-label">Home</span>
        </li>
        <li className="nav-bar-li">
          <RiSearchLine 
            className="nav-bar-icon"
            size="25px"
          />  
          <span className="nav-bar-label">Search</span>
        </li>
        <li className="nav-bar-li">
          <MdOutlineExplore 
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Explore</span>
        </li>
        <li className="nav-bar-li">
          <TbMessageCircle2
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Messages</span>
        </li>
        <li className="nav-bar-li">
          <TbSquareRoundedPlus
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Create</span>
        </li>
        <li className="nav-bar-li">
          <ImSphere
            className="nav-bar-icon"
            size="25px"
          />
          <span className="nav-bar-label">Profile</span>
        </li>
      </ul>
      <div className="nav-bar-li" id="nav-bar-more">
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