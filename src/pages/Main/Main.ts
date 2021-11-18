import { Component, ComponentProps } from "../../utils/component";
import { checkUser } from "../../helpers/checkUser";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

export class Main extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		await checkUser();
	}

	render() {
		const main = document.createElement("div");
		return main;
	}
}
