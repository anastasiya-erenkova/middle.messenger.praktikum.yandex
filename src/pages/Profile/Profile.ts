import { renderDOM } from "../../utils/renderDOM";
import { Avatar } from "../../components/Avatar";
import { Link } from "../../components/Link";
import { Info } from "../../components/Info";
import { InfoBlock } from "../../components/InfoBlock";
import { Title } from "../../components/Title";
import "./Profile.scss";

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
		href: "../ProfileEdit/ProfileEdit.html",
		text: "Изменить данные",
	},
	{
		href: "../ProfileChangePassword/ProfileChangePassword.html",
		text: "Изменить пароль",
	},
	{
		href: "../../index.html",
		text: "Выйти",
		danger: true,
	},
];

const fields = infoFieldsData.map((info) => new Info(info));

const fieldsAction = infoActionData.map(
	(action) =>
		new Info({
			link: new Link({
				...action,
				className: "info-link__label",
			}),
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
	className: "profile__name",
});

renderDOM(".render", avatar, name, infoBlockData, infoBlockAction);
