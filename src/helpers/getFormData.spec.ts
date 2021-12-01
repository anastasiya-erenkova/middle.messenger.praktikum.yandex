import { expect } from "chai";
import "jsdom-global/register";
import { getFormData } from "./getFormData";

const TEST_NAME = "Test Name";
const TEST_LOGIN = "Test Login";

const TEST_RESULT = {
	name: TEST_NAME,
	login: TEST_LOGIN,
};

describe("Проверка вспомогательной функции getFormData", () => {
	it("Функция возвращает данные из формы", () => {
		const form = document.createElement("form");

		const inputName = document.createElement("input");
		inputName.setAttribute("name", "name");
		inputName.value = TEST_NAME;

		const inputLogin = document.createElement("input");
		inputLogin.setAttribute("name", "login");
		inputLogin.value = TEST_LOGIN;

		form.append(inputName);
		form.append(inputLogin);

		let result;

		form.onsubmit = (e) => {
			e.preventDefault();
			result = getFormData(e);
		};

		form.submit();

		expect(result).to.deep.equal(TEST_RESULT);
	});
});
