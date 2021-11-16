import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { onFormSubmit } from "../../helpers/onFormSubmit";
import { checkValidation, getErrorText, FIELD_NAME } from "../../helpers/input";

import { Button } from "../Button";
import { Link } from "../Link";
import { Input } from "../Input";
import { Title } from "../Title";

import compileTemplate from "./Card.pug";
import "./Card.scss";

interface Props extends Partial<HTMLFormElement>, ComponentProps {
	title: string;
	buttonText: string;
	fields: Input[];
	link?: Link;
}

export class Card extends Component<Props> {
	constructor(props: Props) {
		const events = {
			submit(e: SubmitEvent) {
				e.preventDefault();
				props.fields.forEach((field) => {
					// @TODO Исправить типизацию
					checkValidation(field.props.name, field.props.value, e.target?.elements);
				});

				if (props.fields.every((element) => !element.props.invalid)) {
					onFormSubmit(e);
				}
			},
		};

		super({ ...props, events });
	}

	render() {
		this.children = {
			fields: this.props.fields,
			link: this.props.link,
			title: new Title({ level: 2, title: this.props.title }),
			button: new Button({
				text: this.props.buttonText,
				autoTop: true,
			}),
		};

		// @TODO перенести установку events в компонент Input
		this.props.fields.forEach((field) => {
			field.setProps({
				events: {
					blur(e) {
						// @TODO исправить типизацию
						const isValid = checkValidation(
							(e.target as HTMLInputElement).name,
							(e.target as HTMLInputElement).value,
							(e.target as HTMLInputElement).form?.elements
						);

						field.setProps({
							invalid: !isValid,
							errorText: !isValid
								? getErrorText(field.props.name as FIELD_NAME)
								: null,
							// Иначе значение пропадает при перерисовке (валидный/не валидный)
							value: (e.target as HTMLInputElement).value ?? "",
						});
					},
					focus() {
						if (field.props.invalid) {
							field.setProps({
								invalid: false,
								errorText: null,
							});

							// @TODO исправить типизацию
							const htmlInputComponents = field.getContent() as HTMLInputElement;
							const htmlInput = htmlInputComponents.querySelector("input");
							htmlInputComponents.focus();

							if (htmlInput) {
								htmlInput.value = "";
								htmlInput.value = field.props.value ?? "";
							}
						}
					},
				},
			});
		});

		return parserDOM(compileTemplate(this.props));
	}
}
