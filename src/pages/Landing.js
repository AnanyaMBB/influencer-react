import React from 'react';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="logo">FormCarry</div>
          <nav className="navbar">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <button className="cta-btn">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>Get emails and messages from your HTML form</h1>
            <p>Build and manage contact forms without a backend server. Integrate with any platform in seconds.</p>
            <button className="cta-btn">Get Started</button>
          </div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/500" alt="Hero Image" />
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="partners">
        <div className="container">
          <ul className="partner-logos">
            <li><img src="https://via.placeholder.com/100" alt="Partner 1" /></li>
            <li><img src="https://via.placeholder.com/100" alt="Partner 2" /></li>
            <li><img src="https://via.placeholder.com/100" alt="Partner 3" /></li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Hassle-free setup with all major development frameworks</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Easy Integration</h3>
              <p>Connect your forms with a simple POST request.</p>
            </div>
            <div className="feature-item">
              <h3>File Uploads</h3>
              <p>Upload files easily with FormCarry’s API.</p>
            </div>
            <div className="feature-item">
              <h3>Customizable</h3>
              <p>Easily customize your form response handling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What our users say</h2>
          <div className="testimonial-item">
            <p>"FormCarry has made it incredibly easy to manage form submissions for my website."</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-item">
            <p>"I love how simple and fast the integration process was!"</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <p>&copy; 2023 FormCarry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
