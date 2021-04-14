import React, { useState } from "react";
import mainImg from '../../images/icons/books.png';
import ourTeamImg from '../../images/icons/picture team.png';
import locationImg from '../../images/icons/location.png';
import mailImg from '../../images/icons/mail.png';
import githubImg from '../../images/icons/github.png';
import telegramImg from '../../images/icons/telegram.png';

import AnnImg from '../../images/icons/ann.png';
import AnatolyImg from '../../images/icons/anatoly.png';
import AlexImg from '../../images/icons/alex.png';
import YuraImg from '../../images/icons/yura.jfif';
import YaroslavImg from '../../images/icons/yaroslav.png';

import styles from './mainPage.module.scss'

function MainPage() {

  return (
    <div className={styles.mainPage}>
      <div className={styles.container}>
        <div className={styles.sideLeft}>
          <h3>Английский - это весело!</h3>
          <div>Увлекательное приложение по изучением английского языка, покажет вам насколько интересным бывает изучение иностранных языков.  Изучайте новые слова, а затем закрепляйте их в наших мини-играх. Подстраивайте приложение под свои нужды в настройках, а также просматривайте свои успехи на странице сатистики !</div>
        </div>
        <img src={mainImg} className={styles.mainImg} alt="books" />
      </div>

      <iframe
        className={styles.video}
        src="https://www.youtube.com/embed/dybOdWZJvgM"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <div>
        <div className={styles.titleTeam}>
          <img src={ourTeamImg} alt="ourTeam" />
          <h3>Наша команда</h3>
        </div>
        
        <div>
          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AlexImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Алексей Климовской</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <a href="mailto:alexklim3221128@gmail.com" target="_blank">alexklim3221128@gmail.com</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <a href="https://github.com/Alex-Edward-Klim" target="_blank">Alex-Edward-Klim</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <a href="https://t.me/Alex_Edward_Klim" target="_blank">Alex_Edward_Klim</a>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Общая организация командной работы (является тим лидом). Участие в онлайн собраниях. Помощь остальным членам команды. Реализация собственного API приложения, авторизации и реавторизации пользователя, регистрации пользователя с возможностью загрузить фото, а также исправление критических ошибок в предоставленной заданием копии backend.</div>
            </div>
          </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AnatolyImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Анатолий Манин</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Самара, Россия</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <a href="mailto:AManin63@mail.ru" target="_blank">AManin63@mail.ru</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <a href="https://github.com/AV-63-dev" target="_blank">AV-63-dev</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <a href="https://t.me/AnatoliySamara" target="_blank">AnatoliySamara</a>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Принимал участие в обсуждении дизайна, логики игры и прочих рабочих моментов. Создание внутренних утилит: для отправки на сервер изменений в слове, универсального сбора и подготовки слов к играм. Универсальной стартовой и финальной страницы игр. Игра: карточки и саванна.</div>
            </div>
          </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AnnImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Анна Корытько</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <a href="mailto:anyakorytko@mail.ru" target="_blank">anyakorytko@mail.ru</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <a href="https://github.com/korytsa" target="_blank">korytsa</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <a href="https://t.me/korytkochechka" target="_blank">korytkochechka</a>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Принимала участие в разработке дизайна приложения. Разработка адаптивных элементов страницы, доработка страниц "Вход"  и "Регистрация". Разработка главной страницы.</div>
            </div>
          </div>

              <div className={styles.personCard}>
                <img className={styles.profilePhoto} src={YaroslavImg} alt='profilePhoto' />
                <div className={styles.infoPerson}>
                  <h4>Ярослав Трефилов</h4>

                  <div className={styles.containerLocation}>
                    <img className={styles.locationImg} src={locationImg} />
                    <div>Ижевск, Россия</div>
                  </div>

                  <div className={styles.containerInfo}>
                    <img className={styles.locationImg} src={mailImg} />
                    <a href="mailto:yaroslavtrefilov5@gmail.com" target="_blank">yaroslavtrefilov5@gmail.com</a>
                  </div>

                  <div className={styles.containerInfo}>
                    <img className={styles.locationImg} src={githubImg} />
                    <a href="https://github.com/YaroslavTrefilov" target="_blank">YaroslavTrefilov</a>
                  </div>

                  <div className={styles.containerInfo}>
                    <img className={styles.locationImg} src={telegramImg} />
                    <a href="https://t.me/Hearon" target="_blank">Hearon</a>
                  </div>

                  <h3>Вклад в разработку:</h3>
                  <div className={styles.aboutPerson}>Участие в митингах. Помощь в создании дизайна приложения. Предложение способов решений поставленных задач. Реализация мини-игры "Спринт". Реализация мини-игры "Аудивызов".</div>
                </div>
              </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={YuraImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Юрий Олейник</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Санкт-Петербург, Россия</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <a href="mailto:agent250691@yandex.ru" target="_blank">agent250691@yandex.ru</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <a href="https://github.com/NachinkaShaurmi" target="_blank">NachinkaShaurmi</a>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <a href="https://t.me/YuriyO" target="_blank">YuriyO</a>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Реализовывал функциональность электронного учебника и словаря, верстка этих разделов, написание Unit тестов, создание и наполнение карточек в таск менеджере Trello</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MainPage