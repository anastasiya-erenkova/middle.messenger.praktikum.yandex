import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Error as ErrorComponent } from "../../components/Error";

import compileTemplate from "./Error.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const error = new ErrorComponent({
	status: 500,
	description: "Мы уже фиксим",
});

export class Error extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	render() {
		this.children = {
			error,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
