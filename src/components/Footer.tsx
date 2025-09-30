import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer container">
      <div className="footer-bottom">
        <p>
          Copyright © {currentYear}{' '}
            <a 
              href="https://airnet.pages.dev/" 
              className="footer-link"
              aria-label="Go to Airtelnet homepage"
            >
              Airtelnet
            </a>{' '}
            | Powered by{' '}
            <a 
              href="https://synapseflow-aru.pages.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="Visit Synapseflow solutions website"
            >
              Synapseflow solutions
            </a>
          </p>
        </div>
    </footer>
  );
};

export default Footer;