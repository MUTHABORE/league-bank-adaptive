import React from 'react';

import Identificator from './identificator';
import {SERVICES} from '../mocks';

const Services = (props) => {
	return (
		<section className="services">
			<ul className="services__tabs">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>


			<ul className="services__list">
				{SERVICES.map((element, i) => {
					console.log(element.optoins.map((el) => el))
					return (
						<li key={i} className={`services__item services__item--${element.modificator}`}>
							<h3 className={`services__item-title  services__item-title--${element.modificator}`}>{element.title}</h3>

							<ul className={`services__options-wrapper  services__options-wrapper--${element.modificator}`}>
								{element.optoins.map((option, optionIndex) => {
									return (
										<li key={optionIndex}>
											<p className="services__option">{option}</p>
										</li>
									);
								})}
							</ul>

							{element.offer === `credit` && (
								<p className="services__offer" >Рассчитайте ежемесячный платеж {<br/>}
								и ставку по кредиту воспользовавшись нашим<a href="#top" className="services__offer-link"> кредитным калькулятором</a></p>
							)}

							{element.buttonText !== undefined && (
								<a href="#top" className="services__option-button">{element.buttonText}</a>
							)}

						</li>
					)
				})}
			</ul>

			<Identificator array={SERVICES} activeElement={1} type={`services`}/>

		</section>
	);
};

export default Services;
