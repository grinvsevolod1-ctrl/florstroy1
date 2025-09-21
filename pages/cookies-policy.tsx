import Head from 'next/head';
import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Политика использования cookies | FlorStroy</title>
        <meta
          name="description"
          content="Узнайте, как FlorStroy использует cookies для улучшения работы сайта, аналитики и персонализации контента."
        />
      </Head>

      <Page title="Политика использования cookies">
        <CookiesPolicyContainer>
          <RichText>
            <p>
              Мы используем cookies для обеспечения корректной работы сайта, анализа поведения пользователей и улучшения качества
              предоставляемых услуг. Cookies помогают нам запоминать ваши предпочтения, ускорять загрузку страниц и адаптировать контент под
              ваши интересы.
            </p>

            <p>
              Продолжая использовать сайт florstroy.ru, вы соглашаетесь с нашей политикой использования cookies. Вы можете изменить настройки
              cookies в своём браузере в любое время.
            </p>

            <strong>Типы используемых cookies:</strong>
            <ul>
              <li>Технические — обеспечивают базовую функциональность сайта</li>
              <li>Аналитические — помогают нам понимать, как вы используете сайт</li>
              <li>Функциональные — запоминают ваши настройки и предпочтения</li>
              <li>Маркетинговые — используются для персонализированной рекламы</li>
            </ul>

            <strong>Как управлять cookies:</strong>
            <p>
              Вы можете отключить cookies в настройках вашего браузера. Однако это может повлиять на работу некоторых функций сайта.
              Подробнее о настройке cookies можно узнать на официальных страницах поддержки вашего браузера.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Тип cookie</th>
                  <th>Назначение</th>
                  <th>Срок хранения</th>
                  <th>Пример</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Технические</td>
                  <td>Обеспечение работы форм и навигации</td>
                  <td>Сессия</td>
                  <td>session_id</td>
                </tr>
                <tr>
                  <td>Аналитические</td>
                  <td>Сбор статистики посещений</td>
                  <td>30 дней</td>
                  <td>_ga, _gid</td>
                </tr>
                <tr>
                  <td>Функциональные</td>
                  <td>Сохранение пользовательских настроек</td>
                  <td>1 год</td>
                  <td>language, theme</td>
                </tr>
                <tr>
                  <td>Маркетинговые</td>
                  <td>Персонализация рекламы</td>
                  <td>90 дней</td>
                  <td>fbp, gads</td>
                </tr>
              </tbody>
            </table>
          </RichText>
        </CookiesPolicyContainer>
      </Page>
    </>
  );
}

const CookiesPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
