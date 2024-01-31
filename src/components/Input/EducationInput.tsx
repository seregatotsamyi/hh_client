import React from 'react';
import {Select} from "antd";
import {Controller} from "react-hook-form";
import {OptionType} from "../../type/type";
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store/store";

const EducationInput = (props:any) => {

    const optionsEducation = useAppSelector((state: RootState) => state.input.optionsEducation)

    const optionsEducationSet = optionsEducation.map((e: any): OptionType => ({
        value: e.id,
        label: e.education_value,
    }))

    return (
        <Controller
            control={props.control}
            name='education_id'
            rules={{
                required: "Поле обязательно для заполнение",
            }}
            render={({field}) => (
                <>
                    <Select {...field}
                            className={"ant-custom"}
                            options={optionsEducationSet}
                            onChange={(value) => field.onChange(value)}
                    />

                </>
            )}
        />
    );
};

export default EducationInput;