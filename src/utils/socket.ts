export const createSocket = (userId, chatId, token) => {
	const socket = new WebSocket(
		`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
	);

	socket.addEventListener("close", (event) => {
		if (event.wasClean) {
			console.log("Соединение закрыто чисто");
		} else {
			console.log("Обрыв соединения");
		}

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	});

	socket.addEventListener("error", (event) => {
		console.log("Ошибка", event.message);
	});

	return socket;
};
