import { UserController } from "../controllers/user-controller";
import { goToSignIn } from "../Router";

export const checkUser = async () => {
	try {
		await UserController.getInfo();
	} catch (err) {
		goToSignIn();
	}
};
