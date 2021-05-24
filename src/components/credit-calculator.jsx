import React from 'react';

import {valueMask} from '../util/util';
import {withCreditCalculator} from '../hocs/with-credit-calculator';

const CreditCalculator = (props) => {
	const {creditType, onOpenSelect, onCloseSelect, onOwnValueChange, isSelectOpen, ownValue, initialFee, maxInitialFee, minInitialFee, onOwnValueBlur, onOwnValueMaskClick, onButtonOwnValueChange, onChangeInitialFee, onInitialFeeMaskClick, onInitialFeeBlur, onInitialFeeRangeChange, onLoanTermsChange, onLoanTermsBlur, onLoanTermsMaskClick, loanTerms} = props;
	console.log(initialFee, maxInitialFee, minInitialFee)
	return (
		<section className="credit-calculator">
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
							<input className="credit-calculator__input-range" type="range" step={maxInitialFee * 0.05 || 0} value={initialFee} min={minInitialFee || 0} max={maxInitialFee || 0} onChange={onInitialFeeRangeChange} />
							<small className="credit-calculator__input-range-min-title">{creditType === `mortgage` ? `10%` : `20%`}</small>
						</div>

						<p className="credit-calculator__input-title">Срок кредитования</p>
						<input className="credit-calculator__input credit-calculator__input--loan-terms-mask" type="text" value={loanTerms ? loanTerms + ` лет` : ``} onClick={onLoanTermsMaskClick} onChange={onLoanTermsChange} />
						<input className="credit-calculator__input credit-calculator__input--loan-terms" type="number" value={loanTerms} onChange={onLoanTermsChange} onBlur={onLoanTermsBlur} />
					</fieldset>
				</div>
			)}


		</section>
	);
};

export default withCreditCalculator(CreditCalculator);
