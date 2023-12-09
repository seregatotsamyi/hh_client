import React from 'react';

const BurgerSvgClose: React.FC = () => {
    return (
        <svg className="header__burger-img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <defs>
            </defs>
            <title/>
            <g id="cross">
                <line fill={"none"} className="cls-1" x1="7" x2="25" y1="7" y2="25" strokeLinecap="round" stroke="#fff"
                      strokeLinejoin="round" strokeWidth="2px"/>
                <line fill={"none"} className="cls-1" x1="7" x2="25" y1="25" y2="7" strokeLinecap="round" stroke="#fff"
                      strokeLinejoin="round" strokeWidth="2px"/>
            </g>
        </svg>
    );
};

export default BurgerSvgClose;