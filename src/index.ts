import * as React from 'react';

type WindowSize = {
	width: number;
	height: number;
};

/**
 * Create a React Hook that retrieves the current window size.
 * @returns {WindowSize}
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
 * @returns {MousePosition}
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
 * @param {string} key
 * @param {any} initial
 * @returns {[string, Dispatch<SetStateAction<string>>]}
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

function useKeyboard(eventHandler: (event: KeyboardEvent) => void) {
	React.useEffect(() => {
		window.addEventListener('keydown', eventHandler);

		return () => window.removeEventListener('keydown', eventHandler);
	});
}

export { useMouse, useWindowSize, useLocalStorage, useKeyboard };
