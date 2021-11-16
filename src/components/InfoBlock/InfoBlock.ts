import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Info } from "../Info";

import compileTemplate from "./InfoBlock.pug";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	fields: Info[];
}

export class InfoBlock extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		this.children = {
			fields: this.props.fields,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
