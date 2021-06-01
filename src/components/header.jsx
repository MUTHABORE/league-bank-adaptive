import React from 'react';

import {withHeader} from '../hocs/with-header';

import Navigation from './navigation';
import LoginPopup from './login-popup';

const Header = (props) => {
	const {isNavigationOpen, isPopupOpen, onPopupOpenClick, onPopupClose, onNavigationOpen, onNavigationClose} = props;
	return (
		<header className="site-header">
			<h1 className="visually-hidden">ЛИГА Банк. Доступные кредиты для Вас.</h1>
			<section className="site-header__menu">
				<button className="site-header__burger" aria-label="Открыть или закрыть окно навигации" onClick={onNavigationOpen}></button>
				<a href="#top" className="site-header__logo" aria-label="Логотип ЛИГА Банк"></a>

				<Navigation isNavigationOpen={isNavigationOpen}/>
				
					<div className={`site-header__login ${isNavigationOpen ? `site-header__login--open` : ``}`} onClick={onPopupOpenClick}>

						<a className={`site-header__login-title ${isNavigationOpen ? `site-header__login-title--open` : ``}`} href="#top">Войти в Интернет-банк</a>

						{isPopupOpen && (
							<LoginPopup onPopupClose={onPopupClose} />
						)}

					</div>
				<button className={`site-header__cross ${isNavigationOpen ? `site-header__cross--open` : ``}`} aria-label="Закрыть окно навигации" onClick={onNavigationClose}></button>
			</section>
		</header>
	);
}

export default withHeader(Header);
