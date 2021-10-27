import { renderDOM } from "../../utils/renderDOM";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";

const fieldsData = [
	{
		label: "Имя",
		name: "first_name",
	},
	{
		label: "Фамилия",
		name: "second_name",
	},
	{
		label: "Логин",
		name: "login",
	},
	{
		label: "Почта",
		name: "email",
		type: "email",
	},
	{
		label: "Телефон",
		name: "phone",
		type: "tel",
	},
	{
		label: "Пароль",
		name: "password",
		type: "password",
	},
	{
		label: "Пароль (ещё раз)",
		name: "repeatPassword",
		type: "password",
	},
];

const fields = fieldsData.map((field) => new Input(field));

const button = new Button({
	text: "Зарегистрироваться",
	autoTop: true,
});

const link = new Link({
	href: "../Auth.html",
	text: "Войти",
	className: "card__link",
});

const card = new Card({
	title: "Регистрация",
	button,
	link,
	fields,
});

renderDOM(".render", card);
