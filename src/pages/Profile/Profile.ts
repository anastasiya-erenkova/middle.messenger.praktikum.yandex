import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Avatar } from "../../components/Avatar";
import { Link } from "../../components/Link";
import { Info } from "../../components/Info";
import { InfoBlock } from "../../components/InfoBlock";
import { Title } from "../../components/Title";

import "./Profile.scss";
import compileTemplate from "./Profile.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const infoFieldsData = [
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
		value: "pochta@yandex.ru",
	},
	{
		label: "Телефон",
		name: "phone",
		value: "+7 (909) 967 30 30",
	},
];

const infoActionData = [
	{
		href: "./settings",
		text: "Изменить данные",
	},
	{
		href: "./password",
		text: "Изменить пароль",
	},
	{
		href: "./",
		text: "Выйти",
		danger: true,
	},
];

const fields = infoFieldsData.map((info) => new Info(info));

const fieldsAction = infoActionData.map(
	(action) =>
		new Info({
			link: new Link(action),
		})
);

const infoBlockData = new InfoBlock({
	fields,
});

const infoBlockAction = new InfoBlock({
	fields: fieldsAction,
});

const avatar = new Avatar({
	className: "profile__avatar",
});

const profileName =
	fields.find((field) => field.props.name === "first_name")?.props.value ?? "";

const name = new Title({
	title: profileName,
	level: 1,
});

export class Profile extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	render() {
		this.children = {
			avatar,
			name,
			infoBlockData,
			infoBlockAction,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
