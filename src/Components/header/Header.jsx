import React, { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../context/AuthContext';
const CheckUser = ()=>{
  const {user} = useContext(AuthContext);
  if(user){
    return(
      <>
        <li><a href="/messenger"><i className="fa-solid fa-message"></i>  Mesajlar</a></li>
        <li>
          <a href="/profile" className='prof'>
            <i className="fa-solid fa-user"></i>
          </a>
        </li>
      </>
    )
  }
  else{
    return(
      <>
        <li><a href="/register">Kayıt Ol</a></li>
        <li><a href="/login"><i className="fas fa-sign-in-alt"></i> Giriş yap</a></li>
      </>
    )
  }
}
function Header() {
  const handleCollapse = ()=>{
    const navlist = document.querySelector(".nav-list");
    navlist.classList.toggle("scroll");

    const toggler = document.querySelector(".burger");

    toggler.children[0].classList.toggle("line1");
    toggler.children[1].classList.toggle("line2");
    toggler.children[2].classList.toggle("line3");
  }
  return(
    <div className='header'>
        <div className='logo'>
            <a href="/">Predator</a>
        </div>
        <div className='nav'>
            <ul className='nav-list'>
                <li><a href="/news"><i className="far fa-newspaper"></i>  Haberler</a></li>
                <li><a href="/forum"><i className="fas fa-align-justify"></i> Forum</a></li>
                <CheckUser/>
            </ul>
        </div>
        <div className='burger' onClick={handleCollapse}>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
  );
}

export default Header;
