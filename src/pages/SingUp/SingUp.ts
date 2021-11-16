import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";

import compileTemplate from "./SingUp.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

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

const link = new Link({
	href: "./sing-in",
	text: "Войти",
});

const card = new Card({
	title: "Регистрация",
	buttonText: "Зарегистрироваться",
	link,
	fields,
});

export class SingUp extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	render() {
		this.children = {
			card,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
