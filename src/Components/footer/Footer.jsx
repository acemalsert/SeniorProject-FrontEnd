import React from 'react';
import './footer.css'
function Footer() {
  return(
      <div className='footer'>
          <div className='footer-links'>
            <ul>
                <li><a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
            <p><i className="fas fa-copyright"></i> 2022, Predator Social Media Team</p>
      </div>
  );
}

export default Footer;