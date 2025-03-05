import React from 'react';
import {useEffect, useState, useRef} from 'react';
import './Landing001.css';
import dashboard_discovery from '../pages/dashboard-discovery.png';
import buzz_findr_text_bg_removed from '../components/buzz_findr_text_bg_removed.png';
import discovery_img from '../pages/discovery-img.png';
import contract_img from '../pages/contract-img.png';
import analytics_img from '../pages/analytics-img.png'; 
import chat_img from '../pages/chat-img.png';
import scheduling_img from '../pages/scheduling-img.png';


export default function Landing001() {

    const featureImageContainerRef = useRef(null);

    const imagesDict = {
        1: discovery_img, 
        2: contract_img,
        3: scheduling_img,
        4: analytics_img,
        5: chat_img,
    };

    function featureClickHandler(featureID) {
        if (featureImageContainerRef.current) {
            // Start the fade-out effect
            featureImageContainerRef.current.classList.add('fade-out');
            featureImageContainerRef.current.classList.remove('fade-in');
    
            // Wait for the fade-out effect to complete before changing the src
            setTimeout(() => {
                featureImageContainerRef.current.src = imagesDict[featureID];
    
                // Remove fade-out and trigger fade-in effect
                featureImageContainerRef.current.classList.remove('fade-out');
                featureImageContainerRef.current.classList.add('fade-in');
            }, 500); // Match the transition duration (0.5s)
        }
    }
    
    
    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-section-internal">
                    <div className="nav-bar">
                        <div className="logo">
                            {/* <img src="https://via.placeholder.com/10" width="120" height="100" /> */}
                            <img src={buzz_findr_text_bg_removed} width="120"/>
                        </div>
                        <div className="navigation">
                            <a href="#features">Features</a>
                            <a href="#usecases">Use Cases</a>
                            <a href="#pricing">Pricing</a>
                        </div>
                        <div className="nav-cta">
                            <button onClick={
                                () => {
                                    window.open("https://calendly.com/buzzfindr/30min", "_blank");
                                }
                            }>GET DEMO</button>
                        </div>
                    </div>
                    <div className="hero-main">
                        <div className="header-1">
                            <h1>BLAZING <span>FAST</span> INFLUENCER DISCOVERY</h1>
                        </div>
                        <div className="header-2">
                            <h2>Find and hire the <strong>perfect</strong> influencers for your brand in <strong>minutes!</strong></h2>
                        </div>                        
                    </div>
                    <div className="hero-demo-container">
                        <img src={dashboard_discovery} alt="Dashboard Image" />
                    </div>
                </div>
            </div>
            
            <div className="features-section" id="features">
                <div className="features-section-internal">
                    <div className="features-section-header">
                        <div className="features-section-header-main">
                            <h2>Features</h2>
                        </div>
                        {/* <div className="features-section-header-sub">
                            <p>Discover the features that make BuzzFindr the best influencer discovery platform on the market.</p>
                        </div> */}
                    </div>
                    <div className="features-section-content">
                        <div className="features-list">
                            <div className="feature" onClick={() => featureClickHandler(1)}>
                                <div className="feature-header">
                                    <h3>Influencer Discovery & Filtering 
                                    </h3>
                                </div>
                                <div className="feature-body">
                                    <p>Businesses can search and filter influencers based on followers, engagement (likes, comments), and services.</p>
                                </div>
                            </div>
                            <div className="feature" onClick={() => featureClickHandler(2)}>
                                <div className="feature-header">
                                    <h3>Automated Contract & Payment Management</h3>
                                </div>
                                <div className="feature-body">
                                    <p>Contracts are auto-generated when influencers accept campaigns, with payments held securely until content is posted.</p>
                                </div>
                            </div>
                            <div className="feature" onClick={() => featureClickHandler(3)}>
                                <div className="feature-header">
                                    <h3>Content Collaboration & Scheduling</h3>
                                </div>
                                <div className="feature-body">
                                    <p>Businesses and influencers can upload files, schedule posts for TikTok, and approve scheduling requests.</p>
                                </div>
                            </div>
                            <div className="feature" onClick={() => featureClickHandler(4)}>
                                <div className="feature-header">
                                    <h3>Performance Analytics & Retargeting</h3>
                                </div>
                                <div className="feature-body">
                                    <p>The platform tracks post performance in real-time and allows businesses to download commenter lists for targeted promotions.
                                    </p>
                                </div>
                            </div>
                            <div className="feature" onClick={() => featureClickHandler(5)}>
                                <div className="feature-header">
                                    <h3>Built-in Chat & Communication</h3>
                                </div>
                                <div className="feature-body">
                                    <p>A dedicated chat feature enables seamless discussions between businesses and influencers.
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="features-images">
                        <img src={discovery_img} alt="Feature Image" ref={featureImageContainerRef}/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="usecase-section" id="usecases">
                <div className="usecase-section-internal">
                    <div className="usecase-header">
                        <h2>Use Cases</h2>
                    </div>
                    <div className="usecase-body">
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        search  
                                    </span>
                                </div>
                                <div className="title">
                                    Brands Finding the Right Influencers
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p>Businesses can filter influencers based on engagement metrics and past performance.</p>
                            </div>
                        </div>
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        network_check  
                                    </span>
                                </div>
                                <div className="title">
                                    Automated Collaboration Management
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p>From contract creation to content scheduling, the workflow is streamlined.
                                </p>
                            </div>
                        </div>
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        search  
                                    </span>
                                </div>
                                <div className="title">
                                Effortless Payment & Contract Handling
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p>Payments are securely processed, ensuring both parties are protected.
                                </p>
                            </div>
                        </div>
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        search  
                                    </span>
                                </div>
                                <div className="title">
                                    Real-Time Content Performance Tracking
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p>Businesses can monitor influencer post analytics directly from the platform.
                                </p>
                            </div>
                        </div>
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        search  
                                    </span>
                                </div>
                                <div className="title">
                                Retargeting Engaged Audiences
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p> Businesses can download commenter lists to send coupons and promotional offers.
                                </p>
                            </div>
                        </div>
                        <div className="usecase">
                            <div className="usecase-header">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        search  
                                    </span>
                                </div>
                                <div className="title">
                                Seamless Communication Between Parties
                                </div>
                            </div>
                            <div className="usecase-body">
                                <p>Influencers and businesses can chat directly on the platform for smooth collaboration.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="pricing-section" id="pricing">
                <div className="pricing-section-internal">
                    <div className="pricing-section-header">
                        <h2>Pricing</h2>
                    </div>
                    <div className="pricing-section-content">
                        <div className="pricing-card">
                            <div className="pricing-card-header">
                                <h3>Basic</h3>
                            </div>
                            <div className="pricing-card-body">
                                <p>$199.99 / month</p>
                            </div>
                            <div className="pricing-card-features">
                                <div className="feature-1">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <p>Unlimited search</p>
                                </div>
                                <div className="feature-1">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <p>Retarget Audiences</p>
                                </div>
                                <div className="feature-1">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <p>Purchase Protection</p>
                                </div>
                                <div className="feature-1">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <p>Relevant influencers</p>
                                </div>
                                <div className="feature-1">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <p>Affordable Pricing</p>
                                </div>
                            </div>
                            <div className="pricing-card-footer">
                                <button onClick={
                                    () => {
                                        window.open("https://calendly.com/buzzfindr/30min", "_blank");
                                    }
                                }>GET STARTED</button>
                            </div>
                        </div>
                        {/* <div className="pricing-card">
                            <div className="pricing-card-header">
                                <h3>Pro</h3>
                            </div>
                            <div className="pricing-card-body">
                                <p>$9.99/month</p>
                            </div>
                            <div className="pricing-card-footer">
                                <button>GET STARTED</button>
                            </div>
                        </div>
                        <div className="pricing-card">
                            <div className="pricing-card-header">
                                <h3>Enterprise</h3>
                            </div>
                            <div className="pricing-card-body">
                                <p>Contact Us</p>
                            </div>
                            <div className="pricing-card-footer">
                                <button>GET STARTED</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="footer-section">
                <div className="footer-section-internal">
                    <div className="footer-logo">
                        <img src={buzz_findr_text_bg_removed} width="200"/> 
                    </div>
                    <div className="footer-navigation">
                        <div className="footer-navigation-header">
                            <h2>Navigation</h2>
                        </div>
                        <div className="footer-navigation-body">
                            <a href="#">Sign Up</a>
                            <a href="#">Log In</a>
                            <a href="#">Terms</a>
                            <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}