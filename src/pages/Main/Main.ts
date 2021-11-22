import { Component, ComponentProps } from "../../utils/component";
import { checkUser } from "../../helpers/checkUser";
import { goToMessenger } from "../../Router";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

export class Main extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		try {
			await checkUser();
			goToMessenger();
		} catch (err) {}
	}

	render() {
		const main = document.createElement("div");
		return main;
	}
}
