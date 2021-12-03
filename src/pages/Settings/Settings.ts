import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ObjectExtension } from "../../utils/objectExtension";
import { storeInstance, globalStore } from "../../store";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { UserController } from "../../controllers/user-controller";

import compileTemplate from "./Settings.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const labels = {
	first_name: "Имя",
	second_name: "Фамилия",
	display_name: "Имя в чате",
	login: "Логин",
	email: "Почта",
	phone: "Телефон",
};

const types = {
	email: "email",
	phone: "tel",
};

const getFields = () =>
	ObjectExtension.keys(labels).map(
		(key) =>
			new Input({
				label: labels[key],
				name: key,
				value: globalStore.user?.[key] ?? "",
				type: key === "phone" || key === "email" ? types[key] : "",
			})
	);

const getCard = () =>
	new Card({
		title: "Редактирование профиля",
		buttonText: "Сохранить",
		fields: getFields(),
		onSubmit: async (data) => {
			await UserController.editProfile(data);
		},
	});

export class Settings extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Settings.EVENTS.FLOW_CDU));

		if (!globalStore.user) {
			await UserController.getInfo();
		}
	}

	render() {
		this.children = {
			card: getCard(),
		};

		return parserDOM(compileTemplate(this.props));
	}
}
