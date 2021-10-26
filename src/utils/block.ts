import { EventBus } from "./eventBus";

interface Meta {
	tagName: string;
	props: object;
}

export class Block<Props extends object> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element: any = null;
	_meta: Meta = null;

	props: Props;
	eventBus: () => EventBus;

	constructor(tagName = "div", props = {} as Props) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

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

	_createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount(oldProps?: Props) {}

	_componentDidUpdate(oldProps: Props, newProps: Props) {
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
		return this._element;
	}

	_render() {
		const block = this.render();
		// Этот небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно не в строку компилировать (или делать это правильно),
		// либо сразу в DOM-элементы возвращать из compile DOM-ноду
		this._element.innerHTML = block;
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

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}
