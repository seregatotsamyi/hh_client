import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {RootState} from "../../store/store";
import {deleteItem, setIsDeleted, setVacancyItemAC} from "../../store/vacancyReducer";
import Loading from '../Loading/Loading';
import {MAIN_PATH, PROFILE_PATH} from "../../utils/consts";


const VacancyPage: React.FC = () => {

    const dispatch:any = useDispatch()
    const params = useParams();
    let id = Number(params.id);

    const userId = useSelector((state: RootState) => state.auth.userId)
    const vacancyItem = useSelector((state: RootState) => state.vacancy.vacancyItem)
    const isDeleted = useSelector((state: RootState) => state.vacancy.isDeleted)

    const error = useSelector((state: RootState) => state.vacancy.error)

    useEffect(() => {
        dispatch(setIsDeleted(false))
        if (!vacancyItem.id && error === null) {
      //      dispatch(setVacancyItemAC(id))
        }
        if (id !== vacancyItem.id) {
      //      dispatch(setVacancyItemAC(id))
        }

    }, [])

    const deleteVacancy = () => {
        dispatch(deleteItem(id))
    }

    if (!vacancyItem.name) {
        if (error !== null) {
            return (
                <>{error}</>
            )
        }
        return <Loading/>
    }
    if (isDeleted){
        return <Navigate to={MAIN_PATH}/>
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
                            <li className="vacancy__item">
                                <span>Дата размещение:  </span> <span>{vacancyItem.start_date} </span>
                            </li>
                            <li className="vacancy__item">
                                <span>Дата снятия:  </span> <span>{vacancyItem.end_date} </span>
                            </li>
                        </ul>
                        {/*<button className="vacancy__btn btn">*/}
                        {/*    Откликнуться*/}
                        {/*</button>*/}
                        {
                            vacancyItem.employerId === userId ?  (
                                <button className="vacancy__btn btn" onClick={deleteVacancy}>
                                    Удалить
                                </button>
                                ) : ""

                        }
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