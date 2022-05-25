import React, { useContext ,useState} from "react";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  NavLink,
  ButtonDropdown,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const CheckUser = () => {
  const { user } = useContext(AuthContext);
  const {t} = useTranslation();

  function deleteLocalStorage(){
    localStorage.removeItem('user');
  }
  if (user) {
    return (
      <>
        <li>
          <a href="/messenger">
            <i className="fa-solid fa-message"></i> {t("navbar.messages")}
          </a>
        </li>
        <li>
          <a href="/profile">
            <i className="fa-solid fa-user"></i>
          </a>
        </li>
        <li>
          <a href="login" onClick={deleteLocalStorage}><i className="fa-solid fa-arrow-right-from-bracket"></i></a>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <a href="/register">{t("navbar.signup")}</a>
        </li>
        <li>
          <a href="/login">
            <i className="fas fa-sign-in-alt"></i> {t("navbar.login")}
          </a>
        </li>
      </>
    );
  }
};
function Header() {
  const  {t} = useTranslation();
  const [open,setOpen]=useState(false);
  const handleCollapse = () => {
    const navlist = document.querySelector(".nav-list");
    navlist.classList.toggle("scroll");

    const toggler = document.querySelector(".burger");

    toggler.children[0].classList.toggle("line1");
    toggler.children[1].classList.toggle("line2");
    toggler.children[2].classList.toggle("line3");
  };

  const handleOpen = () => {
    if(open === true){
      setOpen(false);
    }
    else if(open === false){
      setOpen(true);
    }
  }
  return (
    <div className="header">
      <div className="logo">
        <a href="/">Predator</a>
      </div>
      <div className="nav">
        <ul className="nav-list">
        <li><a href="/feed"><i className="fa-solid fa-rss"></i>  Feed</a></li>
          <li>
            <a href="/news">
              <i className="far fa-newspaper"></i> {t("navbar.news")}
            </a>
          </li>
          <li>
            <a href="/forum">
              <i className="fas fa-align-justify"></i> {t("navbar.forum")}
            </a>
          </li>
          
          <CheckUser />
          <ButtonDropdown className="fas fa-globe " isOpen={open} onClick={handleOpen}>
          <DropdownToggle
                  nav
                  onClick={(e) => e.preventDefault()}
                  className="p-0"
                >
                  {/* <div>
                    <i className="fas fa-globe "></i>
                  </div> */}
                </DropdownToggle>

                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem
                      onClick={() => {
                        i18n.changeLanguage("tr");
                      }}
                    >
                      {t("navbar.turkish")}
                
                    </DropdownItem>
                  </NavLink>
                  <NavLink>
                    <DropdownItem onClick={() => i18n.changeLanguage("en")}>
                      {t("navbar.english")}

                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
          </ButtonDropdown>
          
                



        </ul>
      </div>
      <div className="burger" onClick={handleCollapse}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Header;
