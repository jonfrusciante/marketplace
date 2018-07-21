import * as React from 'react';

interface ButtonProps {
	color?: string;
	chilren?: string;
	background?: string;
	size?: string;
}

class Button extends React.Component<ButtonProps, {}> {
	public static defaultProps: Partial<ButtonProps> = {
		color: 'default',
		size: 'md',
		background: 'primary',
	};

	public render(): JSX.Element {
		const { background, size, color, children } = this.props;
		return (
			<button
				className={`btn btn-${background}
					btn-${size}
					text-${color}`}>
				{children}
			</button>
		);
	}
}

export { Button };
