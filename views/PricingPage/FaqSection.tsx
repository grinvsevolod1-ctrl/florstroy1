import styled from 'styled-components';
import Accordion from 'components/Accordion';
import SectionTitle from 'components/SectionTitle';

export default function FaqSection() {
  return (
    <Wrapper>
      <SectionTitle>Всё о бетонных полах: цены, технологии, материалы</SectionTitle>

      <Accordion title="Какие виды бетонных полов вы предлагаете?">
        Мы выполняем:
        <ul>
          <li>Бетонные полы с упрочненным верхним слоем</li>
          <li>Полимерные полы</li>
        </ul>
        Все покрытия адаптируются под нагрузку, влажность и тип эксплуатации.
      </Accordion>

      <Accordion title="Из чего состоит стоимость бетонного пола?">
        Цена формируется из:
        <ul>
          <li>Тип основания (грунт, песок, бетон, плита)</li>
          <li>Толщина слоя (обычно 80–120 мм)</li>
          <li>Армирование (сетка, фибра, арматура)</li>
          <li>Доп. работы: гидроизоляция, демпфер, швы, укладка</li>
        </ul>
      </Accordion>

      <Accordion title="Какие материалы используются?">
        Мы применяем:
        <ul>
          <li>Бетон B25–B30 с фиброй или сеткой</li>
          <li>Грунтовки и упрочнители Sika, MasterTop, KLEBEKRAFT, MONOPOL</li>
          <li>Фибра стальная анкерная 1/50</li>
          <li>Несьемная опалубка CONECTO Dauwel, FULERIT, ALFA JOINT</li>
           <li>Полимерные материалы: ЦЕМЕЗИТ, NOVAPOR</li>
        </ul>
        Все материалы сертифицированы и соответствуют ГОСТ.
      </Accordion>
      <Accordion title="Какие оборудование используется?">
        Мы применяем:
        <ul>
          <li>Затирочные машины BARIKELL, ALLEN, Whiteman</li>
          <li>Диаметром от 600 до 1600 мм</li>
          
        </ul>
        Все материалы сертифицированы и соответствуют ГОСТ.
      </Accordion>

      <Accordion title="Сколько времени занимает устройство пола?">
        <ul>
          <li>Подготовка основания — 1 день</li>
          <li>Заливка и армирование — 1–2 дня</li>
          <li>Шлифовка и покрытие — 1 день</li>
        </ul>
        В среднем: 3–5 дней на объект до 1000 м². Возможна работа поэтапно.
      </Accordion>

      <Accordion title="Какие гарантии вы даёте?">
        <ul>
          <li>Гарантия на работы — 3 года</li>
          <li>На материалы — от 12 до 36 месяцев</li>
          <li>Договор с прописанными сроками и объёмами</li>
          <li>Фотофиксация этапов и акты выполненных работ</li>
        </ul>
        Мы работаем прозрачно и официально.
      </Accordion>

    
      <Accordion title="Работаете ли вы по области или только по Москве?">
        Мы работаем по всей Московской области, включая:
        <ul>
          <li>Балашиха, Химки, Одинцово, Подольск</li>
          <li>Выезд в соседние регионы — по согласованию</li>
        </ul>
        Логистика и доставка материалов — наша забота.
      </Accordion>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 15rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  & > *:not(:first-child) {
    margin-top: 3rem;
  }

  ul {
    margin-top: 1rem;
    padding-left: 2rem;
    list-style: disc;
    font-size: 1.5rem;
    line-height: 1.6;
  }

  strong {
    font-weight: 600;
  }
`;
