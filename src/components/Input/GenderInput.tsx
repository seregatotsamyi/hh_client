import React from 'react';
import {Select} from "antd";
import {Controller} from "react-hook-form";
import {OptionType} from "../../type/type";
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store/store";

const GenderInput = (props:any) => {

    const optionsGender = useAppSelector((state: RootState) => state.input.optionsGender)

    const optionsGenderSet = optionsGender.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))

    return (
        <Controller
            control={props.control}
            name='gender_id'
            rules={{
                required: "Поле обязательно для заполнение",
            }}
            render={({field}) => (
                <>
                    <Select {...field}
                            className={"ant-custom"}
                            options={optionsGenderSet}
                            onChange={(value) => field.onChange(value)}
                    />

                </>
            )}
        />
    );
};

export default GenderInput;