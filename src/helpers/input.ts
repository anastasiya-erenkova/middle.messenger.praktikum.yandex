import { Props as InputProps } from "../components/Input";

export enum FIELD_NAME {
	first_name = "first_name",
	second_name = "second_name",
	login = "login",
	phone = "phone",
	email = "email",
	password = "password",
	repeatPassword = "repeatPassword",
	oldPassword = "oldPassword",
	newPassword = "newPassword",
}

export interface FormElements extends HTMLFormControlsCollection {
	password: HTMLInputElement;
	newPassword: HTMLInputElement;
}

const REGEX = {
	name: "^[A-ZА-Я]+[a-zа-я\\-]+$",
	login: "^(?=.*[A-Za-z])+[A-Za-z\\d\\-\\_]{3,20}$",
	phone: "^[\\+]?[\\d]{10,15}$",
	email:
		"^[a-z0-9_-]{2,}(\\.[a-z0-9_-]+)*@[a-z0-9_-]{2,}(\\.[a-z0-9_-]{2,})*\\.[a-z]{2,6}$",
	password: "^(?=.*[A-Z])+(?=.*[0-9])+[a-zA-Z\\d_$&+,:;=?@#|'<>.^*()%!-]{8,40}$",
};

const FIELD_ERRORS = {
	name:
		"Первая буква должна быть заглавной, без пробелов и без цифр, допустим только дефис",
	login:
		" От 3 до 20 символов, латиница (минимум одна буква), цифры, допустимы дефис и нижнее подчёркивание",
	phone:
		"От 10 до 15 символов, должен состоять из цифр, может начинается с плюса",
	email:
		"Указан не верный формат e-mail (обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы)",
	password:
		"От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
};

const FIELD_PATTERNS = {
	[FIELD_NAME.first_name]: {
		regex: REGEX.name,
		errorText: FIELD_ERRORS.name,
	},
	[FIELD_NAME.second_name]: {
		regex: REGEX.name,
		errorText: FIELD_ERRORS.name,
	},
	[FIELD_NAME.login]: {
		regex: REGEX.login,
		errorText: FIELD_ERRORS.login,
	},
	[FIELD_NAME.phone]: {
		regex: REGEX.phone,
		errorText: FIELD_ERRORS.phone,
	},
	[FIELD_NAME.email]: {
		regex: REGEX.email,
		errorText: FIELD_ERRORS.email,
	},
	[FIELD_NAME.password]: {
		regex: REGEX.password,
		errorText: FIELD_ERRORS.password,
	},
	[FIELD_NAME.newPassword]: {
		regex: REGEX.password,
		errorText: FIELD_ERRORS.password,
	},
	[FIELD_NAME.newPassword]: {
		regex: REGEX.password,
		errorText: FIELD_ERRORS.password,
	},
};

export function checkValidation(
	name: InputProps["name"],
	value: InputProps["value"],
	elements?: FormElements
) {
	if (name === FIELD_NAME.repeatPassword && elements) {
		const compareValue = Object.prototype.hasOwnProperty.call(
			elements,
			FIELD_NAME.password
		)
			? elements.password.value
			: elements.newPassword.value;
		return value === compareValue;
	}

	return Object.prototype.hasOwnProperty.call(FIELD_PATTERNS, name)
		? !!value?.match(FIELD_PATTERNS[name as keyof typeof FIELD_PATTERNS].regex)
		: true;
}

export function getErrorText(name: FIELD_NAME) {
	if (name === FIELD_NAME.repeatPassword) {
		return "Пароли не совпадают";
	}

	return FIELD_PATTERNS[name as keyof typeof FIELD_PATTERNS].errorText;
}
