// import sinon from "sinon";
import { expect } from "chai";
import { ChatsAPI } from "../api/chats-api";

import { ChatsController } from "./chats-controller";
import { globalStore, storeInstance } from "../store";

const sinon = require("sinon");

const MOCK_CHAT = {
	id: 123,
	title: "my-chat",
	unread_count: 15,
};

const MOCK_TOKEN = "MOCK_TOKEN";

describe("Проверка ChatsController", () => {
	afterEach(function () {
		sinon.restore();
		for (const prop in globalStore) {
			storeInstance.setStore(prop, undefined);
		}
	});

	it("Запрос списка чатов и их запись в store", async () => {
		expect(globalStore.chats).to.be.undefined;

		sinon.stub(ChatsAPI, "fetch").callsFake(() => [MOCK_CHAT]);
		await ChatsController.fetch();

		expect(globalStore.chats).to.be.an("array");
		expect(globalStore.chats[0]).to.be.deep.equal(MOCK_CHAT);
	});

	it("Запрос токена и запись в store", async () => {
		expect(globalStore.tokens).to.be.undefined;

		sinon.stub(ChatsAPI, "getToken").callsFake(() => ({ token: MOCK_TOKEN }));
		await ChatsController.getToken(MOCK_CHAT.id);

		expect(globalStore.tokens).to.be.an("object");
		expect(globalStore.tokens[MOCK_CHAT.id]).to.be.equal(MOCK_TOKEN);
	});
});
