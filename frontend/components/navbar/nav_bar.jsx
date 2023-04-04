import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as modalActionCreators from "../../actions/modal_actions";
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
import { ImSphere } from "react-icons/im";

function NavBar() {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.session.id);
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);
  const [smallNavBar, setSmallNavBar] = useState(false);

  const handleReroute = newPath => {
    // Only push new path onto history stack if we're not already at that path
    history.location.pathname === newPath ?
      null :
      history.push(newPath)
  }

  const isSelected = pathname => {
    const currentPathName = history.location.pathname;
    if (pathname === currentPathName) {
      return true;
    } else {
      return false;
    }
  };

  const getCorrectNavBarSize = () => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1260) {
        if (smallNavBar) setSmallNavBar(false);
        return "nav-bar-label"
      } else {
        if (!smallNavBar) setSmallNavBar(true);
        return "nav-bar-label-hidden"
      };
    });
  };
  
  return (
    <div className="nav-bar-container">
      <div id="nav-bar-logo-full" className="nav-bar-logo">Instacam</div>
      <div className="nav-bar-logo">
        <img className="nav-bar-logo-mini" src={window.navBarMiniLogo}/>
      </div> 
      <ul className="nav-bar-ul">
        <li className={isSelected('/') ? "nav-bar-li-selected" : null}
          onClick={() => handleReroute('/')}
        >
          {isSelected('/') ?
            <AiFillHome className="nav-bar-icon" fill="white" size="30px" /> :
            <AiOutlineHome className="nav-bar-icon" fill="white" size="30px" />
          }
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Home</span>
        </li>
        <li className={isSelected('/search') ? "nav-bar-li-selected" : null}
          onClick={() => handleReroute('/search')}
        >
          {isSelected('/search') ?
            <RiSearchFill className="nav-bar-icon" size="30px"/> :
            <RiSearchLine className="nav-bar-icon" size="30px"/>
          }
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Search</span>
        </li>
        <li className={isSelected('/explore') ? "nav-bar-li-selected" : null}
          onClick={() => handleReroute('/explore')}
        >
          {isSelected('/explore') ?
            <MdExplore className="nav-bar-icon" size="30px" /> :
            <MdOutlineExplore className="nav-bar-icon" size="30px" />
          }
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Explore</span>
        </li>
        <li className={isSelected('/messages') ? "nav-bar-li-selected" : null}
          onClick={() => handleReroute('/messages')}
        >
          {isSelected('/messages') ?
            <TbMessageCircle2Filled className="nav-bar-icon" size="30px" /> : 
            <TbMessageCircle2 className="nav-bar-icon" size="30px" />
          }
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Messages</span>
        </li>
        <li className={isSelected('/create') ? "nav-bar-li-selected" : null}
          onClick={() => openModal('createPost')}
        >
          {isSelected('/create') ?
            <TbSquareRoundedPlusFilled className="nav-bar-icon" size="30px" /> :
            <TbSquareRoundedPlus className="nav-bar-icon" size="30px" />
          }
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Create</span>
        </li>
        <li className={isSelected(`/profile/${currentUserId}`) ? "nav-bar-li-selected" : null}
          onClick={() => handleReroute(`/profile/${currentUserId}`)}
        >
          <ImSphere
            className="nav-bar-icon"
            size="30px"
          />
          <span id={getCorrectNavBarSize()} className="nav-bar-label">Profile</span>
        </li>
      </ul>
      <div className={isSelected('/more') ? "nav-bar-li-selected" : null}
        id="nav-bar-more-icon-container"
        onClick={() => openModal('more')}
      >
        <FaBars
          className="nav-bar-icon"
          size="25px"
        />
        <span id={getCorrectNavBarSize()} className="nav-bar-label-more-span">More</span>
      </div>
    </div>
  );
};

export default NavBar;