import React from 'react';

function Biography({ imageUrl }) {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p><strong>Biography</strong></p>
          <h3>Who We Are</h3>
          <p>
            We are dedicated professionals revolutionizing healthcare management with innovative technology. Our comprehensive hospital management systems streamline operations and enhance patient care.
          </p>
          <p><strong>Our Journey</strong></p>
          <p>
            Since our inception, we've led the way in developing advanced hospital management systems, ensuring efficient patient data management and seamless integration with existing infrastructure.
          </p>
          <p><strong>Our Vision for 2024</strong></p>
          <p>
            We aim to enhance our system's capabilities with AI-driven diagnostics, real-time patient monitoring, and advanced analytics, making healthcare more accessible and patient-friendly.
          </p>
          <p><strong>Our Goals</strong></p>
          <p>
            Our goal is to simplify hospital management, reduce administrative burdens, and improve patient outcomes through technology.
          </p>
          <p><strong>Our Achievements</strong></p>
          <p>
            We've implemented our systems in numerous healthcare facilities, significantly improving operational efficiency and patient satisfaction.
          </p>
          <p><strong>Our Purpose</strong></p>
          <p>
            We empower healthcare providers with tools for exceptional care, bridging gaps in healthcare delivery for a more efficient and patient-centric system.
          </p>          
        </div>
      </div>
    </>
  );
}

export default Biography;
