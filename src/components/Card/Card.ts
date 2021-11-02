import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Button } from "../Button";
import { Link } from "../Link";
import { Input } from "../Input";
import { Title } from "../Title";
import { onFormSubmit } from "../../helpers/onFormSubmit";
import compileTemplate from "./Card.pug";
import "./Card.scss";
import { checkValidation, getErrorText, FIELD_NAME } from "../../helpers/input";

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
		const card = parserDOM(compileTemplate(this.props));
		const cardField = card?.querySelector(".card__fields");

		const title = new Title({
			level: 2,
			title: this.props.title,
			className: "card__title",
		});

		cardField?.before(title.getContent());

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
