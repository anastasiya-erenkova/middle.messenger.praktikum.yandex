import { Component, ComponentProps } from "../../utils/component";
import { Info } from "../Info";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	fields: Info[];
}

export class InfoBlock extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const infoBlock = document.createElement("div");
		infoBlock.classList.add("info-block");

		const fieldsContent = this.props.fields.map((field) => field.getContent());
		infoBlock.append(...fieldsContent);

		return infoBlock;
	}
}
