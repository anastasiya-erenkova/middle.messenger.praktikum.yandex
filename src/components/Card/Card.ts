import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { getFormData } from "../../helpers/getFormData";
import {
	checkValidation,
	getErrorText,
	FIELD_NAME,
	FormElements,
} from "../../helpers/input";

import { Button } from "../Button";
import { Link } from "../Link";
import { Input } from "../Input";
import { Title } from "../Title";

import compileTemplate from "./Card.pug";
import "./Card.scss";

interface Props extends Partial<HTMLFormElement>, ComponentProps {
	title: string;
	isModal?: boolean;
	buttonText: string;
	fields: Input[];
	link?: Link;
	onSubmit: (data: object, e?: Event) => void;
}

export class Card extends Component<Props> {
	constructor(props: Props) {
		const events = {
			submit(e: SubmitEvent) {
				e.preventDefault();
				props.fields.forEach((field) => {
					// @TODO Исправить типизацию
					checkValidation(
						field.props.name,
						field.props.value,
						(e.target as HTMLFormElement)?.elements as FormElements
					);
				});

				if (props.fields.every((element) => !element.props.invalid)) {
					const data = getFormData(e);
					props.onSubmit(data, e);
				}
			},
		};

		const hasFile = props.fields.some((element) => element.props.type === "file");

		super({ ...props, hasFile, events });
	}

	render() {
		this.children = {
			fields: this.props.fields,
			link: this.props.link,
			title: new Title({
				level: this.props.isModal ? 3 : 2,
				title: this.props.title,
			}),
			button: new Button({
				text: this.props.buttonText,
				autoTop: true,
			}),
		};

		// @TODO перенести установку events в компонент Input
		this.props.fields.forEach((field) => {
			field.setProps({
				events: {
					...field.props.events,
					blur(e) {
						if (field.props.type !== "file") {
							// @TODO исправить типизацию
							const isValid = checkValidation(
								(e.target as HTMLInputElement).name,
								(e.target as HTMLInputElement).value,
								(e.target as HTMLInputElement).form?.elements as FormElements
							);

							field.setProps({
								invalid: !isValid,
								errorText: !isValid
									? getErrorText(field.props.name as FIELD_NAME)
									: null,
								// Иначе значение пропадает при перерисовке (валидный/не валидный)
								value: (e.target as HTMLInputElement).value ?? "",
							});
						}
					},
					focus() {
						if (field.props.invalid && field.props.type !== "file") {
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
