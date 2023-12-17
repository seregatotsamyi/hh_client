import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {RootState} from "../../store/store";
import {setVacancyItemAC} from "../../store/vacancyReducer";
import Loading from '../Loading/Loading';

//@ts-ignore
const VacancyPage: React.FC = () => {

    const dispatch = useDispatch()
    const params = useParams();
    let id = Number(params.id);


    const vacancyItem = useSelector((state: RootState) => state.vacancy.vacancyItem)

    const error = useSelector((state: RootState) => state.vacancy.error)

    useEffect(() => {

        if (!vacancyItem.id && error === null) {
            dispatch(setVacancyItemAC(id))
        }
        if (id !== vacancyItem.id) {
            dispatch(setVacancyItemAC(id))
        }

    }, [])

    if (!vacancyItem.name) {
        if (error !== null) {
            return (
                <>{error}</>
            )
        }
        return <Loading/>
    }

    return (
        <>


            <div className="container">
                <div className="main__title _h2">
                    Подробнее о вакансии
                </div>
            </div>

            {error ? error : ""}

            <section className="vacancy">
                <div className="container">

                    <div className={`vacancy__inner ${vacancyItem.status ? "_close" : ""}`}>
                        {
                            vacancyItem.status? (
                                <div className="vacancy__close">
                                    Истек срок размещение
                                </div>
                            ): ""
                        }

                        <div className="vacancy__name _h3">
                            {vacancyItem.name ? vacancyItem.name : 'Ошибка'}
                        </div>
                        <div className="vacancy__price">
                            {vacancyItem.payment[0] === vacancyItem.payment[1] ? `${vacancyItem.payment[0]} ₽` :
                                `от ${vacancyItem.payment[0]} до ${vacancyItem.payment[1]} ₽`}
                        </div>
                        <ul className="vacancy__list">
                            <li className="vacancy__item">
                                <span>Пол:  </span><span>{vacancyItem.gender}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Коммуникабельность:  </span><span>{vacancyItem.communication_skills ? "Да" : "Нет"}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Образование:  </span><span>{vacancyItem.education}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Оформление трудовой книжки:  </span><span>{vacancyItem.registration_work_book ? "Да" : "Нет"}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Наличие соц. покета:  </span><span>{vacancyItem.availability_social_package ? "Да" : "Нет"}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Вид деятельности:  </span><span>{vacancyItem.activities.map((item:any)=>{
                                    return(
                                        <span key={item}>{item}</span>
                                    )
                            })}</span>
                            </li>
                            <li className="vacancy__item">
                                <span>Обязанности:  </span><span>{vacancyItem.duties.map((item:any)=>{
                                return(
                                    <span key={item}>{item}</span>
                                )
                            })}</span>
                            </li>
                        </ul>
                        <button className="vacancy__btn btn">
                            Откликнуться
                        </button>
                    </div>
                    <div className="vacancy__author-block">
                        <a className="vacancy__author _h3" href="#">
                            {vacancyItem.employer}
                        </a>
                        <div className="vacancy__city">
                            {vacancyItem.address}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default VacancyPage;