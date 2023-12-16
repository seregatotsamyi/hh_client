import React from 'react';

type VacancyItemType = {
    name: string,
    payment: Array<number>
    address: string
    employer: string
}

const VacancyItem = ({name, payment, address, employer}: VacancyItemType) => {
    console.log(name)
    return (
        <li className="listVacancy__item">
            <a className="listVacancy__link" href="#">
                <div className="listVacancy__name">
                    {name}
                </div>
                <div className="listVacancy__price">
                    {payment[0] === payment[1] ? payment[0] :
                    `${payment[0]} - ${payment[1]}` } ₽
                </div>
                <div className="listVacancy__company">
                    {employer}
                </div>
                <div className="listVacancy__city">
                    {address}
                </div>
                <div className="listVacancy__wrap-btn">
                    <button className="listVacancy__btn btn">
                        Подробнее
                    </button>
                    <button className="listVacancy__btn btn btn_2">
                        Редактировать
                    </button>
                </div>

            </a>
        </li>
    );
};

export default VacancyItem;