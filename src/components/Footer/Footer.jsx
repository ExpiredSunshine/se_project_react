import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__signature">Developed by A.J. Croft</p>
      <p className="footer__date">{new Date().getFullYear()}</p>
    </footer>
  );
}
