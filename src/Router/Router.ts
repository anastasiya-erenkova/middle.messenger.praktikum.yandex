import { ObjectExtension } from "../utils/objectExtension";
import router, { routes } from "../utils/router";
import { Main } from "../pages/Main";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { Password } from "../pages/Password";
import { NotFound } from "../pages/NotFound";
import { Error } from "../pages/Error";
import { Messenger } from "../pages/Messenger";

const routesComponents = {
	[routes.main]: Main,
	[routes.signIn]: SignIn,
	[routes.signUp]: SignUp,
	[routes.profile]: Profile,
	[routes.settings]: Settings,
	[routes.password]: Password,
	[routes.notFound]: NotFound,
	[routes.error]: Error,
	[routes.messenger]: Messenger,
};

ObjectExtension.keys(routesComponents).forEach((key) => {
	router.use(key, routesComponents[key]);
});

router.start();

export const goToSignIn = () => router.go(routes.signIn);
export const goToMessenger = () => router.go(routes.messenger);
export const goToProfile = () => router.go(routes.profile);
export const goTo = (path: string) => router.go(path);
