import React from 'react';
import {Controller} from 'react-hook-form';
import {Input} from 'antd';

const AboutInput = (props: any) => {

    const {TextArea} = Input;

    return (
        <Controller
            name="about"
            control={props.control}
            rules={{
                maxLength: {
                    value: 2000,
                    message: 'Максимум 2000 символа'
                },
            }}
            render={({field}) => (
                <TextArea {...field}
                          placeholder="Заполните этот текст, чтобы о вас больше узнали!"
                          autoSize={{minRows: 2, maxRows: 21}}
                          disabled={props.disabled ? props.disabled : false}
                />
            )}
        />
    );
};

export default AboutInput;