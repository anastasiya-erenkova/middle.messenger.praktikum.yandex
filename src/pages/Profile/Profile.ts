import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ObjectExtension } from "../../utils/objectExtension";
import { UserController } from "../../controllers/user-controller";
import { storeInstance, globalStore } from "../../store";
import { Avatar } from "../../components/Avatar";
import { Link } from "../../components/Link";
import { Info } from "../../components/Info";
import { InfoBlock } from "../../components/InfoBlock";
import { Title } from "../../components/Title";

import "./Profile.scss";
import compileTemplate from "./Profile.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const labels = {
	first_name: "Имя",
	second_name: "Фамилия",
	display_name: "Имя в чате",
	login: "Логин",
	email: "Почта",
	phone: "Телефон",
};

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
		events: {
			click: async () => {
				UserController.logout();
			},
		},
	},
];

const getFields = () =>
	ObjectExtension.keys(labels).map(
		(key) =>
			new Info({
				label: labels[key],
				name: key,
				value: globalStore.user ? globalStore.user[key] : "",
			})
	);

const fieldsAction = infoActionData.map(
	(action) =>
		new Info({
			link: new Link(action),
		})
);

const getInfoBlockData = () =>
	new InfoBlock({
		fields: getFields(),
	});

const infoBlockAction = new InfoBlock({
	fields: fieldsAction,
});

const avatar = new Avatar({});

const getName = () =>
	new Title({
		title: globalStore.user ? globalStore.user["first_name"] : "",
		level: 1,
	});

export class Profile extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Profile.EVENTS.FLOW_CDU));

		if (!globalStore.user) {
			await UserController.getInfo();
		}
	}

	render() {
		this.children = {
			avatar,
			name: getName(),
			infoBlockData: getInfoBlockData(),
			infoBlockAction,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
