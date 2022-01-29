import React from 'react';
function Slider() {
  return(
      <div className='slider'>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="https://1.bp.blogspot.com/-rG0OpZsIA-c/Xu99ATAhUZI/AAAAAAAADbk/amIOJQ4GCEwLf6AmP4SQv8bjx2YS_2QGgCK4BGAsYHg/s3840/wallapaper%2Bvalorant%2B01.jpg" alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://i.redd.it/7ovvnp2ccyx51.png" alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://img7.uhdpixel.com/wp/7w/1/dying-light-bad-blood-battle-royale-w7133.jpg" alt="Third slide"/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
      </div>
  );
}

export default Slider;
