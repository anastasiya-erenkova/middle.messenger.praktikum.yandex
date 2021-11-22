import { UserController } from "../controllers/user-controller";
import { goToMessenger, goToSignIn } from "../Router";

export const checkUser = async () => {
	try {
		await UserController.getInfo();
		// goToMessenger();
	} catch (err) {
		goToSignIn();
	}
};
