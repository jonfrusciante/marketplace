import * as React from 'react';

import { Step1, Step2, Step3, Step4, Step5 } from './steps';
import MultiStepForm from '../../../../../components/multi-step-form';

export default class View extends React.PureComponent<any, any> {
	render() {
		const steps = [
			{ name: 'One', component: <Step1 {...this.props} /> },
			{ name: 'Two', component: <Step2 {...this.props} /> },
			{ name: 'Three', component: <Step3 {...this.props} /> },
			{ name: 'Four', component: <Step4 {...this.props} /> },
			{ name: 'Five', component: <Step5 {...this.props} /> },
		];
		return (
			<React.Fragment>
				<MultiStepForm showNavigation={true} steps={steps} />
			</React.Fragment>
		);
	}
}
