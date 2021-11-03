declare module "*.pug" {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function compileFn(props: any): string;
	export default compileFn;
}
