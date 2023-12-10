import React from 'react';

const Loading:React.FC = () => {
    return (
        <div className="loading">
            <div className="loading__item">
                <div className="circle one"></div>
                <div className="circle two"></div>
                <div className="circle three"></div>
            </div>
        </div>
    );
};

export default Loading;