import * as React from 'react';

import { Step1, Step2, Step3, Step4, Step5 } from './steps';
import { Tab, Tabs, TabId } from '@blueprintjs/core';

export default class View extends React.PureComponent<any, any> {
	state = {
		animate: true,
		navbarTabId: 'ng',
	};

	handleTabChange = (navbarTabId: TabId) => this.setState({ navbarTabId });

	render() {
		return (
			<Tabs
				id="product-form"
				onChange={this.handleTabChange}
				selectedTabId={this.state.navbarTabId}
				animate={true}
				renderActiveTabPanelOnly={true}>
				<Tab id="ng" title="Angular" panel={<Step1 />} />
				<Tab id="mb" title="Ember" panel={<Step2 />} />
				<Tab id="rx" title="React" panel={<Step3 />} />
				<Tab id="rt" title="Vanilla" panel={<Step4 />} />
				<Tab
					id="bb"
					disabled={true}
					title="Backbone"
					panel={<Step5 />}
				/>
				<Tabs.Expander />
			</Tabs>
		);
	}
}
