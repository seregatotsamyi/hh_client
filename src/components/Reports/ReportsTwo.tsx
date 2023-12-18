import React, {useEffect, useRef, useState} from 'react';
import {requiredField} from "../../utils/validators/validators";
import DateRange from "../Input/DateRange";
import VacancyItemEmp from "../Vacancy/VacancyItemEmp";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReportOneType} from "../../type/type";
import {reportOneAC, reportTwoAC} from "../../store/reportReducer";

const ReportsTwo: React.FC = () => {

    const dispatch = useDispatch()

    const flag = useSelector((state: RootState) => state.report.flag)
    const postName = useSelector((state: RootState) => state.report.reportTwo.name)
    const postCount = useSelector((state: RootState) => state.report.reportTwo.count)


    const [dateStart, setDateStart] = useState<string | null>(null);
    const [dateEnd, setDateEnd] = useState<string | null>(null);
    const {
        register, handleSubmit,
        formState: {errors}, control,
        clearErrors,
        setError
    } = useForm<ReportOneType>()


    const fetchRef = useRef(0);

    useEffect(() => {
        if (dateStart !== null || dateEnd !== null || dateStart !== "" || dateEnd !== "") {
            clearErrors("start_date")
        }

    }, [dateStart, flag])
    const onSetError = () => {
        setError("start_date", {
            type: "manual",
            message: "Укажите дату",
        })
    }

    const onSubmit: SubmitHandler<ReportOneType> = (data) => {
        if (dateStart === null || dateEnd === null || dateStart === "" || dateEnd === "") {
            onSetError()
            return
        }
        data.start_date = dateStart
        data.end_date = dateEnd
        dispatch(reportTwoAC(data.start_date, data.end_date))
    }

    //Data range
    const DataRangeProps = {
        setDateStart,
        setDateEnd
    }

    return (
        <>
            <div className="report__subtitle">
                2) Название должности, на которую за заданный период было
                предложено максимальное количество вакансий;
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={"report__form"}>
                <ul className="login__grid">
                    <li className="login__row">
                        <div className={"create__date"}>


                            <DateRange {...DataRangeProps}/>

                            {
                                errors.start_date && (
                                    <div className="input__error">
                                        {errors.start_date.message}
                                    </div>
                                )

                            }
                        </div>
                    </li>

                </ul>
                <button className={"btn report__btn"} type={"submit"}>Получить отчет</button>
            </form>
            <div className={"report__two-text"}>
                {postName ? (`${postName}, встречается ${postCount} раз(а)`) : "Нет вакансий в данный период"}
            </div>

        </>
    );
};

export default ReportsTwo;