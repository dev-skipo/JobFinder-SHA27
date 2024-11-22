// src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            <p>Follow us on social media!</p>
            {/* Add social media links here if needed */}
        </footer>
    );
}

export default Footer;