import React from 'react';
import {Link} from 'react-router-dom';
import {VACANCY} from "../../utils/consts";

type VacancyItemType = {
    name: string,
    employer: string | null
    address: string
}

const VacancyItem = ({name, employer,  address}: VacancyItemType) => {

    return (
        <li className={`listVacancy__item `}>
            <div className="listVacancy__link">

                <Link className="listVacancy__company _big" to={""}>
                    {employer ? employer : ""}
                </Link>
                <div className="listVacancy__city">
                    {address ? address : ''}
                </div>
                {/*<div className="listVacancy__wrap-btn">*/}
                {/*    <Link className="listVacancy__btn btn" to={`${VACANCY}/${vacancy_id}`}>*/}
                {/*        Подробнее*/}
                {/*    </Link>*/}
                {/*</div>*/}

            </div>
        </li>
    );
};

export default VacancyItem;