import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import facebookIcon from '../../images/facebook.png';
import githubIcon from '../../images/github.svg';
//---------------Компонент возвращает разметку подвала------------------------------
function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__copyright">&copy; 2020 Supersite, Powered by News API</h4>
      <nav className="footer__links">
        <ul className="footer__list">
          <li><NavLink exact to="/" className="footer__link" >Главная</NavLink></li>
          <li><a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel = "noreferrer">Яндекс.Практикум</a></li>
        </ul>
        <ul className="footer__list">
          <li><a  href="https://github.com/" target="_blank" rel = "noreferrer"><img className="footer__social-icon" alt="Иконка" src={githubIcon}/></a></li>
          <li><a  href="https://ru-ru.facebook.com/" target="_blank" rel = "noreferrer"><img className="footer__social-icon" alt="Иконка" src={facebookIcon}/></a></li>
        </ul>
      </nav>
    </footer>
  );
}
export default Footer;