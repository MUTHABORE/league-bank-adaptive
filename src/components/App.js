import React from 'react';

const App = (props) => {
  return (
    <React.Fragment>
      <header className="site-header">
        <h1 className="visually-hidden">ЛИГА Банк. Доступные кредиты для Вас.</h1>
        <section className="site-header__menu">
          <a href="#top" className="site-header__logo" aria-label="Логотип ЛИГА Банк"></a>
          <nav className="navigation">
            <ul className="navigation__list navigation__list--header">
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
          <a className="site-header__login" href="#top">Войти в Интернет-банк</a>
        </section>
      </header>
          
      <main>

        <section className="slider">
          <div className="slider__background"></div>
          <div className="slider__container">
            <div className="slider__block">
              <h2 className="slider__title">Лига Банк</h2>
              <p className="slider__text">Кредиты на любой случай</p>
              <a className="slider__button" href="#top">Рассчитать кредит</a>
            </div>
          </div>
        </section>

      </main>
      <footer className="footer">
        <div className="footer__container center">
          <div className="address">
            <a href="#top" className="site-logo">
              <h2 className="site-logo__title site-logo__title--footer">ЛИГА Банк</h2>
            </a>
            <div className="address__location">
              <p className="address__text">150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050 Ⓒ Лига Банк, 2019</p>
            </div>
          </div>
          <nav className="navigation">
              <ul className="navigation__list navigation__list--footer">
                <li className="navigation__list-item navigation__list-item--footer">
                  <a className="navigation__item-link  navigation__item-link--footer" href="#top">Услуги</a>
                </li>
                <li className="navigation__list-item navigation__list-item--footer">
                  <a className="navigation__item-link  navigation__item-link--footer" href="#top">Рассчитать кредит</a>
                </li>
                <li className="navigation__list-item navigation__list-item--footer">
                  <a className="navigation__item-link  navigation__item-link--footer" href="#top">Контакты</a>
                </li>
                <li className="navigation__list-item navigation__list-item--footer">
                  <a className="navigation__item-link  navigation__item-link--footer" href="#top">Задать вопрос</a>
                </li>
              </ul>
            </nav>
          <div className="hotline">
            <div className="hotline__phone hotline__phone--cell">
              <p className="hotline__title hotline__title--cellphone">*0904</p>
              <small className="hotline__info hotline__info--cellphone">Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</small>
            </div>
            <div className="hotline__phone hotline__phone--regular">
              <p className="hotline__title hotline__title--phone">8 800 111 22 33</p>
              <small className="hotline__info hotline__info--phone">Бесплатный для всех городов России</small>
            </div>
          </div>
          <ul className="social">
            <li className="social__item">
              <a class="social__link social__link--facebook" href="#top">Наша страница в Фейсбук</a>
            </li>
            <li className="social__item">
              <a class="social__link social__link--instagram" href="#top">Наша страница в Инстаграм</a>
            </li>
            <li className="social__item">
              <a class="social__link social__link--twitter" href="#top">Наша страница в Твиттер</a>
            </li>
            <li className="social__item">
              <a class="social__link social__link--youtube" href="#top">Наша страница в Ютьюб</a>
            </li>
          </ul>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default App;
