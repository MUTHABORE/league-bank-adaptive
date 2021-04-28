import React from 'react';

const Navigation = () => {
	return (
		<nav className="navigation">
			<ul className="navigation__list navigation__list--header">
			{/* <ul className="navigation__list navigation__list--header navigation__list--open"> */}
				<li className="navigation__list-item navigation__list-item--header">
					<a className="navigation__item-link  navigation__item-link--header" href="#top">Услуги</a>
				</li>
				<li className="navigation__list-item navigation__list-item--header">
					<a className="navigation__item-link  navigation__item-link--header" href="#top">Рассчитать кредит</a>
				</li>
				<li className="navigation__list-item navigation__list-item--header">
					<a className="navigation__item-link  navigation__item-link--header" href="#top">Конвертер валют</a>
				</li>
				<li className="navigation__list-item navigation__list-item--header">
					<a className="navigation__item-link  navigation__item-link--header" href="#top">Контакты</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
