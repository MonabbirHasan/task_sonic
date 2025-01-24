import React from "react";
import "./footer.css";
import { Facebook, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        {/* FOOTER LOGO */}
        <div className="footer_column">
          <div className="footer_logo">
            <h1>task sonic</h1>
          </div>
          <p className="footer_description">
            Get help from thousands of trusted experts near you.
          </p>
        </div>
        {/* FOOTER SERVICE MENU */}
        <div className="footer_column">
          <h3>Services</h3>
          <ul>
            <li>
              <a href="/handyman">Handyman</a>
            </li>
            <li>
              <a href="/gardening">Gardening</a>
            </li>
            <li>
              <a href="/renovation">Renovation</a>
            </li>
          </ul>
        </div>
        {/* FOOTER BLOG MENU */}
        <div className="footer_column">
          <h3>Blog</h3>
          <ul>
            <li>
              <a href="/inspiration">Inspiration</a>
            </li>
            <li>
              <a href="/tips_tricks">Tips & Tricks</a>
            </li>
            <li>
              <a href="/tutorials">Tutorials</a>
            </li>
          </ul>
        </div>
        {/* FOOTER SOCIAL MEDIA MENU */}
        <div className="footer_column">
          <h3>Social Media</h3>
          <ul>
            <li>
              <a href="/facebook">
                <Facebook /> Facebook
              </a>
            </li>
            <li>
              <a href="/twitter">
                <Twitter /> twitter
              </a>
            </li>
            <li>
              <a href="/youtube">
                <YouTube /> YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_bottom">
        <p>© 2024 TaskSonic</p>
        <div className="footer_links">
          <a href="/terms_of_use">Terms of Use</a>
          <a href="/cookies">cookies</a>
          <a href="/privacy_policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
