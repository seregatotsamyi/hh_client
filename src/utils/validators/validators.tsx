export const emailField = {
    pattern: {
        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Недопустимый формат"
    },
    maxLength: {
        value: 64,
        message: 'Максимум 64 символа'
    },
}
export const emailFieldRequired = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Недопустимый формат"
    },
    maxLength: {
        value: 64,
        message: 'Максимум 64 символа'
    },
}

export const requiredField = {
    required: "Поле обязательно для заполнение"
}

export const loginField = {
    required: 'Поле обязательно для заполнение',
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: 'Может содержать только латинские буквы, цифры, символ "_"'
    },
    maxLength: {
        value: 64,
        message: 'Максимум 64 символа'
    },
    minLength: {
        value: 3,
        message: 'Минимум 3 символа'
    }
}

export const phoneField = {
    required: "Поле обязательно для заполнение",
    maxLength : {
        value: 18,
        message: 'Недопустимый формат'
    },
    minLength : {
        value: 18,
        message: 'Недопустимый формат'
    }
}

export const passwordField = {
    required: "Поле обязательно для заполнение",
    // pattern: {
    //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/,
    //     message: "Пароль должен содержать заглавные и строчные латинские буквы, цифры, спец. символы. Длина от 8 символов"
    // }
    maxLength: {
        value: 128,
        message: 'Максимум 128 символа'
    },
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
    },
    maxLength: {
        value: 64,
        message: 'Максимум 64 символа'
    },
}

export const nameField2 = {
    pattern: {
        value: /^[0-9a-zA-Zа-яА-ЯёЁ]+$/g,
        message: 'Только буквы и сивол'
    },
    maxLength: {
        value: 128,
        message: 'Максимум 128 символа'
    },
}

export const nameCompany = {
    pattern: {
        value: /^[0-9a-zA-Zа-яА-ЯёЁ" ]+$/g,
        message: 'Только буквы и сивол "'
    },
    maxLength: {
        value: 128,
        message: 'Максимум 128 символа'
    },
}

export const numberField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[0-9]+$/g,
        message: "Только цифры"
    }
}
export const numberAgeField = {
    required: "Поле обязательно для заполнение",
    pattern: {
        value: /^[0-9]+$/g,
        message: "Только цифры"
    }
}
