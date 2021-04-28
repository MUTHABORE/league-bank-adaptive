import React from 'react';

const LoginPopup = () => {
	return (
		<section className="login-popup">
			<form className="login-popup__form">
				<div className="login-popup__header">
					<a className="login-popup__logo" href="#top" aria-label="Логотип Лига Банка"></a>
					<button className="login-popup__close-button" type="button" aria-label="Закрыть окно входа в личный кабинет"></button>
				</div>
				<fieldset className="login-popup__wrapper">
					<legend className="visually-hidden">Вход в личный кабинет</legend>

					<label className="login-popup__field">
						<span className="login-popup__input-title">Логин</span>
						<input className="login-popup__input" type="text" autoFocus></input>
					</label>
					<label className="login-popup__field login-popup__field--secret">
						<span className="login-popup__input-title">Пароль</span>
						<input className="login-popup__input" type="text"></input>
						<button className="login-popup__field-button-secret" type="button" aria-label="Показать или скрыть пароль"></button>
					</label>
					<a className="login-popup__help" href="#top">Забыли пароль?</a>
					<button className="login-popup__submit-button" type="submit">Войти</button>
				</fieldset>
			</form>
		</section>
	);
};

export default LoginPopup;
