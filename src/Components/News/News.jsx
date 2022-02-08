import React from "react";
import { useEffect, useState } from "react";
import "./news.css";
import {Link} from 'react-router-dom';

function News() {
  const [searchTerm, setSearchTerm] = useState("");

  /* Dummy News Data  */
  const news = [
    {
      id: 1,
      cardTitle: "Apex Legends",
      img: "https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTFYNzQ0eWoxeEwuX1NMMTUwMF8uanBn.jpg",
      cardText:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt, lorem ac consectetur lobortis, tellusnisi sollicitudin dui, eget porttitor ipsum sem et tortor. Sedpellentesque aliquam justo, vel porttitor lorem fermentum a.Donec hendrerit nisi metus. In hac habitasse platea dictumst.",
    },
    {
      id: 2,
      cardTitle: "Valorant",
      img: "https://teknosafari.net/wp-content/uploads/2020/11/riot-games-2021-valorant-sampiyonlar-turu-nu-duyurdu.png",
      cardText:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt, lorem ac consectetur lobortis, tellusnisi sollicitudin dui, eget porttitor ipsum sem et tortor. Sedpellentesque aliquam justo, vel porttitor lorem fermentum a.Donec hendrerit nisi metus. In hac habitasse platea dictumst.",
    },
    {
      id: 3,
      cardTitle: "Battlefield 5",
      img: "https://i.dr.com.tr/cache/500x400-0/originals/0001785320001-1.jpg",
      cardText:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt, lorem ac consectetur lobortis, tellusnisi sollicitudin dui, eget porttitor ipsum sem et tortor. Sedpellentesque aliquam justo, vel porttitor lorem fermentum a.Donec hendrerit nisi metus. In hac habitasse platea dictumst.",
    },
  ];

  return (
    <div className="container ">
     

        
          {/* Search Box Start*/}
          <div className="row ">
           
            <div className="search-box">
              <input
                className="searching-box"
                placeholder="   Search Some News"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
           
            </div>
          
           
          </div>

          {/* Search Box End*/}
      

        {/* News */}

        {news
          .filter((filtered_news) => {
            if (searchTerm == "") {
              return filtered_news;
            } else if (
              filtered_news.cardTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return filtered_news;
            }
          })
          .map((filtered_news) => (

            <div className="row news-box">

        <div className ="col-6">
        <img className="news-image"
                    src={filtered_news.img}
                    alt="News Image"
                  />
        </div>
        <div className="col-6">
        <div className = "news-title"><Link to="/InduvidualNews"> {filtered_news.cardTitle}</Link></div>
        <p className = "news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

     
          ))}
     

      {/* News End */}
    </div>
  );
}

export default News;
