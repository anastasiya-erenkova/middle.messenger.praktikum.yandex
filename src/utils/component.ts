import { EventBus } from "./eventBus";

type Events = {
	[key: string]: (e: Event) => void;
};

// @TODO TS
type Child = {
	[key: string]: any;
};

export interface ComponentProps {
	events?: Events;
}

// @TODO добавить рендер дочерних компонентов, для возможности использования родительского шаблона для вставки этих компонентов
export abstract class Component<Props extends ComponentProps> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	_element: HTMLElement | null = null;
	abstract render(): HTMLElement | null;

	children?: Child | Child[] = undefined;
	props: Props;
	eventBus: EventBus;

	// @TODO TS
	constructor(props: Props) {
		this.props = this._makePropsProxy(props);

		this.eventBus = new EventBus();

		this._registerEvents(this.eventBus);
		this.eventBus.emit(Component.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this.eventBus.emit(Component.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {
		return;
	}

	_componentDidUpdate(oldProps: Props, newProps: Props) {
		this.componentDidUpdate(oldProps, newProps);
		this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: Props, newProps: Props) {
		return oldProps !== newProps;
	}

	setProps = (nextProps: Partial<Props>) => {
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
			this.addEvents();
		} else if (block) {
			this.removeEvents();
			this.element.replaceWith(block);
			this.element = block;
			this.addEvents();
		}

		this._renderChildren();
	}

	_renderChildren() {
		if (this.children && this.element) {
			for (const [name, value] of Object.entries(this.children)) {
				const replaceData = this.element.querySelectorAll(
					`[data-component=${name}]`
				);

				if (Array.isArray(value)) {
					value.forEach((item, index) => {
						this._replaceChild(replaceData[index], item);
					});
				} else {
					// @TODO TS
					this._replaceChild(replaceData[0], value as Component<any>);
				}
			}
		}
	}

	_replaceChild(childToReplace: Element, child: Component<any>) {
		if (childToReplace && child.element) {
			const componentClassName =
				childToReplace.getAttribute("class")?.split(" ") || [];

			childToReplace.replaceWith(child.getContent());
			child.element.classList.add(...componentClassName);
		}
	}

	getContent() {
		return this.element as Node;
	}

	_makePropsProxy(props: Props) {
		const proxy = new Proxy<Props>(props, {
			get: (target, prop) => {
				const value = target[prop as keyof Props];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set: (target, prop, value) => {
				const oldValue = target[prop as keyof Props];
				target[prop as keyof Props] = value;
				if (oldValue !== value) {
					this.eventBus.emit(Component.EVENTS.FLOW_CDU);
				}
				return true;
			},
			deleteProperty: () => {
				throw new Error("Нет доступа");
			},
		});

		return proxy;
	}

	addEvents() {
		const { events } = this.props;

		if (events) {
			Object.keys(events).forEach((eventKey) =>
				this.element?.addEventListener(eventKey, events[eventKey], true)
			);
		}
	}

	removeEvents() {
		const { events } = this.props;

		if (events) {
			Object.keys(events).forEach((eventKey) =>
				this.element?.removeEventListener(eventKey, events[eventKey], true)
			);
		}
	}

	show() {
		const content = this.getContent() as HTMLElement;
		if (content) {
			content.style.display = "";
		}
	}

	hide() {
		const content = this.getContent() as HTMLElement;
		if (content) {
			content.style.display = "none";
		}
	}
}
