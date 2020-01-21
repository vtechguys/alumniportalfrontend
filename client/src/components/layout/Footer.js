import React from 'react';

import './Footer.css';

export default () => {
  return (
    <footer className="text-white p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} AlumniPortal
    </footer>
  );
};
