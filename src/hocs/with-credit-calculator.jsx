import React, {PureComponent} from 'react';

export const withCreditCalculator = (Component) => {
	class WithCreditCalculator extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				userCredit: {
					type: null,
				}
			}

			this.onSelectOpenClick = this.onSelectOpenClick.bind(this);
			this._onOptionSelectClick = this._onOptionSelectClick.bind(this);
		}

		componentDidMount(evt) {
			console.log(evt)
		}

		displayOptions() {

		}

		onSelectOpenClick(evt) {
			const currentOption = evt.currentTarget;
			const allOptions = evt.target.parentNode.querySelectorAll(`.credit-calculator__option`);

				allOptions.forEach((element) => {
						element.style.display = `block`;
						element.addEventListener(`click`, this._onOptionSelectClick);
					})

		}
		
		_onOptionSelectClick(evt) {
			console.log(`again`)
			const selectedOption = evt.currentTarget;

			if (currentOption.className.indexOf(`placeholder`) > 0 || currentOption.className.indexOf(`selected`) > 0) {
			}

			selectedOption.parentNode.querySelectorAll(`.credit-calculator__option`).forEach((element) => {
				element.classList.remove(`credit-calculator__option--selected`)
				element.style.display = `none`;
			})
			selectedOption.classList.add(`credit-calculator__option--selected`);
			selectedOption.parentNode.prepend(selectedOption);
			selectedOption.style.display = `block`;

			selectedOption.addEventListener(`click`, this.onReselectOption);
		}

		render() {
			return(
				<Component
				onSelectOpenClick={this.onSelectOpenClick}
				_onOptionSelectClick={this._onOptionSelectClick}
				/>
			)
		}
	}
	return WithCreditCalculator;
}
