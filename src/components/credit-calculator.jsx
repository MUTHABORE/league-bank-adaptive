import React from 'react';

import {CREDIT_TYPE, MIN_OWN_LOAN_TERMS, MIN_CAR_LOAN_TERMS, MAX_OWN_LOAN_TERMS, MAX_CAR_LOAN_TERMS, INITIAL_FEE_STEP_COEFFICIENT} from '../const';
import {valueMask} from '../util/util';
import {withCreditCalculator} from '../hocs/with-credit-calculator';
import CreditOffer from './credit-offer';

const CreditCalculator = (props) => {
	const {creditType, isLifeInsuranceWanted, isKaskoWanted, isMaternalCapitalUsed, onOpenSelect, onCloseSelect, onOwnValueChange, isSelectOpen, ownValue, initialFee, maxInitialFee, minInitialFee, onOwnValueBlur, onOwnValueMaskClick, onButtonOwnValueChange, onChangeInitialFee, onInitialFeeMaskClick, onInitialFeeBlur, onInitialFeeRangeChange, onLoanTermsChange, onLoanTermsBlur, onLoanTermsMaskClick, loanTerms, onLoanTermsRangeChange, onCheckboxChange, userCredit} = props;
	console.log(isLifeInsuranceWanted, isKaskoWanted)
	return (
		<section className="credit-calculator">
			<div className="credit-calculator__steps-wrapper">
				<h2 className="credit-calculator__title">Кредитный калькулятор</h2>
				<div className="credit-calculator__step">

					<fieldset className="credit-calculator__fieldset">
						<legend className="credit-calculator__legend">Шаг 1. Цель кредита</legend>

						<ul className="credit-calculator__select">
							<li className={`credit-calculator__option-placeholder ${isSelectOpen ? `credit-calculator__option-placeholder--open` : ``}`} onClick={isSelectOpen === false ? onOpenSelect : onCloseSelect} tabIndex="1">Выберите цель кредита</li>
							<li value="0" className="credit-calculator__option" tabIndex="1">Ипотечное кредитование</li>
							<li value="1" className="credit-calculator__option" tabIndex="1">Автомобильное кредитование</li>
						</ul>

					</fieldset>

				</div>


				{creditType !== null && (
					<div className="credit-calculator__step">
						<fieldset className="credit-calculator__fieldset">
							<legend className="credit-calculator__legend">Шаг 2. Введите параметры кредита</legend>

							<p className="credit-calculator__input-title">{`Стоимость ${creditType === `mortgage` ? `недвижимости` : `автомобиля`}`}</p>
							<div className="credit-calculator__input-wrapper">
								<button className="credit-calculator__value-changer credit-calculator__value-changer--down" onClick={onButtonOwnValueChange}></button>
								<input className="credit-calculator__input credit-calculator__input--own-value-mask" type="text" value={valueMask(ownValue)} onMouseDown={onOwnValueMaskClick} onChange={onOwnValueChange} />
								<input className="credit-calculator__input credit-calculator__input--own-value" type="number" value={ownValue} onBlur={onOwnValueBlur} onChange={onOwnValueChange} />
								<button className="credit-calculator__value-changer credit-calculator__value-changer--up" onClick={onButtonOwnValueChange}></button>
							</div>
							<small className="credit-calculator__input-info">{creditType === `mortgage` ? `От 1 200 000  до 25 000 000 рублей` : `От 500 000  до 5 000 000 рублей`}</small>

							<p className="credit-calculator__input-title">Первоначальный взнос</p>
							<input className="credit-calculator__input credit-calculator__input--initial-fee-mask" type="text" value={valueMask(initialFee)} onClick={onInitialFeeMaskClick} onChange={onChangeInitialFee} />
							<input className="credit-calculator__input credit-calculator__input--initial-fee" type="number" value={initialFee} onChange={onChangeInitialFee} onBlur={onInitialFeeBlur} />
							<div className="credit-calculator__input-range-wrapper">
								<input className="credit-calculator__input-range" type="range" step={maxInitialFee * INITIAL_FEE_STEP_COEFFICIENT} value={initialFee} min={minInitialFee} max={maxInitialFee} onChange={onInitialFeeRangeChange} />
								<small className="credit-calculator__input-range-unit-title">{maxInitialFee === 0 ? `0%` : Math.round(initialFee / (maxInitialFee / 100)) + `%`}</small>
							</div>

							<p className="credit-calculator__input-title">Срок кредитования</p>
							<input className="credit-calculator__input credit-calculator__input--loan-terms-mask" type="text" value={loanTerms + ` лет`} onClick={onLoanTermsMaskClick} onChange={onLoanTermsChange} />
							<input className="credit-calculator__input credit-calculator__input--loan-terms" type="number" value={loanTerms} onChange={onLoanTermsChange} onBlur={onLoanTermsBlur} />

							<div className="credit-calculator__input-range-wrapper">
								<input className="credit-calculator__input-range credit-calculator__input-range--loan-terms" type="range" step="1" value={loanTerms} min={creditType === `mortgage` ? MIN_OWN_LOAN_TERMS : MIN_CAR_LOAN_TERMS} max={creditType === `mortgage` ? MAX_OWN_LOAN_TERMS : MAX_CAR_LOAN_TERMS} onChange={onLoanTermsRangeChange} />
								<small className="credit-calculator__input-range-unit-title">{creditType === `mortgage` ? `5 лет` : `1 год`}</small>
								<small className="credit-calculator__input-range-unit-title credit-calculator__input-range-unit-title--max">{creditType === `mortgage` ? `30 лет` : `5 лет`}</small>
							</div>

							{creditType === `mortgage` && (
								<>
									<input className="credit-calculator__input-checkbox" name="isMaternalCapitalUsed" id="maternalCapital" type="checkbox" onChange={onCheckboxChange}/>
									<label className={`credit-calculator__input-checkbox-custom ${isMaternalCapitalUsed ? `credit-calculator__input-checkbox-custom--active` : ``}`} htmlFor="maternalCapital">Использовать материнский капитал</label>
								</>
							)}

							{creditType === `car` && (
								<>
									<input className="credit-calculator__input-checkbox" id="kasko" type="checkbox" name="isKaskoWanted" onChange={onCheckboxChange}/>
									<label className={`credit-calculator__input-checkbox-custom ${isKaskoWanted ? `credit-calculator__input-checkbox-custom--active` : ``}`} htmlFor="kasko">Оформить КАСКО в нашем банке</label>

									<input className="credit-calculator__input-checkbox" id="life-insurance" type="checkbox" name="isLifeInsuranceWanted" onChange={onCheckboxChange}/>
									<label className={`credit-calculator__input-checkbox-custom ${isLifeInsuranceWanted ? `credit-calculator__input-checkbox-custom--active` : ``}`} htmlFor="life-insurance">Оформить Страхование жизни в нашем банке</label>
								</>
							)}
						</fieldset>
					</div>
				)}
			</div>
			<CreditOffer userCredit={userCredit} />
			<form>

			</form>
		</section>
	);
};

export default withCreditCalculator(CreditCalculator);
