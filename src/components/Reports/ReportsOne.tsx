import React, {useEffect, useRef, useState} from 'react';
import { requiredField} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import { SubmitHandler, useForm} from "react-hook-form";
import { ReportOneType} from "../../type/type";
import {RootState} from "../../store/store";
import DateRange from "../Input/DateRange";
import {reportOneAC} from "../../store/reportReducer";
import VacancyItemEmp from '../Vacancy/VacancyItemEmp';

const ReportsOne: React.FC = () => {
    const dispatch = useDispatch()

    const flag = useSelector((state: RootState) => state.report.flag)
    const vacancy = useSelector((state: RootState) => state.report.reportOne)

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
        dispatch(reportOneAC(data.post, data.start_date, data.end_date))

    }

    //Data range
    const DataRangeProps = {
        setDateStart,
        setDateEnd
    }

    return (
        <>
            <div className="report__subtitle">
                1) На заданную дату список предприятий, имеющих вакансии по заданной должности;
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={"report__form"}>
                <ul className="login__grid">
                    <li className="login__row">
                        <div className={`login__input input ${errors.post ? "_error" : ""}`}>

                            <div className="input__input-wrap">


                                <label className="input__label" htmlFor="post">
                                    Должность
                                </label>


                                <input className="input__input" id="name"
                                       type="text" {...register("post", requiredField)}/>
                            </div>
                            {
                                errors.post && (
                                    <div className="input__error">
                                        {errors.post.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
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
            <div className="listVacancy">
                <ul className="listVacancy__list _report">
                    {
                        vacancy.length > 0 ? (
                            vacancy.map((item: any) =>
                                <VacancyItemEmp
                                    key={item.id}
                                    name={item.name}
                                    address={item.address.settlement.settlement}
                                    employer={item.name}
                                />
                            )) : ""
                    }
                </ul>
                {/*{*/}
                {/*    vacancy.length > 0 ? (*/}
                {/*        <button className={"btn"} type={"submit"}>Сохранить отчет</button>*/}
                {/*    ) : ""*/}
                {/*}*/}

                {vacancy.length !== 0 ? "" : "Нет вакансий в данный период"}
            </div>

        </>
    );
};

export default ReportsOne;