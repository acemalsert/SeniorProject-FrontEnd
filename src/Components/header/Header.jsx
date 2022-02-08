import React from 'react';
import './header.css';
import {Link} from "react-router-dom"
function Header() {
  return(
    <div className='header'>
        <div className='logo'>
            <a href="http://" target="_blank" rel="noopener noreferrer">Pedator</a>
        </div>
        <div className='nav'>
            <ul className='nav-list'>
                <li><Link to="/News"> News</Link></li>
                <li>Forum</li>
                <li>Giriş Yap</li>
                <li>Kayıt Ol</li>
            </ul>
        </div>
    </div>
  );
}

export default Header;
