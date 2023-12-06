export const emailField = {
    pattern: {
        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Недопустимый формат"
    }
}
export const emailFieldRequired = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Недопустимый формат"
    }
}

export const requiredField = {
    required: "Поле обязательно для заполнение"
}

export const loginField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
        message: 'Может содержать только буквы, цифры, символ "_"'
    }
}

export const phoneField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^((\+7|7|8)+([0-9]){10})$/,
        message: "Недопустимый формат"
    }
}

export const passwordField = {
    required: "Поле обязательно для заполнение",
    // pattern: {
    //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/,
    //     message: "Пароль должен содержать заглавные и строчные латинские буквы, цифры, спец. символы. Длина от 8 символов"
    // }
}

export const nameField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[a-zA-Zа-яА-ЯёЁ ]+$/g,
        message: "Только буквы"
    },
    minLength: {
        value: 1,
        message: "Минимальная длина 1 символов"
    }
}

export const nameField2 = {
    pattern: {
        value: /^[a-zA-Zа-яА-ЯёЁ ]+$/g,
        message: "Только буквы"
    },
}

export const numberField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[0-9]+$/g,
        message: "Только цифры"
    }
}
