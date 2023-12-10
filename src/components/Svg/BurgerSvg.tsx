import React from 'react';

const BurgerSvg:React.FC = () => {
    return (
        <svg className="header__burger-img" width="48" height="48" viewBox="0 0 48 48" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
            <path d="M7.94977 11.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M7.94977 23.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M7.94977 35.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default BurgerSvg;