import React, { useEffect, useState } from 'react';
import './slider.css'
function Slider() {
    const [next,setNext] = useState(1);
    const handleNext = ()=>{
        const sliderlength = document.getElementById("slider").childNodes.length-1;
        if(next >=sliderlength){
            setNext(1);
        }
        else{
            setNext(next+1);
        }
    }
    const handlePrev = ()=>{
        const sliderlength = document.getElementById("slider").childNodes.length-1;
        if(next <= 1){
            setNext(sliderlength);
        }
        else{
            setNext(next-1);
        }
    }
    useEffect(()=>{
        const slider = document.getElementById("slider");

        const newSlide = document.querySelector("#slide"+next);
        const newslideImg = newSlide.querySelector("img");
        const newHeading = newSlide.querySelector("div");

        const active =  slider.querySelectorAll("[data-active]");
        if(newslideImg === active[0]) return;

        delete active[0].dataset.active;
        delete active[1].dataset.active;
        
        newslideImg.dataset.active = true;
        newHeading.dataset.active=true;

    },[next]);
    return(
        <div className='slider' id = "slider"> 
            <div className='slider-buttons'>
                <button className='slider-button' onClick={handlePrev}><i className="fas fa-arrow-left"></i></button>
                <button className='slider-button' onClick={handleNext}><i className="fas fa-arrow-right"></i></button>
            </div>
            <div id = "slide1">
                <img className = "slider-img" data-active src="https://i.redd.it/7ovvnp2ccyx51.png" alt="" />
                <div className = "slide-heading" data-active>
                    <h2 >Predator Medya</h2>
                    <p>Oyuncuların bir numaralı adresi!</p>
                </div>
            </div>
            <div id = "slide2">
                <img className = "slider-img" src="https://1.bp.blogspot.com/-rG0OpZsIA-c/Xu99ATAhUZI/AAAAAAAADbk/amIOJQ4GCEwLf6AmP4SQv8bjx2YS_2QGgCK4BGAsYHg/s3840/wallapaper%2Bvalorant%2B01.jpg" alt="" />
                <div className = "slide-heading">
                    <h2 >Oyun ile alakalı her şey!</h2>
                    <p>Oyun sektorüyle alakalı son dakika haberleri,oyuncu forumları ve daha niceleri!</p>
                </div>
            </div>
            <div id = "slide3">
                <img className = "slider-img" src="https://3.bp.blogspot.com/-LJH71ajOVow/XPrt54OKCfI/AAAAAAAAG1E/EdgNW13s1LoNqAeJwelgblTW41Uf1f1lQCKgBGAs/w0/dying-light-2-uhdpaper.com-4K-7.jpg" alt="" />
                <div className = "slide-heading">
                    <h2 >İletişim kur!</h2>
                    <p>Üye olduktan sonra arkadaşlarınla rahatlıkla mesajlaşabilir,forumdan fikir belirtebilirsin!</p>
                </div>
            </div>
        </div>
    );
}

export default Slider;
