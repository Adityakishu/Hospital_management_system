import React from "react";
import {
  FaLocationArrow,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 2:00 PM",
    },
  ];

  return (
    <>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <FaWhatsapp />
                <a
                  href="https://wa.me/7654690093"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  WhatsApp
                </a>
              </li>
              <li>
                <FaTwitter />
                <a
                  href="https://twitter.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Twitter
                </a>
              </li>
              <li>
                <FaFacebook />
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span className="day">{element.day}</span>
                  <span className="time">{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>7654690093 / 9798576634</span>
            </div>
            <div>
              <MdEmail />
              <span className="email">ecaremedical@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Patna, Bihar</span>
            </div>
          </div>
        </div>
        <p className="bottom-paragraph">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
