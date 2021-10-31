export const ObjectExtension = {
	keys<T extends object, K extends keyof T>(obj: T): K[] {
		return Object.keys(obj) as K[];
	},
};
