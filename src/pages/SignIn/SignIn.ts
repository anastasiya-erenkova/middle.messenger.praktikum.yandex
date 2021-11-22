import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { UserController } from "../../controllers/user-controller";
import { goToMessenger } from "../../Router";
import { routes } from "../../utils/router";

import compileTemplate from "./SignIn.pug";

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
	href: routes.signUp,
	text: "Нет аккаунта?",
});

const onFormSubmit = async (data: FormData) => {
	try {
		await UserController.signIn(data);
		goToMessenger();
	} catch (err) {
		alert(err.responseText);
	}
};

const card = new Card({
	title: "Вход",
	buttonText: "Войти",
	link,
	fields,
	onSubmit: onFormSubmit,
});

export class SignIn extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		try {
			await UserController.getInfo();
			goToMessenger();
		} catch (err) {}
	}

	render() {
		this.children = {
			card,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
