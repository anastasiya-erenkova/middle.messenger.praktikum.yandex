// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ListenerArgs = any;
type Listener = (...args: ListenerArgs) => void;

interface Listeners {
	[key: string]: Listener[];
}

export class EventBus {
	private listeners: Listeners;

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: Listener) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: Listener) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	emit(event: string, ...args: ListenerArgs) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function (listener) {
			listener(...args);
		});
	}
}
