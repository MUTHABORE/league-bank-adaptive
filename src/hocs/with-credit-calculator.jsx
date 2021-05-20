import React, {PureComponent} from 'react';

import {extend} from '../util/util';
import {CREDIT_TYPE, OWN_VALUE_STEP, VEHICLE_VALUE_STEP, START_OWN_VALUE, MIN_OWN_VALUE, MAX_OWN_VALUE} from '../const';
import {valueMask} from '../util/util';

export const withCreditCalculator = (Component) => {
	class WithCreditCalculator extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				isSelectOpen: false,
				userCredit: {
					type: null,
					ownValue: START_OWN_VALUE,
					initialFee: START_OWN_VALUE / 10,
					// initialFee: this.state.userCredit.ownValue / 10,
				}
			}

			this._onOptionChoseClick = this._onOptionChoseClick.bind(this);
			this._ownValueCorrection = this._ownValueCorrection.bind(this);
			this.onOpenSelect = this.onOpenSelect.bind(this);
			this.onCloseSelect = this.onCloseSelect.bind(this);
			this.onOwnValueMaskClick = this.onOwnValueMaskClick.bind(this);
			this.onOwnValueChange = this.onOwnValueChange.bind(this);
			this.onOwnValueBlur = this.onOwnValueBlur.bind(this);
			this.onButtonOwnValueChange = this.onButtonOwnValueChange.bind(this);
			this.onChangeInitialFee = this.onChangeInitialFee.bind(this);
			this.onInitialFeeMaskClick = this.onInitialFeeMaskClick.bind(this);
			this.onInitialFeeBlur = this.onInitialFeeBlur.bind(this);
			this.initialFeeCorrection = this.initialFeeCorrection.bind(this);
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
			
			this.setState({userCredit: extend(this.state.userCredit, {type: CREDIT_TYPE[chosenOption.value - 1]})});

			this.onCloseSelect(evt);
		}

		onOwnValueMaskClick(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--own-value-mask`);
			const input = container.querySelector(`.credit-calculator__input--own-value`);

			mask.style.display = `none`;
			input.style.display = `block`;

			if (this.state.userCredit.ownValue === `Некорректное значение`) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: START_OWN_VALUE})});
				mask.style.backgroundColor = `transparent`;
				input.focus();
				return;
			}

			input.focus();
		}

		_ownValueCorrection(mask) {
			if (this.state.userCredit.ownValue < MIN_OWN_VALUE || this.state.userCredit.ownValue > MAX_OWN_VALUE) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: `Некорректное значение`})});
				mask.style.backgroundColor = `#ffb3b3`;
				return;
			}

			mask.style.backgroundColor = `transparent`;
			this.setState({userCredit: extend(this.state.userCredit, {ownValue: +this.state.userCredit.ownValue})});
		}
		
		onOwnValueChange(evt) {
			evt.preventDefault();

			this.setState({userCredit: extend(this.state.userCredit, {ownValue: evt.currentTarget.value})}, this.initialFeeCorrection);
		}

		onButtonOwnValueChange(evt) {
			evt.preventDefault();

			const step = CREDIT_TYPE[this.state.userCredit.type] === 1 ? OWN_VALUE_STEP : VEHICLE_VALUE_STEP;
			const stepDirection = evt.target.classList.contains(`credit-calculator__value-changer--down`) ? -1 : 1;

			if (this.state.userCredit.ownValue + (step * stepDirection) < MIN_OWN_VALUE) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: MIN_OWN_VALUE})}, this.initialFeeCorrection);
				return;
			} else if (this.state.userCredit.ownValue + (step * stepDirection) > MAX_OWN_VALUE) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: MAX_OWN_VALUE})}, this.initialFeeCorrection);
				return;
			}

			this.setState({userCredit: extend(this.state.userCredit, {ownValue: +this.state.userCredit.ownValue + (step * stepDirection)})}, this.initialFeeCorrection);
		}
		
		
		onOwnValueBlur(evt) {
			evt.preventDefault();
			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--own-value-mask`);
			const input = container.querySelector(`.credit-calculator__input--own-value`);

			this._ownValueCorrection(mask);
			mask.style.display = `block`;
			input.style.display = `none`;
		}

		//INITIAL FEE

		initialFeeCorrection() {
			console.log(this.state.userCredit.initialFee, this.state.userCredit.ownValue / 10)
			if (this.state.userCredit.initialFee < this.state.userCredit.ownValue / 10) {
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: this.state.userCredit.ownValue / 10})});
				return;
			}
			return;
		}

		onChangeInitialFee(evt) {
			evt.preventDefault();

			this.setState({userCredit: extend(this.state.userCredit, {initialFee: evt.currentTarget.value})});
		}

		onInitialFeeMaskClick(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--initial-fee-mask`);
			const input = container.querySelector(`.credit-calculator__input--initial-fee`);

			mask.style.display = `none`;
			input.style.display = `block`;

			input.focus();
		}

		onInitialFeeBlur(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--initial-fee-mask`);
			const input = container.querySelector(`.credit-calculator__input--initial-fee`);

			mask.style.display = `block`;
			input.style.display = `none`;

			if (evt.currentTarget.value < this.state.userCredit.ownValue / 10) {
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: this.state.userCredit.ownValue / 10})});
				return;
			}

			this.setState({userCredit: extend(this.state.userCredit, {initialFee: evt.currentTarget.value})});
		}

		render() {
			return(
				<Component
					isSelectOpen={this.state.isSelectOpen}
					ownValue={this.state.userCredit.ownValue}
					initialFee={this.state.userCredit.initialFee}
					onOpenSelect={this.onOpenSelect}
					onCloseSelect={this.onCloseSelect}
					onOwnValueMaskClick={this.onOwnValueMaskClick}
					onOwnValueChange={this.onOwnValueChange}
					onOwnValueBlur={this.onOwnValueBlur}
					onButtonOwnValueChange={this.onButtonOwnValueChange}
					onChangeInitialFee={this.onChangeInitialFee}
					onInitialFeeMaskClick={this.onInitialFeeMaskClick}
					onInitialFeeBlur={this.onInitialFeeBlur}
				/>
			)
		}
	}
	return WithCreditCalculator;
}
