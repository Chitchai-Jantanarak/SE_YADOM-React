import React, { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const menuItems = [
        { name: 'Home', Link: '/'},
        { name: 'Shop', Link: '/shop'},
        { name: 'About', Link: '/about'},
        { name: 'Contact', Link: '/contact'}
    ]

    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setIsMenuOpen(false);
    };
    
    return (
        <div className="nav font-poppins sticky top-0 z-50">
            <div className="flex justify-between items-center p-3 bg-blue-200">
                {/* Logo */}
                <a className="px-3 font-concert-one text-xl" href='/'>YADOM</a>

                <nav className='hidden lg:flex component-nav-main-container'>
                    <ul className="flex space-x-12">
                        { menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.Link} className="font-normal hover-underline-animation" onClick={handleLinkClick}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Hamburger Menu Icon */}
                <div className='font-normal'>
                    <Hamburger rounded toggled={isMenuOpen} toggle={toggleMenu} size={24} duration={0.3}/>
                </div>
            </div>

            {/* Menu Content (Toggleable) */}
            <motion.nav
                className={`menu-content ${isMenuOpen ? 'block' : 'hidden'} text-black bg-gray-200 p-4`}    
                initial={{ opacity: 0 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, zIndex: isMenuOpen ? 1 : -1 }}
                transition={{ duration: 0.3 }}
            >
                <ul className="space-y-4">
                    { menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.Link} className="text-lg" onClick={handleLinkClick}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.nav>
        </div>
    );
}

export default NavBar;