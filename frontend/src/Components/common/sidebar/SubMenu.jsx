import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const SubMenu = ({ item, isOpen }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        to={item.path}
        className="link"
        onClick={item.subNav && showSubnav}
      >
        <div className="icon-sidebar">{item.icon}</div>
        <div
          style={{ display: isOpen ? "block" : "none" }}
          className="link-text"
        >
          {item.name}
        </div>

        <div
          className="icon-sidebar-right"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className="link-submenu">
              <div className="icon-sidebar">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link-text"
              >
                {item.name}
              </div>
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
