import * as React from 'react';

type WindowSize = {
	width: number;
	height: number;
};

/**
 * Create a React Hook that retrieves the current window size.
 * @returns {WindowSize} A object with the width and height of the window
 */
function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = React.useState<WindowSize>({
		width: 0,
		height: 0,
	});

	React.useEffect(() => {
		function handleWindowResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		handleWindowResize();

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return windowSize;
}

type MousePosition = {
	x: number;
	y: number;
};

/**
 * Create a React Hook that retrieves the current mouse position.
 * @returns {MousePosition} A object with the x and y position of the mouse
 */
function useMouse(): MousePosition {
	const [mousePosition, setMousePosition] = React.useState<MousePosition>({
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		function handleMouseMovement(event: MouseEvent) {
			setMousePosition({ x: event.clientX, y: event.clientY });
		}
		window.addEventListener('mousemove', handleMouseMovement);

		return () => {
			window.removeEventListener('mousemove', handleMouseMovement);
		};
	}, []);

	return mousePosition;
}

/**
 * Create a React Hook that retrieves a item inside Local Storage or create one. On change update Local Storage item.
 * @param {string} key String with the localStorage key
 * @param {string} initial The initial value of the localStorage if it doesn't exist.
 * @returns {[string, Dispatch<SetStateAction<string>>]} An array with the state containing the data of the localStorage, along with a function to change it
 */
function useLocalStorage(
	key: string,
	initial: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
	const [data, setData] = React.useState(() => {
		const local = window.localStorage.getItem(key);
		return local ? local : initial;
	});

	React.useEffect(() => {
		window.localStorage.setItem(key, data);
	}, [key, data]);

	return [data, setData];
}

/**
 * Create a React Hook that listens to keyboard actions and executes a function defined through the params.
 * @param {KeyboardEvent} eventHandler Function that receive the KeyboardEvent and do some logic
 */
function useKeyboard(eventHandler: (event: KeyboardEvent) => void) {
	React.useEffect(() => {
		window.addEventListener('keydown', eventHandler);

		return () => window.removeEventListener('keydown', eventHandler);
	});
}

/**
 * Create a React Hook that return a boolean state and a function to change the state.
 * @param {boolean} defaultValue The default value of the boolean state
 * @returns {[boolean, (value:boolean) => void]} An array with the state containing the boolean value, along with a function to change it
 */
function useToggle(defaultValue: boolean): [boolean, (value: boolean) => void] {
	const [toggle, setToggle] = React.useState(defaultValue);

	function changeToggle(value: boolean | null) {
		setToggle((prev) => (typeof value === 'boolean' ? value : !prev));
	}

	return [toggle, changeToggle];
}

/**
 * Create a timeout that executes a function after a delay. Can be reset or cleared
 * @param {any} callback Function to be executed after timeout
 * @param {any} delay Delay for the function execution
 * @returns {object} A object with the reset and clear functions
 */
function useTimeout(callback: () => void, delay: number): { reset: () => void; clear: () => void } {
	const callbackRef = React.useRef(callback);
	const timeoutRef = React.useRef<NodeJS.Timeout>();

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = React.useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = React.useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	React.useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = React.useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}

/**
 * Create a useTimeout function that is reset after the dependencies are reset
 * @param {() => void} callback Function to be executed after some delay over dependencies
 * @param {number} delay Delay for the function execution
 * @param {any} dependencies Dependencies that reset the delay timer
 */
function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
	const { reset, clear } = useTimeout(callback, delay);
	React.useEffect(reset, [...dependencies, reset]);
	React.useEffect(clear, []);
}

/**
 * Execute a function from the first update of a value in dependencies
 * @param {any} callback Function to be executed after some delay over dependencies
 * @param {any} dependencies Dependencies that reset the delay timer
 */
function useUpdateEffect(callback: () => void, dependencies: any[]): void {
	const isFirstRender = React.useRef(true);

	React.useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		return callback();
	}, dependencies);
}

type ArrayControl = {
	clear: () => void;
	push: (value: any) => void;
	remove: (index: number) => void;
	update: (index: number, value: any) => void;
	filter: (filter: () => boolean) => void;
};
/**
 * A Better way to create a piece of state with a array
 * @param {any[]} defaultValue The default array model
 * @returns {[any[], ArrayControl]} Return a state of an array and an object to modify it
 */
