import React from 'react';
import './About.css';
import avatar from '../../images/avatar.png';
//---------------Компонент возвращает разметку секции "Об авторе"------------------------------
function About() {
  return (
    <section className="about">
      <img className="about__avatar" alt="Аватар" src={avatar}/>
      <div>
        <h3 className="about__title">Об авторе</h3>
        <p className="about__text">Зовут меня Рязанов Роман, я начинающий фронтенд разработчик. Этот ресурс является дипломной работой программы обучения "Вэб-разработчик" Яндек.Практикума. За 8 месяцев обучения в Яндек.Практикуме я освоил: HTML и CSS, JavaScript, React и Express. Обучение в Яндек.Практикуме разбито на 6 курсов, каждый курс разбит на спринты, каждый спринт длиться 2 недели и занимает около 20 часов времени, в конце каждого спринта необходимо сдать квалификационную работу, которая проходит проверку опытными программистами.</p>
      </div>      
    </section>
  );
}
export default About;