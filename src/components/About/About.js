import React from "react";
import "./About.css";
import photo from '../../images/photo.png'


function About() {
  return (
    <section className="about app__section">
      <img className="about__photo" alt="Фотография автора" src={photo}/>
      <div className="about__info">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__text">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
        <p className="about__text">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
      </div>
    </section>
  );
}

export default About;
