import { storeInstance } from "../../store";
import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Title.pug";
import "./Title.scss";

export interface Props extends Partial<HTMLHeadingElement>, ComponentProps {
	title: string;
	level?: number;
}

export class Title extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Title.EVENTS.FLOW_CDU));
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
