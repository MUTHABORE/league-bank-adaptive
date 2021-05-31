import React from 'react';

const FormPopup = (props) => {
	return (
		<div className="form-popup__overlay">
			<div className="form-popup">
				<button className="form-popup__close-button" type="button"></button>
				<b className="form-popup__title">Спасибо за обращение в наш банк.</b>
				<p className="form-popup__text">Наш менеджер скоро свяжется с вами по указанному номеру телефона</p>
			</div>
		</div>
	)
};

export default FormPopup;
