import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-3 mt-10">
      <p>&copy; {new Date().getFullYear()} Online Auction. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
