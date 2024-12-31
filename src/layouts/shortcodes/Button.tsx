import React from "react";

const Button: React.FC<{
  label: string;
  link: string;
  style?: string;
  rel?: string;
}> = ({ label, link, style, rel }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 hover:text-white hover:no-underline ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}>
      {label}
    </a>
  );
};

export default Button;
