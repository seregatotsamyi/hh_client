import React from 'react';
import {Controller} from 'react-hook-form';
import {Input} from 'antd';

const AboutInput = (props: any) => {

    const {TextArea} = Input;

    let rules: any = {}

    if (props.required) {
        rules =
            {
                maxLength: {
                    value: 2000,
                    message: 'Максимум 2000 символа'
                },
                required: "Поле обязательно для заполнение",
            }

    } else {
        rules = {
            maxLength: {
                value: 2000,
                message: 'Максимум 2000 символа'
            }
        }
    }

    return (
        <Controller
            name={props.name ? props.name : "about"}
            control={props.control}
            rules={rules}
            render={({field}) => (
                <TextArea {...field}
                          placeholder="Ваш текст"
                          autoSize={{minRows: 2, maxRows: 21}}
                          disabled={props.disabled ? props.disabled : false}
                />
            )}
        />
    );
};

export default AboutInput;