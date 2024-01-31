import React from 'react';
import {Select} from "antd";
import {Controller} from "react-hook-form";
import {OptionType} from "../../type/type";
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store/store";

const SkillsInput = (props: any) => {

    const optionsSpecializations = useAppSelector((state: RootState) => state.input.optionsSpecializations)

    const optionsSpecializationsSet = optionsSpecializations.map((e: any): OptionType => ({
        value: e.id,
        label: e.specialization,
    }))

    return (
        <Controller
            control={props.control}
            name='skills'
            rules={{
                required: "Поле обязательно для заполнение",
            }}

            render={({field}) => (
                <>
                    <Select
                        className={"ant-custom multiply"}
                        labelInValue
                        mode="multiple"
                        onChange={(values) => field.onChange(values.map((i: any) => i.value))}
                        options={optionsSpecializationsSet}
                        filterOption={(input, option?) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />

                </>
            )}
        />
    );
};

export default SkillsInput;