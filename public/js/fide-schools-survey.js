const surveyJson = {
  locale: "en",
  showQuestionNumbers: "off",
  showProgressBar: "bottom",
  pages: [
    {
      elements: [
        {
          html: {
            default:
              "<p>We examine your school's suitability for the FIDE Chess School Award in ten categories. There are guiding questions for each category. There is no need to answer every guiding question.<br>Enhance your application by providing detailed information in your descriptions and by sending us relevant supporting material.</p>",
            de: "<p>Wir prüfen die Eignung Ihrer Schule für den FIDE Schachschulpreis in zehn Kategorien. Für jede Kategorie gibt es Leitfragen. Es ist nicht erforderlich, jede Leitfrage zu beantworten.<br>Verbessern Sie Ihre Bewerbung, indem Sie ausführliche Informationen in Ihren Beschreibungen bereitstellen und uns relevante unterstützende Materialien zusenden.</p> ",
            es: "<p>Examinamos la idoneidad de su escuela para el Premio de Escuela de Ajedrez de la FIDE en diez categorías. Hay preguntas guía para cada categoría. No es necesario responder a todas las preguntas orientativas.<br>Mejore su aplicación proporcionando información detallada en sus descripciones y enviándonos material de apoyo relevante.</p>",
            ru: "<p>Мы проверяем соответствие Вашей школы Награде ФИДЕ для школьных шахмат по десяти категориям. Для каждой категории есть  руководящие (наводящие) вопросы. Вам не нужно отвечать на каждый вопрос.<br>Дополните свою заявку, предоставив подробную информацию в описании и отправив нам соответствующие вспомогательные  (дополнительные) материалы.</p>",
          },
          type: "html",
        },
        {
          name: "email",
          title: {
            default: "E-mail",
            de: "E-Mail",
            es: "Correo electrónico",
            ru: "Адрес электронной почты",
          },
          type: "text",
        },
        {
          name: "fullName",
          title: {
            default: "Your full name.",
            de: "Einstellungen ändern Ihr vollständiger Name.",
            es: "Tu nombre completo",
            ru: "Ваше имя (ФИО)",
          },
          type: "text",
        },
        {
          name: "areYouMainContact",
          title: {
            default: "Are you the main contact person for this application?",
            de: "Sind Sie der Hauptansprechpartner für diese Bewerbung?",
            es: "¿Es usted la persona de contacto principal para esta solicitud?",
            ru: "Являетесь ли Вы основным контактным лицом по данной заявке?<br>*(пожалуйста, отметьте только один вариант ответа)*",
          },
          type: "radiogroup",
          choices: [
            {
              value: "yes",
              text: { default: "yes", de: "Ja", es: "Si", ru: "Да" },
            },
            {
              value: "no",
              text: { default: "no", de: "Nein", es: "No", ru: "Нет" },
            },
          ],
          isRequired: true,
        },
      ],
    },
    {
      visibleIf: "{areYouMainContact} = 'no'",
      elements: [
        {
          html: {
            default: "<h4>Main Contact Person</h4>",
            de: "<h4>Hauptansprechpartner</h4>",
            es: "<h4>Persona de Contacto principal</h4>",
            ru: "<h4>основного контактного лица</h4>",
          },
          type: "html",
        },
        {
          name: "mainContactName",
          title: {
            default: "Name of main Contact Person",
            de: "Name des Hauptansprechpartners",
            es: "Nombre de la Persona de Contacto principal",
            ru: "Имя основного контактного лица (ФИО)",
          },
          type: "text",
        },
        {
          name: "mainContactEmail",
          title: {
            default: "Email of main Contact Person",
            de: " E-Mail des Hauptansprechpartners",
            es: "Correo electrónico de la persona de contacto principal",
            ru: "Адрес электронной почты основного контактного лица",
          },
          type: "text",
          validators: [
            { type: "email", text: "Value must be a valid email address" },
          ],
        },
      ],
    },
    {
      elements: [
        {
          html: {
            default: "<h4>School information</h4>",
            de: "<h4>Schulinformationen</h4>",
            es: "<h4></h4>",
            ru: "<h4></h4>",
          },
          type: "html",
        },
        {
          name: "nameOfSchool",
          title: {
            default: "Name of School:",
            de: "Name der Schule",
            es: "Nombre de Escuela",
            ru: "Наименование школы (полное)",
          },
          type: "text",
        },
        {
          name: "otherSchoolDetails",
          title: {
            default: "Provide here other details about your School:",
            de: "Geben Sie hier weitere Details zu Ihrer Schule an:",
            es: "Proporcione aquí otros detalles sobre su escuela:",
            ru: "Укажите дополнительную информацию о вашей школе: ",
          },
          description: {
            default:
              "-country<br>-postal address<br>-email-address<br>-phone number<br>-website",
            de: "-Land;<br>-Postanschrift;<br>-E-Mail-Adresse;<br>-Telefonnummer;<br>-Website",
            es: "-país;<br>-dirección postal;<br>-dirección de correo electrónico;<br>-número de teléfono;<br>-sitio web.",
            ru: "- Страна;<br>- Почтовый адрес;<br>- Адрес электронной почты;<br>- Номер телефона;<br>- Веб-сайт.",
          },
          type: "comment",
          rows: 3,
          autoGrow: true,
        },
        {
          name: "typeOfSchool",
          title: {
            default: "Type of School",
            de: "Art der Schule",
            es: "Tipo de escuela",
            ru: "К какому виду школы относится Ваше учреждение?<br>*(пожалуйста, отметьте только один вариант ответа)*",
          },
          type: "radiogroup",
          choices: [
            {
              value: "Primary and middle schools (ages 6-14)",
              text: {
                default: "Primary and middle schools (ages 6-14)",
                de: "Grund- und Mittelschulen (6-14 Jahre)",
                es: "Primaria y escuela media (edades 6-14)",
                ru: "Начальная и средняя школа (6-14 лет)",
              },
            },
            {
              value: "Secondary schools (age up to12-18 years)",
              text: {
                default: "Secondary schools (age up to12-18 years)",
                de: "Sekundarschulen (12-18 Jahre)",
                es: "Secundaria schools (edad por encima de los 12-18 years)",
                ru: "Средняя школа (12-18 лет)",
              },
            },
            {
              value: "Both (age 6-18 years)",
              text: {
                default: "Both (age 6-18 years)",
                de: "Beide (Alter 6-18 Jahre)",
                es: "Ambos (edad 6-18 años)",
                ru: "Общая средняя школа (6-18 лет)",
              },
            },
          ],
          isRequired: true,
        },
        {
          name: "schoolId",
          title: {
            default:
              "We require an ID on any material you send to us. We ask you to choose this ID (e.g. your school name 'LimaHighSchool').",
            de: 'Wir benötigen eine Kennung für alle Materialien, die Sie uns zusenden. Wir bitten Sie, diese Kennung zu wählen (z. B. der Name Ihrer Schule "LimaHighSchool").',
            es: 'Requerimos una identificación en cualquier material que nos envíe. Le pedimos que elija esta identificación (por ejemplo, el nombre de su escuela "ColegioLima").',
            ru: "Нам необходимо присвоить идентификатор (ID) для всех материалов, которые Вы нам передаете. Просим Вас выбрать такой идентификатор (ID) и указать его ниже<br>(указывается название **на английском без пробелов,** например, EnglishGymnasium7 или SOSH1578)",
          },
          description: {
            default: "Enter your ID here:",
            de: "Geben Sie hier Ihre Kennung ein:",
            es: "Ingresa tu DNI aquí:",
            ru: "Введите свой идентификатор (ID) ниже:",
          },
          type: "text",
        },
      ],
    },
    {
      elements: [
        {
          html: {
            default:
              "<h4>School Application Categories</h4><p>We are keen to learn about chess in the life of your school, wherever you are in the world. No matter where your school is located, chess is our common language.<br>In your description write at least five sentences.<br>Examples for supporting materials:</p><ul><li>Pictures with captions;</li><li>short videos;</li><li>website screenshots;</li><li>promotional materials;</li><li>newsletters;</li><li>copies of newspaper articles;</li><li>other documents;</li><li>testimonials;</li><li>links to websites, social media posts and relevant events.</li></ul>",
            de: "<h4>Bewerbungskategorien</h4><p>Wir sind daran interessiert, mehr über Schach im Leben Ihrer Schule zu erfahren, egal wo Sie auf der Welt sind. Unabhängig davon, wo sich Ihre Schule befindet, ist Schach unsere gemeinsame Sprache.<br>Schreiben Sie in Ihrer Beschreibung mindestens fünf Sätze.</p>",
            es: "<h4>Categorías de aplicación</h4><p>Estamos interesados en conocer sobre el ajedrez en la vida de su escuela, en cualquier lugar del mundo en el que se encuentre. No importa dónde esté ubicada tu escuela, el ajedrez es nuestro lenguaje común.<br>En tu descripción escribe al menos cinco oraciones.</p>",
            ru: "<h4>Категории заявки</h4><p>Нам очень интересно узнать, как развивается шахматная жизнь в Вашей школе, где бы Вы ни жили. Независимо от того, где находится Ваша школа, шахматы – наш общий язык. Пожалуйста, не менее, чем в пяти предложениях расскажите о том, как преподаются шахматы в Вашей школе.</p>",
          },
          type: "html",
        },
        {
          name: "facilities",
          title: {
            default:
              "**1. Facilities**<br>Describe the facilities that enable chess instruction in your school.",
            de: "**1. Einrichtungen**<br>Beschreiben Sie die Einrichtungen, die den Schachunterricht an Ihrer Schule ermöglichen.",
            es: "**1. Instalaciones**<br>Describe las instalaciones en las que se desarrolla la enseñanza de ajedrez en su escuela.",
            ru: "**1.Оборудование**<br>Опишите средства, позволяющие преподавать шахматы в вашей школе.",
          },
          description: {
            deafult:
              "<span></span><ul><li>Do you have a special chess room or a chess corner where chess classes are held? If so, how is it set up?</li><li>Do children have access to it in their free time; during lunch hour or break times?</li><li>Where is chess equipment stored?</li><li>What chess materials do the children use?</li><li>Are chess boards available throughout the day?</li><li>If the chess teacher has to set up a regular classroom for chess class, how is it done?</li><li>What equipment is used to deliver chess instruction?</li><li>Do you happen to have a game area with other strategy games playable?</li><li>Do you have a garden chess set for outdoor play?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügen Sie über einen speziellen Schachraum oder eine Schachecke, in der Schachunterricht stattfindet? Wenn ja, wie ist es eingerichtet?</li><li>Haben Kinder in ihrer Freizeit Zugang dazu? in der Mittags- oder Pausenzeit?</li><li>Wo wird die Schachausrüstung aufbewahrt?</li><li>Welche Schachmaterialien nutzen die Kinder?</li><li>Stehen den ganzen Tag über Schachbretter zur Verfügung?</li><li>Wenn der Schachlehrer einen regulären Klassenraum für den Schachunterricht einrichten muss, wie geht das vor?</li><li>Welche Austattung wird für den Schachunterricht verwendet?</li><li>Haben Sie einen Spielbereich, in dem andere Strategiespiele spielbar sind?</li><li>Haben Sie ein Gartenschachspiel zum Spielen im Freien?</li></ul><span></span>",
            es: "<span></span><ul><li>¿Tienes una sala especial de ajedrez o un rincón de ajedrez donde se imparten clases de ajedrez? Si es así, ¿cómo está configurada?</li><li>¿Los niños tienen acceso a él en su tiempo libre? ¿durante la hora del almuerzo o los descansos?</li><li>¿Dónde se guardan los juegos de ajedrez?</li><li>¿Qué materiales de ajedrez utilizan los niños?</li><li>¿Hay tableros de ajedrez disponibles durante todo el día?</li><li>Si el profesor de ajedrez tiene que montar un aula normal para la clase de ajedrez, ¿cómo lo hace?</li><li>¿Qué materiales se utilizan para impartir instrucción de ajedrez?</li><li>¿Tienes un área de juego con otros juegos de estrategia para jugar?</li><li>¿Tienes un juego de ajedrez de jardín para jugar al aire libre?</li></ul><span></span>",
            ru: "<span></span><ul><li>Есть ли у вас специализированный шахматный класс или шахматный уголок, где проводятся занятия по шахматам? Если да, то как он обустроен?</li><li>Имеют ли дети доступ к нему в свободное время; во время обеда или перемен?</li><li>Где хранится шахматное оборудование?</li><li>Какие шахматные материалы используют дети?</li><li>Доступны ли шахматные доски в течение дня?</li><li>Если учителю шахмат необходимо организовать обычный класс для занятий шахматами, как это сделать?</li><li>Какое оборудование (какой инвентарь) используется для обучения шахматам?</li><li>Есть ли в школе игровая зона, где можно играть в другие стратегические игры?</li><li>Есть ли у Вас садовые (уличные) шахматы для игры на свежем воздухе?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "studentInvolvment",
          title: {
            default:
              "**2. Student involvement**<br>Provide details about student involvement in chess activities.",
            de: "**2.Einbindung der Lernenden**<br>Geben Sie Einzelheiten zur Beteiligung der SchülerInnen an Schachaktivitäten an.",
            es: "**2. Participación de los estudiantes**<br>Proporcione detalles sobre la participación de los estudiantes en las actividades de ajedrez.",
            ru: "**2. Вовлечение учеников**<br>Предоставьте, пожалуйста, подробную информацию о вовлечении учащихся в шахматную деятельность.",
          },
          description: {
            default:
              "<span></span><ul><li>How many children attend your school?</li><li>How many children play chess? What percentage of children play chess? </li><li>Which age-group(s) are offered chess instruction? </li><li>What is the form of chess instruction: compulsory lessons, optional lessons, after-school club, lunchtime club, another format? </li><li>How much time per week does chess instruction happen? </li><li>Are students playing chess together, or are they separated by age or skill level?</li></ul><span></span>",
            de: "<span></span><ul><li>Wie viele Kinder besuchen Ihre Schule?</li><li>Wie viele Kinder spielen Schach (Anzahl)?</li><li>Wie viel Prozent der Kinder spielen Schach?</li><li>Für welche Altersgruppe(n) wird Schachunterricht angeboten?</li><li>Was ist die Form des Schachunterrichts: Pflichtunterricht, Wahlunterricht, im Hort, Mittagsclub, ein außerschulischer Neigungskurs oder ein anderes Format?</li><li>Welchen Zeitumfang pro Woche hat der Schachunterricht?</li><li>Spielen die Schüler gemeinsam Schach oder sind sie nach Alter oder Fähigkeitsniveau getrennt?</li></ul><span></span>",
            es: "<span></span><ul><li>¿Cuántos niños asisten a su escuela?</li><li>¿Cuántos niños juegan al ajedrez? ¿Qué porcentaje de niños juegan al ajedrez?</li><li>¿A qué grupos de edad se les ofrece instrucción de ajedrez?</li><li>¿Cuál es la forma de enseñanza del ajedrez: lecciones obligatorias, lecciones opcionales, club después de la escuela, club a la hora del almuerzo, otro formato?</li><li>¿Cuánto tiempo por semana se imparte la instrucción de ajedrez?</li><li>¿Los alumnos juegan juntos al ajedrez o están separados por edad o nivel?</li></ul><span></span>",
            ru: "<span></span><ul><li>Сколько детей посещают вашу школу?</li><li>Сколько детей играют в шахматы? Какой процент детей играет в шахматы?</li><li>Для каких возрастных групп проводятся занятия по шахматам?</li><li>В какой форме проводится обучение шахматам: обязательные уроки, факультативные занятия, внеклассный кружок, обеденный кружок, другой формат?</li><li>Сколько времени в неделю проводятся занятия по шахматам?</li><li>Играют ли ученики в шахматы вместе или их разделяют по возрасту или уровню навыков?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "teachingMaterials",
          title: {
            default:
              "**3. Teaching materials**<br>Explain what is taught in the chess classes and what materials are used.",
            de: "**3. Lehrmaterialien**<br>Erklären Sie, was im Schachunterricht gelehrt wird und welche Materialien verwendet werden.",
            es: "**3. Materiales de enseñanza**<br>Explique qué se enseña en las clases de ajedrez y qué materiales se utilizan.",
            ru: "**3. Учебные материалы**<br>Опишите, пожалуйста, чему учат на занятиях по шахматам, и какие учебные материалы используются.",
          },
          description: {
            default:
              "<span></span><ul><li>Do you have a written curriculum for systematic training with a focus on chess development?</li><li>If so, please describe its main contents. Have your chess educators written this curriculum themselves?</li><li>Do you use any established systems such as the Steps Method from the Netherlands, Chess Palace from Hungary, Chess for Schools and Communities from the UK, or something else?</li><li>What teaching materials do you use: books, workbooks, online tools?</li><li>What online tools do you use and what is their main role?</li><li>Describe a typical chess lesson. What differentiation tools do you use for various performance and skill levels?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügen Sie über einen schriftlichen Lehrplan (Curriculum) für systematisches Training mit Schwerpunkt auf Schachentwicklung? Wenn ja, beschreiben Sie bitte den Hauptinhalt.</li><li>Haben Ihre Schachpädagogen den Schachlehrplan selbst geschrieben (oder sind derzeit dabei)?</li><li>Verwenden Sie etablierte Systeme wie die Stappen-Methode aus den Niederlanden, Chess Palace aus Ungarn, Chess for Schools and Communities aus Großbritannien oder etwas anderes?</li><li>Welche Lehrmaterialien nutzen Sie: Bücher, Arbeitshefte, Online-Tools?</li><li>Welche Online-Tools nutzen Sie und welche Rolle spielen sie in ihrem Lehrplan?</li><li>Beschreiben Sie eine typische Schachstunde.</li><li>Welche Differenzierungstools verwenden Sie für verschiedene Leistungs- und Fähigkeitsniveaus?</li></ul><span></span>",
            es: "<span></span><ul><li>¿Dispone de un plan de estudios escrito para la formación sistemática centrada en el desarrollo del ajedrez?</li><li>¿En caso afirmativo, describa sus principales contenidos. ¿Sus docentes de ajedrez han redactado ellos mismos este plan de estudios?</li><li>¿Sus docentes de ajedrez utilizan algún sistema establecido, como el Método Steps de los Países Bajos, Chess Palace de Hungría, Chess for Schools and Communities del Reino Unido, u otro?</li><li>¿Qué material didáctico utiliza: libros, cuadernos de ejercicios, herramientas en línea?</li><li>¿Qué herramientas en línea utiliza y cuál es su función principal?</li><li>Describa una clase típica de ajedrez. ¿Qué herramientas diferentes utiliza para los distintos niveles de rendimiento y destreza?</li></ul><span></span>",
            ru: "<span></span><ul><li>Есть ли у Вас описанный учебный план для систематического обучения шахматам?</li><li>Если да, опишите его основное содержание. Ваши преподаватели шахмат  сами составили этот учебный план?</li><li>Используете ли Вы какие-либо общепризнанные системы, такие как: «Пошаговый метод» из Нидерландов, «Шахматный дворец» из Венгрии, «Шахматы для школ и сообществ» из Великобритании или иные?</li><li>Какие учебные материалы Вы используете: книги, рабочие тетради, онлайн-инструменты?</li><li>Какие онлайн-инструменты Вы используете и какова их основная цель?</li><li>Опишите типичный урок шахмат. Какие разнообразные инструменты Вы используете для разных уровней и навыков?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "chessEvents",
          title: {
            default:
              "**4. Chess events**<br>What chess events are organized in your school?",
            de: "**4. Schachveranstaltungen**<br>Welche Schachveranstaltungen werden in Ihrer Schule organisiert?",
            es: "**4. Eventos de ajedrez**<br>¿Qué eventos de ajedrez se organizan en tu escuela?",
            ru: "**4. Шахматные мероприятия**<br>Какие шахматные мероприятия проводятся в Вашей школе?",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you organize in-school tournaments? Who takes part in these?</li><li>Does your school participate in inter-school competitions: school chess leagues and cups, online events, country-wide competitions?</li><li>Does your school organize fun chess events such as a school chess day, “grandparent-child team tournament’, live chess on a giant board or similar?</li><li>Do you have activities that are not tournament-oriented?</li></ul><span></span>",
            de: "<span></span><ul><li>Organisieren Sie schulinterne Turniere? Wer nimmt daran teil?</li><li>Nimmt Ihre Schule an schulübergreifenden Wettbewerben teil: Schulschachligen und -pokalen, Online-Veranstaltungen, landesweiten Wettbewerben?</li><li>Organisiert Ihre Schule unterhaltsame Schachveranstaltungen wie einen Schulschachtag, ein „Großeltern-Kind-Mannschaftsturnier“, Live-Schach auf einem Riesenbrett oder ähnliches?</li><li>Haben Sie Schachaktivitäten, die nicht turnierorientiert sind?</li></ul><span></span>",
            es: '<span></span><ul><li>¿Organizan torneos escolares? ¿Quién participa en ellos?</li><li>¿Participa su instituto en competiciones intercolegiales: ligas y copas escolares de ajedrez, eventos en línea, competiciones de ámbito nacional?</li><li>¿Organiza su instituto actividades de ajedrez divertidas, como un día del ajedrez escolar, un "torneo por equipos de abuelos, padres e hijos", ajedrez en vivo en un tablero gigante o similares?</li><li>¿Organiza actividades que no estén orientadas a torneos?</li></ul><span></span>',
            ru: "<span></span><ul><li>Организуете ли Вы внутришкольные турниры? Кто принимает в них участие?</li><li>Участвует ли ваша школа в шахматных соревнованиях между школами: школьных шахматных лигах и кубках, онлайн-мероприятиях, городских и региональных соревнованиях?</li><li>Организует ли ваша школа веселые шахматные мероприятия, такие как школьный день шахмат, шахматные фестивали, командный турнир  с участием бабушек и дедушек, живые шахматы на гигантской доске или что-то подобное?</li><li>Ведется ли у Вас шахматная деятельность, не связанная с турнирами?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "chessEducators",
          title: {
            default:
              "**5. Chess educators**<br>Who teaches chess and what are their qualifications in education and in chess?",
            de: "**5. Schachpädagogen**<br>Wer unterrichtet Schach und welche Qualifikationen haben sie in der Ausbildung und im Schach?",
            es: "**5. Educadores de ajedrez**<br>¿Quién enseña ajedrez y cuál es su cualificación en educación y en ajedrez?",
            ru: "**5. Преподаватели шахмат.**<br>Кто преподает шахматы и какова их квалификация в области образования и шахмат?",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Who leads the chess instruction: teachers in your school, visiting chess coaches, or both?</li><li>Do teachers have FIDE School Instructor titles or a comparable qualification, such as the ECU 101 course award?</li><li>What chess titles, licenses and qualifications do visiting chess trainers have?</li><li>Do you provide training for your teachers? Please attach copies of certificates if available.</li></ul><span></span>",
            de: "<span></span><ul><li>Wer leitet den Schachunterricht: Lehrer an Ihrer Schule, Gast-Schachtrainer oder beides?</li><li>Verfügen Lehrer über FIDE-Schullehrertitel oder eine vergleichbare Qualifikation, wie zum Beispiel die ECU 101 Zertifizierung oder das Schulschachpatent?</li><li>Welche Schachtitel, Lizenzen und Qualifikationen haben Gastschachtrainer?</li><li>Bieten Sie Schulungen für Ihre Lehrer an? Bitte fügen Sie ggf. Kopien der Ausschreibungen/ Bescheinigungen bei.</li></ul><span></span>",
            es: "<span></span><ul><li>¿Quién dirige la enseñanza del ajedrez: los profesores de su escuela, los instuctores, entrenadores de ajedrez visitantes, o ambos?</li><li>¿Tienen los profesores el título de Instructor Escolar de la FIDE o una cualificación comparable, como el Premio del Curso ECU 101?</li><li>¿Qué títulos, licencias y cualificaciones de ajedrez tienen los entrenadores de ajedrez visitantes?</li><li>¿Ofrece formación a sus profesores? Por favor, adjunte copias de los certificados si dispone de ellos.</li></ul><span></span>",
            ru: "<span></span><ul><li>Кто ведет обучение шахматам: учителя в вашей школе, приглашенные тренеры по шахматам или и то, и другое?</li><li>Имеют ли учителя звания школьных инструкторов ФИДЕ или аналогичную квалификацию, например, подтверждение прохождения курса ECU 101?</li><li>Какие шахматные звания, лицензии и квалификации имеют приглашенные тренеры по шахматам?</li><li>Проводите ли вы обучение для своих учителей? Приложите, пожалуйста, копии сертификатов, если таковые имеются.</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "representationOfSchoolChess",
          title: {
            default:
              "**6. Representation of school chess**<br>How visible is chess in your school and in the wider community?",
            de: "**6. Darstellung des Schulschachs**<br>Wie sichtbar ist Schach in Ihrer Schule und in der breiteren Gemeinschaft?",
            es: "**6. Representación del ajedrez escolar**<br>Hasta qué punto es visible el ajedrez en su escuela y en la comunidad en general?",
            ru: "**6. Представление школьных шахмат**<br>Насколько заметны шахматы в вашей школе и в обществе в целом?",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you hold promotional events inside and outside school?</li><li>Do you have a stand at the school festival?</li><li>Are there chess advertising flyers and posters displayed in your school, or on the school website?</li><li>Do you hold fundraising events?</li><li>What promotional materials do you use to attract new students to your school chess program?</li><li>Do you have a dedicated chess page on the school website or in the student newspaper? We are eager to see a small advertising example.</li></ul><span></span>",
            de: "<span></span><ul><li>Führen Sie Werbeveranstaltungen innerhalb und außerhalb der Schule durch?</li><li>Haben Sie einen Stand beim Schulfest?</li><li>Werden in Ihrer Schule oder auf der Website der Schule Werbeflyer und -plakate für Schach ausgehängt?</li><li>Veranstalten Sie Spendenaktionen?</li><li>Welche Werbematerialien verwenden Sie, um neue Schüler für Ihr Schulschachprogramm zu gewinnen?</li><li>Haben Sie eine eigene Schachseite auf der Schulwebsite oder in der Schülerzeitung? Wir sind gespannt auf ein kleines Werbebeispiel.</li></ul><span></span>",
            es: "<span></span><ul><li>¿Organiza actos promocionales dentro y fuera de la escuela?</li><li>¿Tiene un stand en el festival escolar?</li><li>¿Hay folletos y carteles publicitarios sobre el ajedrez en la escuela o en su sitio web?</li><li>¿Organiza actos para recaudar fondos?</li><li>¿Qué material promocional utiliza para atraer a nuevos alumnos a su programa de ajedrez escolar?</li><li>¿Tiene una página dedicada al ajedrez en el sitio web del colegio o en el periódico estudiantil? Estamos deseando ver un pequeño ejemplo publicitario.</li></ul><span></span>",
            ru: "<span></span><ul><li>Проводите ли Вы рекламные мероприятия внутри и за пределами школы?</li><li>Есть ли у Вас стенд на школьных фестивалях?</li><li>Развешиваются ли в вашей школе афиши или раздают листовки, размещается ли на школьном веб-сайте реклама шахматных занятий?</li><li>Проводите ли Вы мероприятия по сбору средств на шахматы?</li><li>Какие рекламные материалы Вы используете для привлечения новых учеников в вашу школьную шахматную программу?</li><li>Есть ли у Вас отдельная шахматная страница на сайте школы или в студенческой газете? Нам не терпится увидеть небольшой рекламный пример.</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "socialCommitment",
          title: {
            default:
              "**7. Social commitment**<br>How inclusive and socially committed is your school chess?",
            de: "**7. Soziales Engagement**<br>Wie inklusiv und sozial engagiert ist Ihr Schulschach?",
            es: "**7. Compromiso social**<br>¿Cuál es el grado de integración y compromiso social del ajedrez escolar?",
            ru: "**7. Социальная ответственность**<br>Насколько инклюзивна и социально ориентирована ваша школьная шахматная школа?",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you cater for children with special needs? How do you include them in the chess classes?</li><li>If chess is taught in an after-school or lunchtime club format, what is the age-spread of the children?</li><li>Do you cooperate with a local chess club to run joint events or refer some students?</li><li>What activities do you offer your students around chess that promote the development of socially responsible, independent personalities?</li></ul><span></span>",
            de: "<span></span><ul><li>Betreuen Sie Kinder mit besonderen Bedürfnissen? Wie bindet man sie in den Schachunterricht ein?</li><li>Wie groß ist die Altersspanne der Kinder, wenn Schach nach der Schule oder in einem Mittagsclub oder Neigungskurs unterrichtet wird?</li><li>Arbeiten Sie mit einem örtlichen Schachverein zusammen, um gemeinsame Veranstaltungen durchzuführen oder einige Schüler zu empfehlen?</li><li>Welche Aktivitäten bieten Sie Ihren Schülern rund ums Schach an, die die Entwicklung sozial verantwortlicher, eigenständiger Persönlichkeiten fördern?</li></ul><span></span>",
            es: "<span></span><ul><li>¿Atienden a niños con necesidades especiales? ¿Cómo se les incluye en las clases de ajedrez?</li><li>Si el ajedrez se imparte en formato de club extraescolar o a la hora del almuerzo, ¿cuál es la distribución por edades de los niños?</li><li>¿Coopera con algún club de ajedrez local para organizar eventos conjuntos o derivar a algunos alumnos?</li><li>¿Qué actividades ofrece a sus alumnos en torno al ajedrez que promuevan el desarrollo de personalidades socialmente responsables e independientes?</li></ul><span></span>",
            ru: "<span></span><ul><li>Обучаете ли Вы детей с особыми потребностями? Включаете ли Вы их в шахматные занятия, если да, то как?</li><li>Если шахматы преподаются в формате внеклассных занятий или шахматного клуба во время перемен, каков возрастной состав детей?</li><li>Сотрудничаете ли Вы с местным шахматным клубом для проведения совместных мероприятий или приглашаете ли студентов?</li><li>Какие околошахматные занятия Вы предлагаете своим ученикам для развития социально-ответственных, независимых личностей?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "chessAsAnEducationalTool",
          title: {
            default:
              "**8. Chess as an educational tool**<br>How is chess integrated into the school curriculum?",
            de: "**8. Schach als Lehrmittel**<br>Wie wird Schach in den Lehrplan integriert?",
            es: "**8. El ajedrez como herramienta educativa**<br>¿Cómo se integra el ajedrez en el currículo escolar?",
            ru: "**8. Шахматы как образовательный инструмент**<br>Как шахматы интегрированы в школьную программу?",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Is chess offered as a compulsory or optional subject in school?</li><li>If chess is a taught subject in the school curriculum, how many lessons are taught per week and to which age groups?</li><li>Does every child learn the rules of chess at some point?</li><li>Do educators also use chess-like minigames, strategy games, exercises and investigations in the lesson?</li><li>Give examples where chess is used as an interdisciplinary or as a transversal tool in your practice. [Transversal tool: when it is used in a field that cuts across all subjects, such as for developing emotional intelligence. Interdisciplinary tool: when it is used to facilitate the learning of a specific subject, such as mathematics or languages.]</li></ul><span></span>",
            de: "<span></span><ul><li>Wird Schach in der Schule als Pflicht- oder Wahlfach angeboten?</li><li>Wenn Schach ein Unterrichtsfach im Lehrplan ist, wie viele Unterrichtsstunden werden pro Woche unterrichtet und für welche Altersgruppen?</li><li>Lernt jedes Kind an ihrer Schule irgendwann die Schachregeln?</li><li>Setzen Pädagogen im Unterricht auch schachähnliche Minispiele, Strategiespiele, Übungen und Untersuchungen ein?</li><li>Nennen Sie Beispiele, wo Schach als interdisziplinäres oder transversales Werkzeug in Ihrer Praxis eingesetzt wird. [Transversales Werkzeug: wenn es in einem themenübergreifenden Bereich eingesetzt wird, beispielsweise zur Entwicklung emotionaler Intelligenz. Interdisziplinäres Werkzeug: wenn es verwendet wird, um das Erlernen eines bestimmten Fachs wie Mathematik oder Sprachen zu erleichtern.]</li></ul><span></span>",
            es: "<span></span><ul><li>¿Se ofrece ajedrez como materia obligatoria u optativa en la escuela?</li><li>Si el ajedrez es una materia que se enseña en el plan de estudios escolar, ¿cuántas lecciones se imparten por semana y a qué grupos de edad?</li><li>¿Todos los niños aprenden las reglas del ajedrez en algún momento?</li><li>¿En el desarrollo de las lecciones los educadores también utilizan minijuegos similares al ajedrez, juegos de estrategia, ejercicios e investigaciones?</li><li>Da ejemplos en los que el ajedrez se utilice como herramienta interdisciplinaria o transversal en tu práctica. [Herramienta transversal: cuando se utiliza en un ámbito transversal a todas las materias, como por ejemplo para el desarrollo de la inteligencia emocional. Herramienta interdisciplinaria: cuando se utiliza para facilitar el aprendizaje de una materia específica, como matemáticas o idiomas.]</li></ul><span></span>",
            ru: "<span></span><ul><li>Шахматы преподаются в школе как обязательный или факультативный предмет?</li><li>Если шахматы входят в школьную программу, сколько уроков проводится в неделю и для каких возрастных групп?</li><li>Верно ли, что каждый ребенок в какой-то момент изучает правила игры в шахматы?</li><li>Используют ли преподаватели на уроках мини-игры, стратегические игры, упражнения, связанные с шахматами или похожие на шахматы?</li><li>Приведите примеры, когда шахматы используются в Вашей практике как межпредметный или сквозной инструмент. [Сквозной инструмент: когда шахматы используются в области, которая затрагивает все предметы, например, для развития эмоционального интеллекта. Межпредметный инструмент: когда шахматы используются для облегчения изучения определенного предмета, например, математики или языков.]</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "financingSchoolChess",
          title: {
            default:
              "**9. Financing school chess**<br>Explain how your school chess program is financed.",
            de: "**9. Finanzierung von Schulschach**<br>Erklären Sie, wie Ihr Schulschachprogramm finanziert wird.",
            es: "**9. Financiación del ajedrez escolar**<br>Explique cómo se financia el programa de ajedrez de su escuela.",
            ru: "**9. Финансирование школьных шахмат.**<br>Поясните, пожалуйста, как финансируется ваша школьная шахматная программа.",
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Does the school have a budget for providing extra-curricular chess after school or lunchtime?</li><li>Do parents pay for chess instruction?</li><li>Can all children play chess free of charge?</li><li>Are financially weak families supported if necessary?</li><li>How are equipment and activities financed?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügt die Schule über ein Budget für außerschulisches Schach nach der Schule oder in der Mittagspause? Gibt es Kooperationen mit anderen Einrichtungen/Trägern?</li><li>Bezahlen Eltern den Schachunterricht?</li><li>Können alle Kinder kostenlos Schach spielen?</li><li>Werden finanziell schwache Familien bei Bedarf unterstützt?</li><li>Wie werden Ausrüstung und Aktivitäten finanziert?</li></ul><span></span>",
            es: "<span></span><ul><li>¿Tiene su escuela un presupuesto para impartir ajedrez extracurricular después de la escuela o a la hora del almuerzo?</li><li>¿Pagan los padres por la enseñanza de ajedrez?</li><li>¿Todos los niños pueden jugar al ajedrez de forma gratuita?</li><li>¿Si es necesario, se apoya a las familias económicamente débiles?</li><li>¿Cómo se financian los equipos y las actividades?</li></ul><span></span>",
            ru: "<span></span><ul><li>Есть ли в школе бюджет на проведение внеклассных занятий шахматами после уроков или во время обеда?</li><li>Платят ли родители за обучение шахматам?</li><li>Доступно ли детям бесплатное обучение шахматам?</li><li>Поддерживаются ли финансово слабые семьи в случае необходимости?</li><li>Как финансируется приобретение оборудования (инвентаря) и проведение мероприятия?</li></ul><span></span>",
          },
          type: "comment",
          rows: 7,
          autoGrow: true,
        },
        {
          name: "testimonials",
          title: {
            default:
              "**10. Testimonials**<br>Send us with 3-4 testimonials about your school chess program. Ideally, written by someone from each of the following: students, parents, and educators.",
            de: "**10. Erfahrungsberichte**<br>Geben Sie uns 3-4 Erfahrungsberichte über Ihr Schulschachprogramm. Idealerweise von jemandem aus den folgenden Bereichen verfasst: Schüler, Eltern und Pädagogen.",
            es: "**10. Testimonios**<br>Envíenos 3-4 testimonios sobre el programa de ajedrez de su escuela. Idealmente, escrito por alguien de cada uno de los siguientes: estudiantes, padres y educadores.",
            ru: "**10. Отзывы и рекомендации**<br>Пришлите нам, пожалуйста, 3-4 отзыва или рекомендации о Вашей школьной шахматной программе. В идеале это должен написать кто-то из следующих групп лиц: учащиеся, родители и преподаватели.",
          },
          type: "checkbox",
          choices: [
            {
              value: "I will send it.",
              text: {
                default: "I will send it.",
                de: "Ich werde es senden.",
                es: "Lo enviaré.",
                ru: "Направлю вместе с заявкой.",
              },
            },
          ],
        },
      ],
    },
    {
      elements: [
        {
          html: {
            default: "<h4>Privacy Information</h4>",
            de: "<h4>Datenschutzinformationen</h4>",
          },
          type: "html",
        },
        {
          name: "processingYourInformation",
          title: {
            default:
              "**Processing your information**<br>Only the Examiner appointed by the FIDE Chess in Education Commission will have access to your submitted material. Information you provide will not be shared with a third party.",
            de: "**Verarbeitung Ihrer Informationen**<br>Nur der von der FIDE-Kommission für Schach in der Bildung ernannte Prüfer hat Zugang zu Ihren eingereichten Materialien. Die von Ihnen bereitgestellten Informationen werden nicht an Dritte weitergegeben.",
            es: "**Procesando su información**<br>Sólo el examinador designado por la Comisión de Educación de Ajedrez de la FIDE tendrá acceso al material enviado. La información que usted proporcione no será compartida con terceros.",
            ru: "**Обработка вашей информации**<br>Доступ к представленным Вами материалам будет иметь только эксперт, назначенный Комиссией ФИДЕ по шахматному образованию. Предоставленная Вами информация не будет передана третьим лицам.",
          },
          type: "checkbox",
          choices: [
            {
              value: "I understand.",
              text: {
                deafult: "I understand",
                de: "Verstanden.",
                es: "Comprendo",
                ru: "Согласен",
              },
            },
          ],
        },
        {
          name: "publishOnWebsite",
          title: {
            default:
              "If you receive the FIDE Chess School Award the following information will be published on the FIDE Chess in Education Commisson website:<ul><li>Name of School;</li><li>Country and City of School;</li><li>Level of Award.</li></ul>",
            de: "Wenn Sie den FIDE Schachschulpreis erhalten, werden folgende Informationen auf der Website der FIDE-Kommission für Schach in der Bildung veröffentlicht:<ul><li>Name der Schule;</li><li>Land und Stadt der Schule;</li><li>Auszeichnungsstufe.</li></ul>",
            es: "Si recibe el Premio “Escuela de Ajedrez de la FIDE“, la siguiente información se publicará en el sitio web de la Comisión de Ajedrez en Educación de la FIDE:<ul><li>Nombre de Escuela;</li><li>País y Ciudad de la Escuela;</li><li>Nivel de premio.</li></ul>",
            ru: "<ul><li>Название школы;</li><li>Страна и город школы;</li><li>Уровень награждения (Золотой, Серебряный, Бронзовый сертификат)</li></ul>",
          },
          type: "checkbox",
          choices: [
            {
              value: "I agree.",
              text: {
                default: "I agree.",
                de: "Einverstanden.",
                es: "Estoy de acuerdo.",
                ru: "Согласен.",
              },
            },
          ],
        },
      ],
    },
  ],
};
