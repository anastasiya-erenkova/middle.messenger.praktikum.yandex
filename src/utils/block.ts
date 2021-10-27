import { EventBus } from "./eventBus";

export class Block<Props extends object> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_templateElement: any = null;
	_element: any = null;

	props: Props;
	eventBus: () => EventBus;

	constructor(props = {} as Props) {
		const eventBus = new EventBus();

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this._createTemplateElement();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(oldProps?: Props) {}

	_componentDidUpdate(oldProps: Props, newProps: Props) {
		console.log("_componentDidUpdate");
		this.componentDidUpdate(oldProps, newProps);
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: Props, newProps: Props) {
		return true;
	}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		// TODO
		// return this._element;
		return this._templateElement;
	}

	_render() {
		console.log("render");
		const block = this.render();

		console.log(block);
		this._templateElement.innerHTML = "";
		this._templateElement.innerHTML = block;
		this._element = this._templateElement.firstElementChild;
	}

	// Может переопределять пользователь, необязательно трогать
	render() {}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: Props) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;

		const proxy = new Proxy<Props>(props, {
			get(target, prop) {
				const value = target[prop as keyof Props];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop as keyof Props] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});

		return proxy;
	}

	_createTemplateElement() {
		this._templateElement = document.createElement("div");
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}
