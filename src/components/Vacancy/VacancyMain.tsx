import React from 'react';
import {useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { REPORT } from '../../utils/consts';
import VacancyList from './VacancyList';



const VacancyMain: React.FC = () => {
    const dispatch = useDispatch()


    return (
        <section className="list-vacancy-main">
            <div className="container">
                <div className="list-vacancy-main__title _h1">
                    Список вакансий
                </div>
                <div className="list-vacancy-main__option">
                    <Link className="list-vacancy-main__report btn" to={REPORT}>
                        Сформировать отчеты
                    </Link>

                </div>
                <div className="list-vacancy-main__inner">
                    <VacancyList isProfile={false}/>
                </div>

            </div>
        </section>

    );
};

export default VacancyMain;