import React from 'react';
import {Link} from 'react-router-dom';
import {VACANCY} from "../../utils/consts";

type VacancyItemType = {
    name: string,
    payment: Array<number>
    address: string
    employer: string
    vacancy_id: number
    isClosed: boolean
}

const VacancyItem = ({name, payment, address, employer, vacancy_id, isClosed}: VacancyItemType) => {

    return (
        <li className={`listVacancy__item ${isClosed ? "_close" : ""}`}>
            <div className="listVacancy__link">
                {
                    isClosed ? (
                        <div className="vacancy__close">
                            Истек срок размещение
                        </div>
                    ) : ""
               }
                <Link className="listVacancy__name" to={`${VACANCY}/${vacancy_id}`}>
                    {name}
                </Link>
                <div className="listVacancy__price">
                    {payment[0] === payment[1] ? payment[0] :
                        `${payment[0]} - ${payment[1]}`} ₽
                </div>
                <Link className="listVacancy__company" to={""}>
                    {employer}
                </Link>
                <div className="listVacancy__city">
                    {address}
                </div>
                <div className="listVacancy__wrap-btn">
                    <Link className="listVacancy__btn btn" to={`${VACANCY}/${vacancy_id}`}>
                        Подробнее
                    </Link>
                </div>

            </div>
        </li>
    );
};

export default VacancyItem;