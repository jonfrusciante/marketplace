import * as React from 'react';

import './style.css';

const getCurrentStep = (index: number, length: number): NavState => {
	const styles = [];
	for (let increment = 0; increment < length; increment++) {
		if (increment < index) {
			styles.push('finished');
		} else if (increment === index) {
			styles.push('in-progress');
		} else {
			styles.push('todo');
		}
	}

	return { current: index, styles };
};

const checkCurrentStep = (currentStep: number, stepsLength: number) => {
	if (currentStep > 0 && currentStep < stepsLength - 1) {
		return {
			showPreviousBtn: true,
			showNextBtn: true,
		};
	} else if (currentStep === 0) {
		return {
			showPreviousBtn: false,
			showNextBtn: true,
		};
	} else {
		return {
			showPreviousBtn: true,
			showNextBtn: false,
		};
	}
};

interface NavState {
	current: number;
	styles: string[];
}

interface State {
	showPreviousBtn: boolean;
	showNextBtn: boolean;
	completedStatus: number;
	navState: NavState;
}

interface Props {
	steps: any;
	showNavigation: boolean;
}

export default class MultiStepForm extends React.PureComponent<Props, any> {
	state: State = {
		showPreviousBtn: false,
		showNextBtn: true,
		completedStatus: 0,
		navState: getCurrentStep(0, this.props.steps.length),
	};

	setNavState = (nextStep: number) => {
		const { steps } = this.props;
		this.setState({
			navState: getCurrentStep(nextStep, steps.length),
		});
		if (nextStep < steps.length) {
			this.setState({ completedStatus: nextStep });
		}
		this.setState(checkCurrentStep(nextStep, steps.length));
	};

	handleKeyDown = (event: any) => {
		if (event.which === 13) {
			this.nextStep();
		}
	};

	handleOnClick = (event: any) => {
		const { steps } = this.props;
		const { value } = event.currentTarget;
		const { completedStatus } = this.state;
		const length = steps.length - 1;
		if (value === length - 1 && completedStatus === length - 1) {
			this.setNavState(steps.length);
		} else {
			this.setNavState(value);
		}
	};

	nextStep = () => {
		this.setNavState(this.state.completedStatus + 1);
	};

	previousStep = () => {
		if (this.state.completedStatus > 0) {
			this.setNavState(this.state.completedStatus - 1);
		}
	};

	getClassName = (className: string, index: number) => {
		const { navState } = this.state;
		return `${className}-${navState.styles[index]}`;
	};

	renderSteps = () => {
		const { steps } = this.props;
		return steps.map((_: any, index: number) => (
			<li
				className={this.getClassName('progress-tracker', index)}
				onClick={this.handleOnClick}
				key={index}
				value={index}>
				<em>{index + 1}</em>
				<span>{steps[index].name}</span>
			</li>
		));
	};

	render() {
		const { showNavigation, steps } = this.props;
		const { completedStatus, showPreviousBtn, showNextBtn } = this.state;
		const fadeOut = {
			display: 'none',
			transition: '100ms all ease-in-out',
		};
		return (
			<div onKeyDown={this.handleKeyDown}>
				<ol className="progress-tracker">{this.renderSteps()}</ol>
				{steps[completedStatus].component}
				<div style={showNavigation ? {} : { ...fadeOut }}>
					<button
						className="btn btn-default pull-left"
						style={showPreviousBtn ? {} : { ...fadeOut }}
						onClick={this.previousStep}>
						Previous
					</button>

					<button
						className="btn btn-default pull-right"
						style={showNextBtn ? {} : { ...fadeOut }}
						onClick={this.nextStep}>
						Next
					</button>
				</div>
			</div>
		);
	}
}
