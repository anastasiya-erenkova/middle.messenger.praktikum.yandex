import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

import compileTemplate from "./Password.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

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

export class Password extends Component<Props> {
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
