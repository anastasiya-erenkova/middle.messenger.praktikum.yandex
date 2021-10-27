import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Props as ButtonProps } from "../Button";
import { Props as LinkProps } from "../Link";
import { Props as InputProps } from "../Input";
import compileTemplate from "./Card.pug";
import "./Card.scss";

interface Props {
	title: string;
	fields: Component<InputProps>[];
	button: Component<ButtonProps>;
	link?: Component<LinkProps>;
}

export class Card extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const card = parserDOM(compileTemplate(this.props));
		const cardField = card?.querySelector(".card__fields");

		const fieldsContent = this.props.fields.map((field) => field.getContent());
		cardField?.append(...fieldsContent);

		card?.append(this.props.button.getContent());

		if (this.props.link) {
			card?.append(this.props.link.getContent());
		}

		return card;
	}
}
