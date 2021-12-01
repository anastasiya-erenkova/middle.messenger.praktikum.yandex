import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ObjectExtension } from "../../utils/objectExtension";
import { storeInstance, globalStore } from "../../store";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { UserController } from "../../controllers/user-controller";

import compileTemplate from "./Password.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const labels = {
	oldPassword: "Старый пароль",
	newPassword: "Новый пароль",
	repeatPassword: "Повторите новый пароль",
};

const getFields = () =>
	ObjectExtension.keys(labels).map(
		(key) =>
			new Input({
				label: labels[key],
				name: key,
				value: globalStore.user?.[key] ?? "",
				type: "password",
			})
	);

const getCard = () =>
	new Card({
		title: "Смена пароля",
		buttonText: "Сохранить",
		fields: getFields(),
		onSubmit: async (data) => {
			const sendData = {
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			};
			await UserController.editPassword(sendData);
		},
	});

export class Password extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Password.EVENTS.FLOW_CDU));

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
