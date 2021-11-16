import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";

import compileTemplate from "./SingIn.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

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
	href: "./sing-up",
	text: "Нет аккаунта?",
});

const card = new Card({
	title: "Вход",
	buttonText: "Войти",
	link,
	fields,
});

export class SingIn extends Component<Props> {
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
