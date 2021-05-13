import React from 'react';

import {withCreditCalculator} from '../hocs/with-credit-calculator';

const CreditCalculator = (props) => {
	console.log(props)
	const {onOpenSelect, onCloseSelect, isSelectOpen} = props;
	return (
		<section className="credit-calculator">
			<h2 className="credit-calculator__title">Кредитный калькулятор</h2>
			<div className="credit-calculator__step">

				<fieldset className="credit-calculator__fieldset">
					<legend className="credit-calculator__legend">Шаг 1. Цель кредита</legend>

					<ul className="credit-calculator__select">
						<li className={`credit-calculator__option-placeholder ${isSelectOpen ? `credit-calculator__option-placeholder--open` : ``}`} onClick={isSelectOpen === false ? onOpenSelect : onCloseSelect}>Выберите цель кредита</li>
						<li value="1" className="credit-calculator__option">Ипотечное кредитование</li>
						<li value="2" className="credit-calculator__option">Автомобильное кредитование</li>
						<li value="3" className="credit-calculator__option">Авdsadsadsие</li>
					</ul>

				</fieldset>

			</div>

			<div className="credit-calculator__step">
				<fieldset className="credit-calculator__fieldset">
					<legend className="credit-calculator__legend">Шаг 2. Введите параметры кредита</legend>

					<div className="credit-calculator__input-wrapper">
						<small className="credit-calculator__input-title">Стоимость недвижимости</small>
						<button className="credit-calculator__value-changer credit-calculator__value-changer--down"></button>
						<input className="credit-calculator__input credit-calculator__input--property-value" type="number"/>
						<button className="credit-calculator__value-changer credit-calculator__value-changer--up"></button>
						<small className="credit-calculator__input-info">От 1 200 000  до 25 000 000 рублей</small>
					</div>
				</fieldset>
			</div>

		</section>
	);
};

export default withCreditCalculator(CreditCalculator);