function useArray(defaultValue?: any[]): [any[], ArrayControl] {
	const [array, setArray] = React.useState(defaultValue ? defaultValue : []);

	const arrayControl: ArrayControl = {
		clear: () => setArray([]),
		push: (value: any) => setArray((prev) => [...prev, value]),
		remove: (index: number) => {
			setArray((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length - 1)]);
		},
		update: (index: number, value: any) => {
			setArray((prev) => [...prev.slice(0, index), value, ...prev.slice(index + 1, prev.length - 1)]);
		},
		filter: (filter: () => boolean) => setArray((prev) => prev.filter(filter)),
	};

	return [array, arrayControl];
}

type Scroll = {
	number: number;
	percentage: number;
};

/**
 * Create a state that stores the scroll position of the page
 * @returns {Scroll}
 */
function useScroll(): Scroll {
	const [scroll, setScroll] = React.useState<Scroll>({ number: 0, percentage: 0 });

	function handleScroll() {
		const percentage = Math.round((window.scrollY / window.innerHeight) * 100) / 100;
		setScroll({ number: window.scrollY, percentage: percentage });
	}

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return scroll;
}

function useStateWithHistory<t>(
	defaultValue: t,
	{ capacity = 10 } = {}
): [
	t,
	(value: t | ((prev: t) => t)) => void,
	{ history: t[]; pointer: number; back: () => void; forward: () => void; goTo: (index: number) => void }
] {
	const [value, setValue] = React.useState<t>(defaultValue);
	const historyRef = React.useRef([value]);
	const pointerRef = React.useRef(0);

	const set = React.useCallback(
		(setValueParam: t | ((prev: t) => t)) => {
			//@ts-ignore
			const resolvedValue = typeof setValueParam === 'function' ? setValueParam(value) : setValueParam;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1)
					historyRef.current.splice(pointerRef.current + 1);

				historyRef.current.push(resolvedValue);

				while (historyRef.current.length > capacity) {
					historyRef.current.shift();
				}

				pointerRef.current = historyRef.current.length - 1;
			}

			setValue(resolvedValue);
		},
		[capacity, value]
	);

	const forward = React.useCallback(() => {
		if (pointerRef.current < historyRef.current.length - 1) {
			pointerRef.current++;
			setValue(historyRef.current[pointerRef.current]);
		}
	}, []);

	const back = React.useCallback(() => {
		if (pointerRef.current > 0) {
			pointerRef.current--;
			setValue(historyRef.current[pointerRef.current]);
		}
	}, []);

	const goTo = React.useCallback((index: number) => {
		if (index > 0 && index < historyRef.current.length - 1) {
			pointerRef.current = index;
			setValue(historyRef.current[pointerRef.current]);
		}
	}, []);

	return [value, set, { history: historyRef.current, pointer: pointerRef.current, back, forward, goTo }];
}

type PageSystem = Record<string, React.ReactNode>;
/**
 * A custom React hook for managing a single active page from a system of pages.
 *
 * @template T - The type of the page system, which is an object where keys are page names
 * and values are React components (React nodes).
 *
 * @param {T} pageSystem - The object representing the system of pages.
 * @param {keyof T | null} [defaultPage=null] - The optional default page to set initially.
 * @returns {readonly [() => React.ReactNode | null, React.Dispatch<React.SetStateAction<keyof T | null>>]}
 * A tuple containing a setter function to set the active page and a function to get the active page.
 *
 * @example
 * // Define a page system.
 * const pageSystem = {
 *   default: <DefaultPage />,
 *   list: <ListPage />,
 *   data: <DataPage />,
 * };
 *
 * // Use the hook to manage the active page with a default of 'default'.
 * const [GetPage, setPage] = useSinglePage(pageSystem, 'default');
 *
 * // Set the active page to 'list'.
 * setPage('list');
 *
 * // Get the active page component.
 * return (
 * 		<div>
 * 			<GetPage />
 * 		</div>
 * );
 */
function useSinglePage<T extends PageSystem>(
	pageSystem: T,
	defaultPage: keyof T | null = null
): readonly [() => React.ReactNode | null, React.Dispatch<React.SetStateAction<keyof T | null>>] {
	const [page, setPage] = React.useState<keyof T | null>(defaultPage);

	function GetPage(): React.ReactNode | null {
		return page !== null ? pageSystem[page] : null;
	}

	return [GetPage, setPage] as const;
}

export {
	useMouse,
	useWindowSize,
	useLocalStorage,
	useKeyboard,
	useToggle,
	useTimeout,
	useDebounce,
	useUpdateEffect,
	useArray,
	useScroll,
	useStateWithHistory,
	useSinglePage,
};
