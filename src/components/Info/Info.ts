import { storeInstance } from "../../store";
import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Link } from "../Link";
import compileTemplate from "./Info.pug";
import "./Info.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	label?: string;
	value?: string;
	name?: string;
	link?: Link;
}
export class Info extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Info.EVENTS.FLOW_CDU));
	}

	render() {
		this.children = {
			link: this.props.link,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
