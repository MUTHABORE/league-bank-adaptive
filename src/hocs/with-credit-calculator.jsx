import React, {PureComponent} from 'react';

import {extend} from '../util/util';
import {CREDIT_TYPE} from '../const';

export const withCreditCalculator = (Component) => {
	class WithCreditCalculator extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				isSelectOpen: false,
				userCredit: {
					type: null,
					propertyValue: ``,
				}
			}

			this.value = ``;

			this._onOptionChoseClick = this._onOptionChoseClick.bind(this);
			this._propertyValueCorrection = this._propertyValueCorrection.bind(this);
			this.onOpenSelect = this.onOpenSelect.bind(this);
			this.onCloseSelect = this.onCloseSelect.bind(this);
			this.onPropertyValueMaskClick = this.onPropertyValueMaskClick.bind(this);
			this.onPropertyValueChange = this.onPropertyValueChange.bind(this);
			this.onPropertyValueBlur = this.onPropertyValueBlur.bind(this);
			this.onButtonPropertyValueChange = this.onButtonPropertyValueChange.bind(this);
		}

		onOpenSelect(evt) {
			const chosenOption = evt.currentTarget.parentNode.querySelector(`.credit-calculator__option-placeholder`);
			const allOptions = chosenOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			allOptions.forEach((element) => {
				element.style.display = `block`;
				element.addEventListener(`click`, this._onOptionChoseClick);
			})

			this.setState((extend(this.state, {isSelectOpen: true})));
		}

		onCloseSelect(evt) {
			const chosenOption = evt.currentTarget.parentNode.querySelector(`.credit-calculator__option-placeholder`);
			const allOptions = chosenOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			allOptions.forEach((element) => {
				element.style.display = `none`;
				element.removeEventListener(`click`, this._onOptionChoseClick);
			})

			chosenOption.style.display = `block`;
			this.setState({isSelectOpen: false});
		}
		
		_onOptionChoseClick(evt) {
			const chosenOption = evt.currentTarget;

			chosenOption.parentNode.querySelector(`.credit-calculator__option-placeholder`).textContent = chosenOption.textContent;

			console.log(this.state)
			
			this.setState({userCredit: extend(this.state.userCredit, {type: CREDIT_TYPE[chosenOption.value - 1]})});

			console.log(this.state)

			this.onCloseSelect(evt);
		}

		onPropertyValueMaskClick(evt) {
			evt.preventDefault();
			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--property-value-mask`);
			const input = container.querySelector(`.credit-calculator__input--property-value`);

			console.log(mask, input)

			mask.style.display = `none`;
			input.style.display = `block`;

			input.focus();
		}

		_propertyValueCorrection() {
			if (this.value === ``) return;

			if (this.value < 1200000 || this.value > 25000000) {
				this.setState({userCredit: extend(this.state.userCredit, {propertyValue: `Некорректное значение`})});
				return;
			}
			this.setState({userCredit: extend(this.state.userCredit, {propertyValue: this.value})});
		}

		onPropertyValueChange(evt) {
			this.value = evt.currentTarget.value;
			console.log(this.value)
			
			this.setState({userCredit: extend(this.state.userCredit, {propertyValue: this.value})});
			console.log(this.state)
		}

		onButtonPropertyValueChange(evt) {
			const step = CREDIT_TYPE[this.state.userCredit.type] === 1 ? 100000 : 50000;
			const stepDirection = evt.target.classList.contains(`credit-calculator__value-changer--down`) ? -1 : 1;

			console.log(stepDirection)

			this.setState({userCredit: extend(this.state.userCredit, {propertyValue: +this.state.userCredit.propertyValue + (step * stepDirection)})});

			this._propertyValueCorrection();
		}
		
		
		onPropertyValueBlur(evt) {
			evt.preventDefault();
			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--property-value-mask`);
			const input = container.querySelector(`.credit-calculator__input--property-value`);

			this._propertyValueCorrection();
			mask.style.display = `block`;
			input.style.display = `none`;

			console.log(this.state.userCredit.propertyValue);
		}

		render() {
			return(
				<Component
					isSelectOpen={this.state.isSelectOpen}
					propertyValue={this.state.userCredit.propertyValue}
					onOpenSelect={this.onOpenSelect}
					onCloseSelect={this.onCloseSelect}
					onPropertyValueMaskClick={this.onPropertyValueMaskClick}
					onPropertyValueChange={this.onPropertyValueChange}
					onPropertyValueBlur={this.onPropertyValueBlur}
					onButtonPropertyValueChange={this.onButtonPropertyValueChange}
				/>
			)
		}
	}
	return WithCreditCalculator;
}
