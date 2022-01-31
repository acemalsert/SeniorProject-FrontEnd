import React from 'react';
import './header.css';
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
            <a href="http://" target="_blank" rel="noopener noreferrer">Predator</a>
        </div>
        <div className='nav'>
            <ul className='nav-list'>
                <li><a href="/haberler"><i className="far fa-newspaper"></i>  Haberler</a></li>
                <li><a href="/forum"><i className="fas fa-align-justify"></i> Forum</a></li>
                <li><a href="/register">Kayıt Ol</a></li>
                <li><a href="/login"><i className="fas fa-sign-in-alt"></i> Giriş yap</a></li>
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
