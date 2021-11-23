import { expect } from "chai";
import { globalStore, storeInstance } from "./store";

describe("Проверка store", () => {
	it("Метод setStore записывает данные в store", () => {
		expect(globalStore.chats).to.be.undefined;
		storeInstance.setStore("chats", [{ id: 1 }]);
		expect(globalStore.chats).to.be.an("array");
	});
});
