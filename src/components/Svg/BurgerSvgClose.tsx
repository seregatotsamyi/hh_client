import React from 'react';

const BurgerSvgClose: React.FC = () => {
    return (

        <svg className="header__burger-img" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    {`
                    .cls-1 {
                    fill: none;
                    stroke: #fff;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2px;
                }`}
                </style>
            </defs>
            <title/>
            <g id="cross">
                <line className="cls-1" x1="7" x2="25" y1="7" y2="25"/>
                <line className="cls-1" x1="7" x2="25" y1="25" y2="7"/>
            </g>
        </svg>
    );
};

export default BurgerSvgClose;