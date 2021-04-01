import React, { useState } from "react";
import mainImg from '../../images/icons/books.png';
import ourTeamImg from '../../images/icons/picture team.png';
import locationImg from '../../images/icons/location.png';
import mailImg from '../../images/icons/mail.png';
import githubImg from '../../images/icons/github.png';
import telegramImg from '../../images/icons/telegram.png';

import AnnImg from '../../images/icons/ann.jpg';

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
            <img className={styles.profilePhoto} src={AnnImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Алексей Климовской</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <div>anyakorytko@mail.ru</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <div>korytsa</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <div>korytkochechka</div>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Предложение способов решений поставленных задач. Помощь другим разработчикам. Реализация мини-игры "Аудиовызов". Реализация страницы "Авторизация".</div>
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
                <div>anyakorytko@mail.ru</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <div>korytsa</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <div>korytkochechka</div>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Предложение способов решений поставленных задач. Помощь другим разработчикам. Реализация мини-игры "Аудиовызов". Реализация страницы "Авторизация".</div>
            </div>
          </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AnnImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Ярослав Трефилов</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <div>anyakorytko@mail.ru</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <div>korytsa</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <div>korytkochechka</div>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Предложение способов решений поставленных задач. Помощь другим разработчикам. Реализация мини-игры "Аудиовызов". Реализация страницы "Авторизация".</div>
            </div>
          </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AnnImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Юрий Олейник</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <div>anyakorytko@mail.ru</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <div>korytsa</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <div>korytkochechka</div>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Предложение способов решений поставленных задач. Помощь другим разработчикам. Реализация мини-игры "Аудиовызов". Реализация страницы "Авторизация".</div>
            </div>
          </div>

          <div className={styles.personCard}>
            <img className={styles.profilePhoto} src={AnnImg} alt='profilePhoto' />
            <div className={styles.infoPerson}>
              <h4>Анатолий Манин</h4>

              <div className={styles.containerLocation}>
                <img className={styles.locationImg} src={locationImg} />
                <div>Минск, Беларусь</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={mailImg} />
                <div>anyakorytko@mail.ru</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={githubImg} />
                <div>korytsa</div>
              </div>

              <div className={styles.containerInfo}>
                <img className={styles.locationImg} src={telegramImg} />
                <div>korytkochechka</div>
              </div>

              <h3>Вклад в разработку:</h3>
              <div className={styles.aboutPerson}>Участие в митингах. Предложение способов решений поставленных задач. Помощь другим разработчикам. Реализация мини-игры "Аудиовызов". Реализация страницы "Авторизация".</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MainPage