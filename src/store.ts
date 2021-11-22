type AppStore = {
	[key: string]: any;
};

class Store {
	private store: AppStore;
	callbacks: any[];

	constructor(store: AppStore = {}) {
		this.store = this._makeStoreProxy(store);
		this.callbacks = [];
	}

	private _makeStoreProxy = (props: any) => {
		const proxyProps = new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return value;
			},
			set: (target, prop, value) => {
				target[prop] = value;
				this.notify();
				return true;
			},
			deleteProperty() {
				throw new Error("Access is denied!");
			},
		});

		return proxyProps;
	};

	subsribe(callback: any) {
		if (!this.callbacks.includes(callback)) {
			this.callbacks.push(callback);
		}
		// @TODO исправить проблему подписок компонентов, которые размонтированны или заменены
		// console.log(this.callbacks);
	}

	notify() {
		this.callbacks.forEach((callback) => {
			callback();
		});
	}

	setStore(prop: string, data: any) {
		this.store[prop] = data;
	}

	get globalStore() {
		return this.store;
	}
}

export const storeInstance = new Store();

export const globalStore = storeInstance.globalStore;
