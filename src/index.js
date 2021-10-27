import { Button } from "./components/Button";
import { renderDOM } from "./utils/renderDOM";

const button = new Button({
	text: "Click me",
});

// app — это class дива в корне DOM
renderDOM(".app", button);

setTimeout(() => {
	button.setProps({
		text: "Click me, please",
	});
}, 1000);

setTimeout(() => {
	button.setProps({
		text: "Click me, pleaseaaaaaaaaaaaaaaaa",
	});
}, 2000);
