import { expect } from "chai";
import { globalStore, storeInstance } from "./store";

describe("Проверка store", () => {
	afterEach(function () {
		for (const prop in globalStore) {
			storeInstance.setStore(prop, undefined);
		}
	});

	it("Метод setStore записывает данные в store", () => {
		expect(globalStore.chats).to.be.undefined;

		storeInstance.setStore("chats", [{ id: 1 }]);

		expect(globalStore.chats).to.be.an("array");
		expect(globalStore.chats[0].id).to.equal(1);
	});
});
