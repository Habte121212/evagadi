import React from 'react'
import './footer.css' 

function Footer() {
  return (
    <div className="footer">
      <span className="footerLogo">
        <img src="/evagadifooter.jpg" alt="Evangadi Logo" />
      </span>
      <span>
        <a
          href="https://www.evangadi.com/empower"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
      </span>
      <span>
        <a
          href="https://www.evangadi.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </span>
      <span>
        <a
          href="https://www.evangadi.com/legal/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
      </span>
    </div>
  )
}

export default Footer
