import React from 'react';

import {withCreditRequest} from '../hocs/with-credit-request';

const CreditRequest = (props) => {
	const {nameFieldRef, onFormSubmit} = props;
	return (
		<form className="credit-request" onSubmit={onFormSubmit}>
			<fieldset className="credit-request__fieldset">
				<legend className="credit-request__title">Шаг 3. Оформление заявки</legend>
					<ul className="credit-request__credit-info">
						<li className="credit-request__credit-info-item">
							<p className="credit-request__credit-info-parameter">№ 0010</p>
							<h4 className="credit-request__credit-info-title">Номер заявки</h4>
						</li>
						<li className="credit-request__credit-info-item">
							<p className="credit-request__credit-info-parameter">Ипотека</p>
							<h4 className="credit-request__credit-info-title">Цель кредита</h4>
						</li>
						<li className="credit-request__credit-info-item">
							<p className="credit-request__credit-info-parameter">2 000 000 рублей</p>
							<h4 className="credit-request__credit-info-title">Стоимость недвижимости</h4>
						</li>
						<li className="credit-request__credit-info-item">
							<p className="credit-request__credit-info-parameter">200 000 рублей</p>
							<h4 className="credit-request__credit-info-title">Первоначальный взнос</h4>
						</li>
						<li className="credit-request__credit-info-item">
							<p className="credit-request__credit-info-parameter">5 лет</p>
							<h4 className="credit-request__credit-info-title">Срок кредитования</h4>
						</li>
					</ul>
						<fieldset className="credit-request__user-info">
							<input ref={nameFieldRef} className="credit-request__user-info-field credit-request__user-info-field--name" type="text" placeholder="ФИО" required />
							<input className="credit-request__user-info-field credit-request__user-info-field--phone" type="tel" placeholder="Телефон" required />
							<input className="credit-request__user-info-field credit-request__user-info-field--email" type="email" placeholder="E-mail" required />
						</fieldset>
			</fieldset>
			<button className="credit-request__submit" type="submit">Отправить</button>
		</form>
	);
};

// export default CreditRequest;
export default withCreditRequest(CreditRequest);