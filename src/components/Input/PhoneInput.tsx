import React from 'react';
import {Controller} from 'react-hook-form';
import MaskedInput from "react-input-mask";
import {phoneField} from '../../utils/validators/validators';


const PhoneInput = (props: any) => {

    return (
        <Controller
            name="phone"
            control={props.control}
            defaultValue=""
            rules={phoneField}
            render={({field}) => (
                <MaskedInput
                    mask="+7 (999) 999-99-99"
                    maskChar=""
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    className="input__input"
                    id="phone"
                    placeholder={"+7 (999) 999-99-99"}
                    disabled={props.disabled ? props.disabled : false}
                >
                </MaskedInput>
            )}
        />
    );
};

export default PhoneInput;