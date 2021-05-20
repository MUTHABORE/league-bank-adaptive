import React from 'react';

import {valueMask} from '../util/util';
import {withCreditCalculator} from '../hocs/with-credit-calculator';

const CreditCalculator = (props) => {
	const {onOpenSelect, onCloseSelect, onOwnValueChange, isSelectOpen, ownValue, initialFee, onOwnValueBlur, onOwnValueMaskClick, onButtonOwnValueChange, onChangeInitialFee, onInitialFeeMaskClick, onInitialFeeBlur} = props;
	console.log(initialFee)
	return (
		<section className="credit-calculator">
			<h2 className="credit-calculator__title">Кредитный калькулятор</h2>
			<div className="credit-calculator__step">

				<fieldset className="credit-calculator__fieldset">
					<legend className="credit-calculator__legend">Шаг 1. Цель кредита</legend>

					<ul className="credit-calculator__select">
						<li className={`credit-calculator__option-placeholder ${isSelectOpen ? `credit-calculator__option-placeholder--open` : ``}`} onClick={isSelectOpen === false ? onOpenSelect : onCloseSelect} tabIndex="1">Выберите цель кредита</li>
						<li value="1" className="credit-calculator__option" tabIndex="1">Ипотечное кредитование</li>
						<li value="2" className="credit-calculator__option" tabIndex="1">Автомобильное кредитование</li>
					</ul>

				</fieldset>

			</div>

			<div className="credit-calculator__step">
				<fieldset className="credit-calculator__fieldset">
					<legend className="credit-calculator__legend">Шаг 2. Введите параметры кредита</legend>

					<p className="credit-calculator__input-title">Стоимость недвижимости</p>
					<div className="credit-calculator__input-wrapper">
						<button className="credit-calculator__value-changer credit-calculator__value-changer--down" onClick={onButtonOwnValueChange}></button>
						<input className="credit-calculator__input credit-calculator__input--own-value-mask" type="text" value={valueMask(ownValue)} onMouseDown={onOwnValueMaskClick} onChange={onOwnValueChange} />
						<input className="credit-calculator__input credit-calculator__input--own-value" type="number" value={ownValue} onBlur={onOwnValueBlur} onChange={onOwnValueChange} />
						<button className="credit-calculator__value-changer credit-calculator__value-changer--up" onClick={onButtonOwnValueChange}></button>
					</div>
					<small className="credit-calculator__input-info">От 1 200 000  до 25 000 000 рублей</small>

					<p className="credit-calculator__input-title">Первоначальный взнос</p>
					<input className="credit-calculator__input credit-calculator__input--initial-fee-mask" type="text" value={valueMask(initialFee)} onClick={onInitialFeeMaskClick} onChange={onChangeInitialFee} />
					<input className="credit-calculator__input credit-calculator__input--initial-fee" type="number" value={initialFee} onChange={onChangeInitialFee} onBlur={onInitialFeeBlur} />
					<input className="credit-calculator__input-range" type="range" step="5" value="10" max="100" min="10"/>
				</fieldset>
			</div>

		</section>
	);
};

export default withCreditCalculator(CreditCalculator);
