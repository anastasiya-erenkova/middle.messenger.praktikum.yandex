import { Block } from "../../utils/block";
import compileTemplate from "./Button.pug";

interface Props {
	text: string;
	autoTop?: boolean;
	type?: "button" | "submit";
}

export class Button extends Block<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return compileTemplate(this.props);
	}
}
