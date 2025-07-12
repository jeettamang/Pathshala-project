import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4 text-sm text-gray-500 bg-white shadow-inner">
      All rights reserved &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
