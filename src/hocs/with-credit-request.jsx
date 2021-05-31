import React, {PureComponent} from 'react';

export const withCreditRequest = (Component) => {
	class WithCreditRequest extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {

			}

			this.nameFieldRef = React.createRef();
		}

		componentDidMount() {
			this.nameFieldRef.current.focus();
		}

		render() {
			return(
				<Component
					nameFieldRef={this.nameFieldRef}
					isFormOpen={this.isFormOpen}
					onSubmitClick={this.onSubmitClick}
					onFormSubmit={this.props.onFormSubmit}
				/>
			)
		}
	}
	return WithCreditRequest;
};
