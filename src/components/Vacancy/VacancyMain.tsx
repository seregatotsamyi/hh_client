import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {REPORT, ROLE_APL} from '../../utils/consts';
import VacancyList from './VacancyList';
import {RootState} from "../../store/store";


const VacancyMain: React.FC = () => {

    const role = useSelector((state: RootState) => state.auth.role)

    return (
        <section className="list-vacancy-main">
            <div className="container">
                <div className="list-vacancy-main__title _h1">
                    Список вакансий
                </div>
                <div className="list-vacancy-main__option">
                    {
                        role === ROLE_APL ? (
                            <Link className="list-vacancy-main__report btn" to={REPORT}>
                                Сформировать отчеты
                            </Link>
                        ) : ""
                    }


                </div>
                <div className="list-vacancy-main__inner">
                    <VacancyList isProfile={false}/>
                </div>

            </div>
        </section>

    );
};

export default VacancyMain;