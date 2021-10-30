import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Button } from "../Button";
import { Props as LinkProps } from "../Link";
import { Props as InputProps } from "../Input";
import { Title } from "../Title";
import compileTemplate from "./Card.pug";
import "./Card.scss";

interface Props {
	title: string;
	buttonText: string;
	fields: Component<InputProps>[];
	link?: Component<LinkProps>;
}

const events = {
	submit: (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const consoleObject: any = {};

		for (const [key, value] of formData.entries()) {
			consoleObject[key] = value;
		}
		console.log(consoleObject);
	},
};

export class Card extends Component<Props> {
	constructor(props: Props) {
		super({ ...props, events });
	}

	render() {
		const card = parserDOM(compileTemplate(this.props));
		const cardField = card?.querySelector(".card__fields");

		const title = new Title({
			level: 2,
			title: this.props.title,
			className: "card__title",
		});

		cardField?.before(title.getContent());

		const fieldsContent = this.props.fields.map((field) => field.getContent());
		cardField?.append(...fieldsContent);

		const button = new Button({
			text: this.props.buttonText,
			autoTop: true,
		});

		card?.append(button.getContent());

		if (this.props.link) {
			card?.append(this.props.link.getContent());
		}

		return card;
	}
}

// function getPattern
