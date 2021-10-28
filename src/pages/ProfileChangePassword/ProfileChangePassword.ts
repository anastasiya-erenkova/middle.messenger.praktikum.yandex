import { renderDOM } from "../../utils/renderDOM";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

const fieldsData = [
	{
		label: "Старый пароль",
		name: "oldPassword",
		type: "password",
	},
	{
		label: "Новый пароль",
		name: "newPassword",
		type: "password",
	},
	{
		label: "Повторите новый пароль",
		name: "repeatPassword",
		type: "password",
	},
];

const fields = fieldsData.map((field) => new Input(field));

const card = new Card({
	title: "Смена пароля",
	buttonText: "Сохранить",
	fields,
});

renderDOM(".render", card);
