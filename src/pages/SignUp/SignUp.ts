import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { routes } from "../../utils/router";
import { UserController } from "../../controllers/user-controller";
import { goToMessenger } from "../../Router";

import compileTemplate from "./SignUp.pug";

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
	href: routes.signIn,
	text: "Войти",
});

const onFormSubmit = async (data: FormData) => {
	try {
		await UserController.signUp(data);
		goToMessenger();
	} catch (err) {
		window.alert(err.responseText);
	}
};

const card = new Card({
	title: "Регистрация",
	buttonText: "Зарегистрироваться",
	link,
	fields,
	onSubmit: onFormSubmit,
});

export class SignUp extends Component<Props> {
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
