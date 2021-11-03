import { renderDOM } from "../../utils/renderDOM";
import { Error } from "../../components/Error";

const error = new Error({
	status: 500,
	description: "Мы уже фиксим",
});

renderDOM(".render", error);
