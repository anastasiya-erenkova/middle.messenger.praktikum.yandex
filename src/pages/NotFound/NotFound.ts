import { renderDOM } from "../../utils/renderDOM";
import { Error } from "../../components/Error";

const error = new Error({
	status: 404,
	description: "Не туда попали",
});

renderDOM(".render", error);
