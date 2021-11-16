import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";

import compileTemplate from "./Avatar.pug";
import "./Avatar.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	url?: string;
}

const DEFAULT_AVATAR_URL = new URL(
	"../../static/avatar.svg",
	import.meta.url
).toString();

export class Avatar extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(
			compileTemplate({
				...this.props,
				url: this.props.url ?? DEFAULT_AVATAR_URL,
			})
		);
	}
}
