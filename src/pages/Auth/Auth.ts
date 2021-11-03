import { renderDOM } from "../../utils/renderDOM";
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

const link = new Link({
	href: "../Registration/Registration.html",
	text: "Нет аккаунта?",
	className: "card__link",
});

const card = new Card({
	title: "Вход",
	buttonText: "Войти",
	link,
	fields,
});

renderDOM(".render", card);
