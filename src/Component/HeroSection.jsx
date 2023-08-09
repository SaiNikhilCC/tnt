import React from 'react';
import '../Styles/Hero.css';
import video from './../assets/images/Neon-flash_4.mp4';

const HeroSection = () => {
  return <React.Fragment>
    <div className="tnt-container glow-up-section col-md-12 d-flex justify-content-center">
        <div className="row align-middle justify-content-center col-md-10 d-flex">
            <div className="col-md-6 glow-up-text">
                <h1>
                    GLOW UP<br/>
                    THE WORLD

                </h1>
                <h2 className="best-selling-text">
                    Best-selling Neon Lights in India

                </h2>
                <p>
                    Your name, emotions, business logo, or the motto you live by. Choose anything and create customized
                    neon
                    signboards. Let us help you personalise your space and add character to it by providing creative
                    lighting solutions.

                </p>
            </div>
            <div className="col-md-6 d-flex justify-content-center">

                <video className="elementor-video" width="600" src={video} autoPlay="autoplay" loop={true}
                    muted="muted" playsInline="" controlsList="nodownload"></video>
            </div>
        </div>
    </div>


  </React.Fragment>
}

export default HeroSection; 