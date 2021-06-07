import React from 'react';
import PropTypes from 'prop-types';

const Identificator = (props) => {
	const {array, activeElement, type=null} = props;
	return (
		<ul className={`identificator ${type === `services` ? `identificator--services` : ``}`} disabled>
			{array.map((element, index) => {
				return (
					<li key={index}>
						<label className={
							`identificator__radio ${activeElement - 1 === index ? `identificator__radio--checked` : ``} 
							${activeElement - 1 === index && type === `services` ? `identificator__radio-services--checked` : ``}`
						}>
							<input className="identificator__radio-hidden" name="identificator-radio" type="radio" />
						</label>
					</li>
				);
			})}
		</ul>
	);
};

Identificator.propTypes = {
	array: PropTypes.array.isRequired,
	activeElement: PropTypes.number.isRequired,
	type: PropTypes.string,
}

export default Identificator;
