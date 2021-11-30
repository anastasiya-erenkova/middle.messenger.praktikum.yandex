// import { expect } from "chai";
// import { Button } from "./";

// require("jsdom-global")();

// describe("Проверка шаблонизатора компонента Button", () => {
// 	const BUTTON_TEXT = "buttonText";
// 	const BUTTON_TYPE = "submit";

// 	const button = new Button({
// 		text: BUTTON_TEXT,
// 		type: BUTTON_TYPE,
// 	});

// 	it("Button содержит текст, переданный в props", () => {
// 		expect((button.getContent() as HTMLElement).innerText).to.be.a(BUTTON_TEXT);
// 	});

// 	it("Button имеет тип, переданный в props", () => {
// 		expect((button.getContent() as HTMLElement).getAttribute("type")).to.be.a(
// 			BUTTON_TYPE
// 		);
// 	});
// });

// TSError: ⨯ Unable to compile TypeScript:
// src/components/Button/Button.ts:3:29 - error TS2307: Cannot find module './Button.pug' or its corresponding type declarations.

// 3 import compileTemplate from "./Button.pug";
