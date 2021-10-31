import { renderDOM } from "../../utils/renderDOM";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

const fieldsData = [
	{
		label: "Имя",
		name: "first_name",
		value: "Иван",
	},
	{
		label: "Фамилия",
		name: "second_name",
		value: "Иванов",
	},
	{
		label: "Имя в чате",
		name: "display_name",
		value: "Ванюша",
	},
	{
		label: "Логин",
		name: "login",
		value: "ivanivanov",
	},
	{
		label: "Почта",
		name: "email",
		type: "email",
		value: "pochta@yandex.ru",
	},
	{
		label: "Телефон",
		name: "phone",
		type: "tel",
		value: "+7(909)9673030",
	},
];

const fields = fieldsData.map((field) => new Input(field));

const card = new Card({
	title: "Редактирование профиля",
	buttonText: "Сохранить",
	fields,
});

renderDOM(".render", card);
