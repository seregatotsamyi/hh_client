import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {LOGIN_PATH, ROLE_APL} from "../../utils/consts";
import {Navigate} from "react-router-dom";
import {setVacancyAC} from "../../store/vacancyReducer";
import VacancyItem from "./VacancyItem";
import {Pagination, PaginationProps} from 'antd';

export interface VacancyListType extends React.HTMLProps<HTMLDivElement> {
    isProfile: boolean
}

const VacancyList: React.FC<VacancyListType> = ({isProfile}: VacancyListType) => {
    const dispatch = useDispatch()

    const userId = useSelector((state: RootState) => state.auth.userId)
    const role = useSelector((state: RootState) => state.auth.role)
    const vacancyList = useSelector((state: RootState) => state.vacancy.vacancy)
    let totalVacancyCount = useSelector((state: RootState) => state.vacancy.totalVacancyCount)
    let totalVacancyUserCount = useSelector((state: RootState) => state.vacancy.isCountVacancyUser)
    const page = useSelector((state: RootState) => state.vacancy.currentPage)
    const pageSize = useSelector((state: RootState) => state.vacancy.pageSize)

    if (totalVacancyCount === null) {
        totalVacancyCount = 1
    }

    useEffect(() => {

        if (vacancyList.length === 0) {
            dispatch(setVacancyAC(page, pageSize, userId))
        }

    }, [vacancyList, page, pageSize,totalVacancyUserCount])

    const onSetPage: PaginationProps['onChange'] = (page) => {
        dispatch(setVacancyAC(page, pageSize, userId))
    };

    if (role === ROLE_APL && isProfile === true) {
        return <Navigate to={LOGIN_PATH}/>
    }

    return (
        <div className="listVacancy">
            <ul className="listVacancy__list">
                {
                    vacancyList.length === 0 ? "Нет вакансий" : (
                        vacancyList.map((item: any) =>
                            <VacancyItem
                                key={item.id}
                                name={item.name}
                                payment={item.payment}
                                address={item.address.settlement}
                                employer={item.employer}
                                vacancy_id={item.id}
                                isClosed={item.status}
                            />
                        )
                    )
                }
            </ul>
            <div className="listVacancy__pagination">
                {
                    vacancyList.length !== 0 && <Pagination defaultCurrent={page}
                                                            total={totalVacancyCount}
                                                            defaultPageSize={pageSize}
                                                            showSizeChanger={false}
                                                            responsive={true}
                                                            onChange={onSetPage}
                    />
                }

            </div>
        </div>
    );
};

export default VacancyList;