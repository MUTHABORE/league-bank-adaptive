import React, {PureComponent} from 'react';

import {MONTH_AMOUNT, CREDIT_TYPE, OWN_VALUE_STEP, CAR_VALUE_STEP, START_OWN_VALUE, MIN_OWN_VALUE, MAX_OWN_VALUE, MIN_CAR_VALUE, MAX_CAR_VALUE, MATERNAL_CAPITAL, START_CAR_VALUE, MIN_OWN_INITIAL_FEE_COEFFICIENT, MIN_CAR_INITIAL_FEE_COEFFICIENT, MIN_OWN_LOAN_TERMS, MAX_OWN_LOAN_TERMS, MIN_CAR_LOAN_TERMS, MAX_CAR_LOAN_TERMS} from '../const';
import {extend, valueFloorPenny} from '../util/util';
import {CREDITS_TYPE_INFO} from '../mocks';

export const withCreditCalculator = (Component) => {
	class WithCreditCalculator extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				isFormOpen: false,
				isSelectOpen: false,
				creditType: null,

				startOwnValue: null,
				minOwnValue: null,
				maxOwnValue: null,
				minInitialFeeCoefficient: null,

				userCredit: {},
			}

			this.userCreditOffer = this.userCreditOffer.bind(this);
			this.onFormOpen = this.onFormOpen.bind(this);
			this.onFormSubmit = this.onFormSubmit.bind(this);

			this._onOptionChoseClick = this._onOptionChoseClick.bind(this);
			this.onOpenSelect = this.onOpenSelect.bind(this);
			this.onCloseSelect = this.onCloseSelect.bind(this);

			this._ownValueCorrection = this._ownValueCorrection.bind(this);
			this.onOwnValueMaskClick = this.onOwnValueMaskClick.bind(this);
			this.onOwnValueChange = this.onOwnValueChange.bind(this);
			this.onOwnValueBlur = this.onOwnValueBlur.bind(this);
			this.onButtonOwnValueChange = this.onButtonOwnValueChange.bind(this);

			this.onChangeInitialFee = this.onChangeInitialFee.bind(this);
			this.onInitialFeeMaskClick = this.onInitialFeeMaskClick.bind(this);
			this.onInitialFeeBlur = this.onInitialFeeBlur.bind(this);
			this.onInitialFeeRangeChange = this.onInitialFeeRangeChange.bind(this);
			this.initialFeeCorrection = this.initialFeeCorrection.bind(this);
			
			this.onLoanTermsMaskClick = this.onLoanTermsMaskClick.bind(this);
			this.onLoanTermsChange = this.onLoanTermsChange.bind(this);
			this.onLoanTermsBlur = this.onLoanTermsBlur.bind(this);
			this.onLoanTermsRangeChange = this.onLoanTermsRangeChange.bind(this);
			this.onCheckboxChange = this.onCheckboxChange.bind(this);
		}

		onOpenSelect(evt) {
			const chosenOption = evt.currentTarget.parentNode.querySelector(`.credit-calculator__option-placeholder`);
			const allOptions = chosenOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			allOptions.forEach((element) => {
				element.style.display = `block`;
				element.addEventListener(`click`, this._onOptionChoseClick);
			})

			this.setState({isSelectOpen: true});
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
			// const container = evt.currentTarget.parentNode;
			// const mask = container.querySelector(`.credit-calculator__input--own-value-mask`);

			const chosenOption = evt.currentTarget;
			const value = chosenOption.value;
			const creditType = CREDIT_TYPE[value];

			chosenOption.parentNode.querySelector(`.credit-calculator__option-placeholder`).textContent = chosenOption.textContent;

			console.log(this.state.creditType)
			console.log(this.state.userCredit.initialFee)
			console.log(value)
			
			this.setState({
				creditType: creditType,
				userCredit: CREDITS_TYPE_INFO.find(credit => credit.type === creditType),
				startOwnValue: creditType === `mortgage` ? START_OWN_VALUE : START_CAR_VALUE,
				minOwnValue: creditType === `mortgage` ? MIN_OWN_VALUE : MIN_CAR_VALUE,
				maxOwnValue: creditType === `mortgage` ? MAX_OWN_VALUE : MAX_CAR_VALUE,
				minInitialFeeCoefficient: creditType === `mortgage` ? MIN_OWN_INITIAL_FEE_COEFFICIENT : MIN_CAR_INITIAL_FEE_COEFFICIENT,
			});

			console.log(this.state.creditType)
			console.log(this.state.userCredit.initialFee)
			this.onCloseSelect(evt);
		}

		// OWN VALUE
		// OWN VALUE
		// OWN VALUE
		// OWN VALUE
		// OWN VALUE
		// OWN VALUE
		// OWN VALUE

		onOwnValueMaskClick(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--own-value-mask`);
			const input = container.querySelector(`.credit-calculator__input--own-value`);
			const startValue = this.state.creditType === `mortgage` ? START_OWN_VALUE : START_CAR_VALUE;

			console.log(this.creditType)

			mask.style.display = `none`;
			input.style.display = `block`;

			if (this.state.userCredit.ownValue === `Некорректное значение`) {
				this.setState({userCredit: extend(this.state.userCredit, {
					ownValue: startValue,
					initialFee: startValue * this.state.minInitialFeeCoefficient,
				})});
				mask.style.backgroundColor = `transparent`;
				input.focus();
				return;
			}

			input.focus();
		}

		_ownValueCorrection(mask) {
			if (this.state.userCredit.ownValue < this.state.minOwnValue || this.state.userCredit.ownValue > this.state.maxOwnValue) {
				this.setState({userCredit: extend(this.state.userCredit, {
					ownValue: `Некорректное значение`,
					initialFee: 0,
					// loanTerms: minLoanTerms,
				})});
				mask.style.backgroundColor = `#ffb3b3`;
				return;
			}

			mask.style.backgroundColor = `transparent`;
			this.setState({userCredit: extend(this.state.userCredit, {ownValue: valueFloorPenny(+this.state.userCredit.ownValue)})});
		}
		
		onOwnValueChange(evt) {
			evt.preventDefault();

			this.setState({userCredit: extend(this.state.userCredit, {ownValue: valueFloorPenny(evt.currentTarget.value)})}, this.initialFeeCorrection);
		}

		onButtonOwnValueChange(evt) {
			evt.preventDefault();
			console.log(evt.currentTarget.value, this.state.userCredit.ownValue)

			const mask = evt.currentTarget.parentNode.querySelector(`.credit-calculator__input--own-value-mask`);
			const step = this.state.creditType ===  `mortgage` ? OWN_VALUE_STEP : CAR_VALUE_STEP;
			const stepDirection = evt.target.classList.contains(`credit-calculator__value-changer--down`) ? -1 : 1;

			if (this.state.userCredit.ownValue + (step * stepDirection) < this.state.minOwnValue) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: this.state.minOwnValue})}, this.initialFeeCorrection);
				return;
			} else if (this.state.userCredit.ownValue + (step * stepDirection) > this.state.maxOwnValue) {
				this.setState({userCredit: extend(this.state.userCredit, {ownValue: this.state.maxOwnValue})}, this.initialFeeCorrection);
				return;
			}

			if (this.state.userCredit.ownValue === `Некорректное значение`) {
				console.log(this.state.userCredit.ownValue)
				console.log(`button`)
				this.setState({userCredit: extend(this.state.userCredit, {
					ownValue: this.state.startOwnValue,
					initialFee: this.state.startOwnValue * this.state.minInitialFeeCoefficient,
				})}, this.initialFeeCorrection);
				mask.style.backgroundColor = `transparent`;
				return;
			}

			this.setState({userCredit: extend(this.state.userCredit, {ownValue: valueFloorPenny(+this.state.userCredit.ownValue + (step * stepDirection))})}, this.initialFeeCorrection);
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
		//INITIAL FEE
		//INITIAL FEE
		//INITIAL FEE
		//INITIAL FEE
		//INITIAL FEE

		initialFeeCorrection() {
			if (this.state.userCredit.initialFee < this.state.userCredit.ownValue * this.state.minInitialFeeCoefficient) {
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: valueFloorPenny(this.state.userCredit.ownValue * this.state.minInitialFeeCoefficient)})});
				return;
			}
			if (this.state.userCredit.initialFee > this.state.userCredit.ownValue) {
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: valueFloorPenny(this.state.userCredit.ownValue)})});
				return;
			}
			return;
		}

		onChangeInitialFee(evt) {
			evt.preventDefault();
			this.setState({userCredit: extend(this.state.userCredit, {initialFee: valueFloorPenny(evt.currentTarget.value)})});
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

		onInitialFeeRangeChange(evt) {
			this.setState({userCredit: extend(this.state.userCredit, {initialFee: valueFloorPenny(+evt.currentTarget.value)})});
		}

		onInitialFeeBlur(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--initial-fee-mask`);
			const input = container.querySelector(`.credit-calculator__input--initial-fee`);
			const value = evt.currentTarget.value;

			const minInitialFee = this.state.userCredit.ownValue * this.state.minInitialFeeCoefficient;
			const maxInitialFee = this.state.userCredit.ownValue;

			mask.style.display = `block`;
			input.style.display = `none`;

			console.log(value, minInitialFee)
			console.log(this.state.userCredit.ownValue, this.state.minInitialFeeCoefficient)
			
			if (value < minInitialFee) {
				console.log(`lower then`)
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: minInitialFee})});
				return;
			}

			if (value > maxInitialFee) {
				this.setState({userCredit: extend(this.state.userCredit, {initialFee: maxInitialFee})});
				return;
			}

			this.setState({userCredit: extend(this.state.userCredit, {initialFee: valueFloorPenny(+value)})});
		}

		//LOAN TRMS
		//LOAN TRMS
		//LOAN TRMS
		//LOAN TRMS
		//LOAN TRMS
		//LOAN TRMS
		//LOAN TRMS

		onLoanTermsMaskClick(evt) {
			evt.preventDefault();

			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--loan-terms-mask`);
			const input = container.querySelector(`.credit-calculator__input--loan-terms`);

			mask.style.display = `none`;
			input.style.display = `block`;

			input.focus();
		}

		onLoanTermsChange(evt) {
			evt.preventDefault();
			console.log(`change`)
			this.setState({userCredit: extend(this.state.userCredit, {loanTerms: evt.currentTarget.value})});
		}

		onLoanTermsBlur(evt) {
			const container = evt.currentTarget.parentNode;
			const mask = container.querySelector(`.credit-calculator__input--loan-terms-mask`);
			const input = container.querySelector(`.credit-calculator__input--loan-terms`);
			const value = evt.currentTarget.value;
			const minLoanTerms = this.state.creditType === `mortgage` ? MIN_OWN_LOAN_TERMS : MIN_CAR_LOAN_TERMS;
			const maxLoanTerms = this.state.creditType === `mortgage` ? MAX_OWN_LOAN_TERMS : MAX_CAR_LOAN_TERMS;

			console.log(this.state.creditType)

			mask.style.display = `block`;
			input.style.display = `none`;

			if (value < minLoanTerms) {
				this.setState({userCredit: extend(this.state.userCredit, {loanTerms: minLoanTerms})});
				return;
			}

			if (value > maxLoanTerms) {
				this.setState({userCredit: extend(this.state.userCredit, {loanTerms: maxLoanTerms})});
				return;
			}

			this.setState({userCredit: extend(this.state.userCredit, {loanTerms: value})});
		}

		onLoanTermsRangeChange(evt) {
			evt.preventDefault();

			this.setState({userCredit: extend(this.state.userCredit, {loanTerms: evt.currentTarget.value})});
		}

		onCheckboxChange(evt) {
			const checkboxName = evt.target.name;
			this.setState({userCredit: extend(this.state.userCredit, {[checkboxName]: evt.target.checked})});
		}

		userCreditOffer() {
			const userCredit = this.state.userCredit;
			const creditType = this.state.creditType;
			// if (creditType === `mortgage`) {
				const creditAmount = userCredit.ownValue - (userCredit.initialFee + (userCredit.isMaternalCapitalUsed ? MATERNAL_CAPITAL : 0));
				const paymentPeriodsAmount = userCredit.loanTerms * MONTH_AMOUNT;

				const percentRateMortgage = (userCredit.initialFee / (userCredit.ownValue / 100)) >= 15 ? `8.50` : `9.40`;
				const percentRateCarCredit = () => {
					if (userCredit.isLifeInsuranceWanted && userCredit.isKaskoWanted) {
						return `3.5`;
					} else if (userCredit.isLifeInsuranceWanted || userCredit.isKaskoWanted) {
						return `8.5`;
					}
					if (creditAmount > 2000000) {
						return `15`;
					} else if (creditAmount < 2000000) {
						return `16`;
					}
				};
				const percentRate = creditType === `mortgage` ? percentRateMortgage : percentRateCarCredit();

				const monthlyPayment = Math.ceil(creditAmount * (((percentRate * 0.01) / MONTH_AMOUNT) / (1 - (1 + (percentRate * 0.01) / MONTH_AMOUNT) ** -paymentPeriodsAmount)));
				const necessaryIncome = Math.ceil((monthlyPayment / 45) * 100);
				console.log(userCredit.ownValue / 100)

				let offer = {
					type: creditType,
					creditAmount: creditAmount,
					percentRate: percentRate,
					monthlyPayment: monthlyPayment,
					necessaryIncome: necessaryIncome,
				};
				return offer;
			// }
		}

		onFormOpen(evt) {
			this.setState({isFormOpen: true});
			console.log(`open form`)
		}

		onFormSubmit(evt) {
			this.setState({isFormOpen: false});
			console.log(`close form`)
		}

		render() {
			return(
				<Component
					isFormOpen={this.state.isFormOpen}
					isSelectOpen={this.state.isSelectOpen}
					isMaternalCapitalUsed={this.state.userCredit.isMaternalCapitalUsed}
					isKaskoWanted={this.state.userCredit.isKaskoWanted}
					isLifeInsuranceWanted={this.state.userCredit.isLifeInsuranceWanted}
					creditType={this.state.creditType}
					ownValue={this.state.userCredit.ownValue}

					userCredit={this.userCreditOffer()}

					initialFee={this.state.userCredit.initialFee}
					minInitialFee={isNaN(this.state.userCredit.ownValue) ? 0 : this.state.userCredit.ownValue * this.state.minInitialFeeCoefficient}
					maxInitialFee={isNaN(this.state.userCredit.ownValue) ? 0 : this.state.userCredit.ownValue}
					loanTerms={this.state.userCredit.loanTerms}

					
					onOpenSelect={this.onOpenSelect}
					onCloseSelect={this.onCloseSelect}
					
					onOwnValueMaskClick={this.onOwnValueMaskClick}
					onOwnValueChange={this.onOwnValueChange}
					onOwnValueBlur={this.onOwnValueBlur}
					onButtonOwnValueChange={this.onButtonOwnValueChange}
					
					onChangeInitialFee={this.onChangeInitialFee}
					onInitialFeeMaskClick={this.onInitialFeeMaskClick}
					onInitialFeeRangeChange={this.onInitialFeeRangeChange}
					onInitialFeeBlur={this.onInitialFeeBlur}
					
					onLoanTermsMaskClick={this.onLoanTermsMaskClick}
					onLoanTermsChange={this.onLoanTermsChange}
					onLoanTermsBlur={this.onLoanTermsBlur}
					onLoanTermsRangeChange={this.onLoanTermsRangeChange}

					onCheckboxChange={this.onCheckboxChange}
					onFormOpen={this.onFormOpen}
					onFormSubmit={this.onFormSubmit}
				/>
			)
		}
	}
	return WithCreditCalculator;
}
