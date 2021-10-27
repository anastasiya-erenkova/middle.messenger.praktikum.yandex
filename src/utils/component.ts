import { EventBus } from "./eventBus";

export class Component<Props extends object> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element: any = null;

	props: Props;
	eventBus: () => EventBus;

	constructor(props: Props) {
		const eventBus = new EventBus();

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Component.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this.eventBus().emit(Component.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {}

	_componentDidUpdate(oldProps: Props, newProps: Props) {
		this.componentDidUpdate(oldProps, newProps);
		this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: Props, newProps: Props) {
		return oldProps !== newProps;
	}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	set element(value) {
		this._element = value;
	}

	_render() {
		const block = this.render();
		if (!this.element) {
			this.element = block;
		} else {
			this.element.replaceWith(block);
			this.element = block;
		}
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
				self.eventBus().emit(Component.EVENTS.FLOW_CDU);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});

		return proxy;
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}
