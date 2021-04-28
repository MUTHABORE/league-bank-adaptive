import React from 'react';

import Navigation from './navigation';
import LoginPopup from './login-popup';

const Header = () => {
	return (
		<header className="site-header">
			<h1 className="visually-hidden">ЛИГА Банк. Доступные кредиты для Вас.</h1>
			<section className="site-header__menu">
			{/* <section className="site-header__menu site-header__menu--open"> */}
				<button className="site-header__burger" aria-label="Открыть или закрыть окно навигации"></button>
				<a href="#top" className="site-header__logo" aria-label="Логотип ЛИГА Банк"></a>

				<Navigation />

				<div className="site-header__login">
				{/* <div className="site-header__login site-header__login--open"> */}
					<a className="site-header__login-title" href="#top">Войти в Интернет-банк</a>
					{/* <a className="site-header__login-title site-header__login-title--open" href="#top">Войти в Интернет-банк</a> */}

					<LoginPopup />

				</div>
				<button className="site-header__cross" aria-label="Закрыть окно навигации"></button>
				{/* <button className="site-header__cross site-header__cross--open" aria-label="Закрыть окно навигации"></button> */}
			</section>
		</header>
	);
}

export default Header;
