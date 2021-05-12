import React from 'react';

import {withCreditCalculator} from '../hocs/with-credit-calculator';

const CreditCalculator = (props) => {
	console.log(props)
	const {onSelectOpenClick} = props;
	return (
		<section className="credit-calculator">
			<h2 className="credit-calculator__title">Кредитный калькулятор</h2>
			<div className="credit-calculator__wrapper">

				<fieldset className="credit-calculator__fieldset">
					<legend className="credit-calculator__legend">Шаг 1. Цель кредита</legend>

					<ul className="credit-calculator__select">
						<li className="credit-calculator__option credit-calculator__option--placeholder" onClick={onSelectOpenClick}>Выберите цель кредита</li>
						<li value="1" className="credit-calculator__option">Ипотечное кредитование</li>
						<li value="2" className="credit-calculator__option">Автомобильное кредитование</li>
					</ul>

				</fieldset>

			</div>
		</section>
	);
};

export default withCreditCalculator(CreditCalculator);
