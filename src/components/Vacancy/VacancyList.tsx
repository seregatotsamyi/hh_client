import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {LOGIN_PATH, ROLE_APL} from "../../utils/consts";
import {Navigate} from "react-router-dom";
import {setVacancy, setVacancyAC} from "../../store/vacancyReducer";
import VacancyItem from "./VacancyItem";

export interface VacancyListType extends React.HTMLProps<HTMLDivElement> {
    isProfile: boolean
}

const VacancyList: React.FC<VacancyListType> = ({isProfile}: VacancyListType) => {
    const dispatch = useDispatch()

    const userId = useSelector((state: RootState) => state.auth.userId)
    const role = useSelector((state: RootState) => state.auth.role)
    const vacancyList = useSelector((state: RootState) => state.vacancy.vacancy)
    const page = useSelector((state: RootState) => state.vacancy.currentPage)
    const pageSize = useSelector((state: RootState) => state.vacancy.pageSize)
    console.log(vacancyList)

    useEffect(() => {

        if (vacancyList === null) {
            dispatch(setVacancyAC(page, pageSize, userId))
        }

    }, [vacancyList, page, pageSize])

    if (role === ROLE_APL && isProfile === true) {
        return <Navigate to={LOGIN_PATH}/>
    }

    return (
        <div className="listVacancy">
            <ul className="listVacancy__list">
                {
                    vacancyList === null ? "Нет вакансий" : (
                        vacancyList.map((item: any) =>
                            <VacancyItem
                                key={item.id}
                                name={item.name}
                                payment={item.payment}
                                address={item.address.settlement}
                                employer={item.employer}
                            />
                        )
                    )
                }
            </ul>
            <div className="listVacancy__pagination">

            </div>
        </div>
    );
};

export default VacancyList;