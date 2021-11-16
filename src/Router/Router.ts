import { ObjectExtension } from "../utils/objectExtension";
import { Router, NOT_FOUND_PATH } from "../utils/router";
import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { Password } from "../pages/Password";
import { NotFound } from "../pages/NotFound";
import { Error } from "../pages/Error";
import { Messenger } from "../pages/Messenger";

const routes = {
	["/"]: SingIn,
	["/sing-in"]: SingIn,
	["/sing-up"]: SingUp,
	["/profile"]: Profile,
	["/settings"]: Settings,
	["/password"]: Password,
	[NOT_FOUND_PATH]: NotFound,
	["/error"]: Error,
	["/messenger"]: Messenger,
};

const router = new Router(".app");

ObjectExtension.keys(routes).forEach((key) => {
	router.use(key, routes[key]);
});

router.start();
