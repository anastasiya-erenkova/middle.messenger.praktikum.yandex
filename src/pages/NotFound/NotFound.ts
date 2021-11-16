import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Error } from "../../components/Error";

import compileTemplate from "./NotFound.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const error = new Error({
	status: 404,
	description: "Не туда попали",
});

export class NotFound extends Component<Props> {
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
