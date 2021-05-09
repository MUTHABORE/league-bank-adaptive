import React from 'react';

const Identificator = (props) => {
	const {array, activeElement, type=null} = props;
	console.log(type)
	return (
		<ul className={`identificator ${type === `services` ? `identificator--services` : ``}`} disabled>
			{array.map((element, index) => {
				return (
					<li key={index}>
						<label className={
							`identificator__radio ${activeElement - 1 === index ? `identificator__radio--checked` : ``} 
							${activeElement - 1 === index && type === `services` ? `identificator__radio-services--checked` : ``}`
						}>
							<input className="visually-hidden" name="identificator-radio" type="radio" />
						</label>
					</li>
				);
			})}
		</ul>
	);
};

export default Identificator;
