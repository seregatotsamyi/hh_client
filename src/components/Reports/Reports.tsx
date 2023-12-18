import React from 'react';
import ReportsOne from "./ReportsOne";
import ReportsTwo from "./ReportsTwo";
import ReportsThree from "./ReportsThree";

const Reports: React.FC = () => {
    return (
        <section className="report">
            <div className="container">
                <div className="report__title _h2">
                    Отчеты
                </div>
                <ul className="report__list">
                    <li className="report__item">
                        <ReportsOne/>
                    </li>
                    <li className="report__item">
                        <ReportsTwo/>
                    </li>
                    <li className="report__item">
                        <ReportsThree/>
                    </li>
                </ul>
            </div>

        </section>


    );
};

export default Reports;