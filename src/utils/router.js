import { renderDOM } from "./renderDOM";

function isEqual(lhs, rhs) {
	return lhs === rhs;
}

export const routes = {
	main: "/",
	signIn: "/sign-in",
	signUp: "/sign-up",
	profile: "/profile",
	settings: "/settings",
	password: "/password",
	notFound: "/not-found",
	error: "/error",
	messenger: "/messenger",
};

// @TODO TS
class Route {
	constructor(pathname, view, props) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass();
			renderDOM(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
		// renderDOM(this._props.rootQuery, this._block);
	}
}

export class Router {
	constructor(rootQuery) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname, block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname) {
		const route = this.getRoute(pathname);

		if (!route) {
			this.go(routes.notFound);
			return;
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render(route, pathname);
	}

	go(pathname) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname) {
		const currentRoute = this.routes.find((route) => route.match(pathname));
		return currentRoute;
	}
}
