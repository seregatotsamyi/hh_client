import React from 'react';
import { Controller } from 'react-hook-form';
import MaskedInput from "react-input-mask";
import { phoneField } from '../../utils/validators/validators';


const PhoneInput = (control:any) => {

    return (
        <Controller
            name="phone"
            control={control.control}
            defaultValue=""
            rules={phoneField}
            render={({field}) => (
                <MaskedInput
                    mask="+7 (999) 999-99-99"
                    maskChar=""
                    value={field.value}
                    onChange={field.onChange}
                    className="input__input"
                    id="phone"
                    placeholder={"+7 (999) 999-99-99"}
                >
                </MaskedInput>
            )}
        />
    );
};

export default PhoneInput;