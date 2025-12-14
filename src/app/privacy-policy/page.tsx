import MainTemplate from '@/components/common/main-template/main-template';
import './_privacy-policy.scss';

export default function PrivacyPolicyPage() {
  return (
    <MainTemplate>
      <div className="privacy-policy-page">
        <div className="container">
          <h1 className="main-title">Политика конфендициальности</h1>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">1. Общие положения</h2>
              <p className="section-text">
                Настоящая Политика конфендициальности определяет порядок
                обработки и защиты персональных данных пользователей веб-сайта
                (далее — «Сайт»), принадлежащего нашей компании. Используя Сайт,
                вы соглашаетесь с условиями настоящей Политики.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">2. Сбор персональных данных</h2>
              <p className="section-text">
                Мы собираем следующие категории персональных данных:
              </p>
              <ul className="privacy-list">
                <li>
                  Имя и контактная информация (электронная почта, телефон)
                </li>
                <li>
                  Информация, предоставленная при заполнении форм на Сайте
                </li>
                <li>
                  Технические данные (IP-адрес, тип браузера, операционная
                  система)
                </li>
                <li>
                  Данные о взаимодействии с Сайтом (время посещения,
                  просмотренные страницы)
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">
                3. Цели обработки персональных данных
              </h2>
              <p className="section-text">
                Мы используем собранные персональные данные для следующих целей:
              </p>
              <ul className="privacy-list">
                <li>
                  Предоставление услуг по разработке веб-сайтов и веб-приложений
                </li>
                <li>Обработка заявок и запросов пользователей</li>
                <li>
                  Улучшение качества обслуживания и функциональности Сайта
                </li>
                <li>
                  Информирование о новых услугах и специальных предложениях
                </li>
                <li>Обеспечение безопасности и предотвращение мошенничества</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">4. Защита персональных данных</h2>
              <p className="section-text">
                Мы применяем современные технические и организационные меры для
                защиты персональных данных от несанкционированного доступа,
                изменения, раскрытия или уничтожения. Все данные хранятся на
                защищенных серверах с использованием шифрования и других средств
                защиты информации.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">
                5. Передача персональных данных третьим лицам
              </h2>
              <p className="section-text">
                Мы не передаем персональные данные третьим лицам, за исключением
                следующих случаев:
              </p>
              <ul className="privacy-list">
                <li>
                  Когда передача необходима для предоставления запрошенных услуг
                </li>
                <li>
                  Когда передача требуется по законодательству или по запросу
                  государственных органов
                </li>
                <li>
                  Когда пользователь дал явное согласие на передачу данных
                </li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">6. Использование файлов cookie</h2>
              <p className="section-text">
                Сайт использует файлы cookie для улучшения пользовательского
                опыта и анализа посещаемости. Вы можете настроить свой браузер
                для отказа от приема файлов cookie, однако это может ограничить
                функциональность Сайта.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">7. Права пользователей</h2>
              <p className="section-text">Вы имеете право:</p>
              <ul className="privacy-list">
                <li>Получать информацию о ваших персональных данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
                <li>Ограничить обработку ваших персональных данных</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">8. Хранение данных</h2>
              <p className="section-text">
                Персональные данные хранятся в течение срока, необходимого для
                достижения целей их обработки, или в течение срока,
                установленного законодательством. После истечения срока хранения
                данные удаляются или обезличиваются.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">
                9. Изменения в Политике конфендициальности
              </h2>
              <p className="section-text">
                Мы оставляем за собой право вносить изменения в настоящую
                Политику конфендициальности. Все изменения вступают в силу с
                момента их публикации на Сайте. Рекомендуем периодически
                просматривать данную страницу для ознакомления с актуальной
                информацией.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">10. Контактная информация</h2>
              <p className="section-text">
                По всем вопросам, связанным с обработкой персональных данных и
                настоящей Политикой конфендициальности, вы можете обращаться к
                нам через контактную форму на Сайте или по электронной почте,
                указанной в разделе контактов.
              </p>
            </section>

            <div className="privacy-footer">
              <p className="last-updated">
                Последнее обновление:{' '}
                {new Date().toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
