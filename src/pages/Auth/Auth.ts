import { renderDOM } from "../../utils/renderDOM";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";

const fieldsData = [
	{
		label: "Логин",
		name: "login",
	},
	{
		label: "Пароль",
		name: "password",
		type: "password",
	},
];

const fields = fieldsData.map((field) => new Input(field));

const button = new Button({
	text: "Войти",
	autoTop: true,
});

const link = new Link({
	href: "./Registration.html",
	text: "Нет аккаунта?",
	className: "card__link",
});

const card = new Card({
	title: "Вход",
	button,
	link,
	fields,
});

renderDOM(".auth", card);
