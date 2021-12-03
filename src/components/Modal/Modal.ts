import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Card } from "../Card";
import { Input } from "../Input";

import compileTemplate from "./Modal.pug";
import "./Modal.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	isOpen?: boolean;
	title: string;
	buttonText: string;
	fields: Input[];
	onSubmit?: any;
}

export class Modal extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		const events = {
			click: (event: Event) => {
				if (!(event.target as HTMLDivElement).closest(".modal__card")) {
					this.setProps({
						isOpen: false,
					});
				}
			},
		};

		this.setProps({
			events,
		});
	}

	render() {
		this.children = {
			card: new Card({
				title: this.props.title,
				isModal: true,
				buttonText: this.props.buttonText,
				fields: this.props.fields,
				onSubmit: this.props.onSubmit,
			}),
		};

		return parserDOM(compileTemplate(this.props));
	}
}
