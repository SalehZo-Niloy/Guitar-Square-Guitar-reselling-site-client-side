import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/msnniloy" className='text-2xl' target='blank'><FaFacebook /></a>
                    <a href="https://github.com/SalehZo-Niloy" className='text-2xl' target='blank'><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/saleh-zohur-niloy-941332237/" className='text-2xl' target='blank'><FaLinkedin /></a>
                </div>
            </div>
            <div>
                <p>Copyright © 2022 - All right reserved by Guitar Square</p>
                <p>Saleh Zohur Niloy,CFO</p>
            </div>
        </footer>
    );
};

export default Footer;