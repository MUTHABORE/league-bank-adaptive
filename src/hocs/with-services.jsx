import React, {PureComponent} from "react";

import {SERVICES} from "../mocks";

export const withServices = (Component) => {
	class WithServices extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				activeOption: 1,
			}
		}



		render() {
			return (
				<Component />
			)
		}
	}
	return WithServices;
}
