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
          },
          type: "html",
        },
        {
          name: "email",
          title: "E-mail:",
          type: "text",
        },
        {
          name: "fullName",
          title: {
            default: "Your full name.",
            de: "Einstellungen ändern Ihr vollständiger Name.",
          },
          type: "text",
        },
        {
          name: "areYouMainContact",
          title: {
            default: "Are you the main contact person for this application?",
            de: "Sind Sie der Hauptansprechpartner für diese Bewerbung?",
          },
          type: "radiogroup",
          choices: [
            { value: "yes", text: { default: "yes", de: "Ja" } },
            { value: "no", text: { default: "no", de: "Nein" } },
          ],
          isRequired: true,
        },
      ],
    },
    {
      elements: [
        {
          html: {
            default: "<h4>Main Contact Person</h4>",
            de: "<h4>Hauptansprechpartner</h4>",
          },
          type: "html",
        },
        {
          name: "mainContactName",
          title: {
            default: "Name of main Contact Person:",
            de: "Name des Hauptansprechpartners:",
          },
          type: "text",
        },
        {
          name: "mainContactEmail",
          title: {
            default: "Email of main Contact Person:",
            de: " E-Mail des Hauptansprechpartners:",
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
          },
          type: "html",
        },
        {
          name: "nameOfSchool",
          title: { default: "Name of School:", de: "Name der Schule" },
          type: "text",
        },
        {
          name: "otherSchoolDetails",
          title: {
            default: "Provide here other details about your School:",
            de: "Geben Sie hier weitere Details zu Ihrer Schule an:",
          },
          description: {
            default:
              "-country<br>-postal address<br>-email-address<br>-phone number<br>-website",
            de: "-Land;<br>-Postanschrift;<br>-E-Mail-Adresse;<br>-Telefonnummer;<br>-Website",
          },
          type: "comment",
          rows: 3,
          autoGrow: true,
        },
        {
          name: "typeOfSchool",
          title: { default: "Type of School", de: "Art der Schule" },
          type: "radiogroup",
          choices: [
            "Primary and middle schools (ages 6-14)",
            "Secondary schools (age up to12-18 years)",
            "Both (age 6-18 years)",
          ],
          isRequired: true,
        },
        {
          name: "schoolId",
          title: {
            default:
              "We require an ID on any material you send to us. We ask you to choose this ID (e.g. your school name 'LimaHighSchool').",
            de: 'Wir benötigen eine Kennung für alle Materialien, die Sie uns zusenden. Wir bitten Sie, diese Kennung zu wählen (z. B. der Name Ihrer Schule "LimaHighSchool").',
          },
          description: {
            default: "Enter your ID here:",
            de: "Geben Sie hier Ihre Kennung ein:",
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
            de: "<h4>Bewerbungskategorien</h4><p>Wir sind daran interessiert, mehr über Schach im Leben Ihrer Schule zu erfahren, egal wo Sie auf der Welt sind. Unabhängig davon, wo sich Ihre Schule befindet, ist Schach unsere gemeinsame Sprache.<br>Schreiben Sie in Ihrer Beschreibung mindestens fünf Sätze.<br>Beispiele für unterstützende Materialien:</p>",
          },
          type: "html",
        },
        {
          name: "facilities",
          title: {
            default:
              "**1. Facilities**<br>Describe the facilities that enable chess instruction in your school.",
            de: "**1. Einrichtungen**<br>Beschreiben Sie die Einrichtungen, die den Schachunterricht an Ihrer Schule ermöglichen.",
          },
          description: {
            deafult:
              "<span></span><ul><li>Do you have a special chess room or a chess corner where chess classes are held? If so, how is it set up?</li><li>Do children have access to it in their free time; during lunch hour or break times?</li><li>Where is chess equipment stored?</li><li>What chess materials do the children use?</li><li>Are chess boards available throughout the day?</li><li>If the chess teacher has to set up a regular classroom for chess class, how is it done?</li><li>What equipment is used to deliver chess instruction?</li><li>Do you happen to have a game area with other strategy games playable?</li><li>Do you have a garden chess set for outdoor play?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügen Sie über einen speziellen Schachraum oder eine Schachecke, in der Schachunterricht stattfindet? Wenn ja, wie ist es eingerichtet?</li><li>Haben Kinder in ihrer Freizeit Zugang dazu? in der Mittags- oder Pausenzeit?</li><li>Wo wird die Schachausrüstung aufbewahrt?</li><li>Welche Schachmaterialien nutzen die Kinder?</li><li>Stehen den ganzen Tag über Schachbretter zur Verfügung?</li><li>Wenn der Schachlehrer einen regulären Klassenraum für den Schachunterricht einrichten muss, wie geht das vor?</li><li>Welche Austattung wird für den Schachunterricht verwendet?</li><li>Haben Sie einen Spielbereich, in dem andere Strategiespiele spielbar sind?</li><li>Haben Sie ein Gartenschachspiel zum Spielen im Freien?</li></ul><span></span>",
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
          },
          description: {
            default:
              "<span></span><ul><li>How many children attend your school? </li><li>How many children play chess? What percentage of children play chess? </li><li>Which age-group(s) are offered chess instruction? </li><li>What is the form of chess instruction: compulsory lessons, optional lessons, after-school club, lunchtime club, another format? </li><li>How much time per week does chess instruction happen? </li><li>Are students playing chess together, or are they separated by age or skill level?</li></ul><span></span>",
            de: "<span></span><ul><li>Wie viele Kinder besuchen Ihre Schule?</li><li>Wie viele Kinder spielen Schach (Anzahl)?</li><li>Wie viel Prozent der Kinder spielen Schach?</li><li>Für welche Altersgruppe(n) wird Schachunterricht angeboten?</li><li>Was ist die Form des Schachunterrichts: Pflichtunterricht, Wahlunterricht, im Hort, Mittagsclub, ein außerschulischer Neigungskurs oder ein anderes Format?</li><li>Welchen Zeitumfang pro Woche hat der Schachunterricht?</li><li>Spielen die Schüler gemeinsam Schach oder sind sie nach Alter oder Fähigkeitsniveau getrennt?</li></ul><span></span>",
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
          },
          description: {
            default:
              "<span></span><ul><li>Do you have a written curriculum for systematic training with a focus on chess development?</li><li>If so, please describe its main contents. Have your chess educators written this curriculum themselves?</li><li>Do you use any established systems such as the Steps Method from the Netherlands, Chess Palace from Hungary, Chess for Schools and Communities from the UK, or something else?</li><li>What teaching materials do you use: books, workbooks, online tools?</li><li>What online tools do you use and what is their main role?</li><li>Describe a typical chess lesson. What differentiation tools do you use for various performance and skill levels?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügen Sie über einen schriftlichen Lehrplan (Curriculum) für systematisches Training mit Schwerpunkt auf Schachentwicklung? Wenn ja, beschreiben Sie bitte den Hauptinhalt.</li><li>Haben Ihre Schachpädagogen den Schachlehrplan selbst geschrieben (oder sind derzeit dabei)?</li><li>Verwenden Sie etablierte Systeme wie die Stappen-Methode aus den Niederlanden, Chess Palace aus Ungarn, Chess for Schools and Communities aus Großbritannien oder etwas anderes?</li><li>Welche Lehrmaterialien nutzen Sie: Bücher, Arbeitshefte, Online-Tools?</li><li>Welche Online-Tools nutzen Sie und welche Rolle spielen sie in ihrem Lehrplan?</li><li>Beschreiben Sie eine typische Schachstunde.</li><li>Welche Differenzierungstools verwenden Sie für verschiedene Leistungs- und Fähigkeitsniveaus?</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you organize in-school tournaments? Who takes part in these?</li><li>Does your school participate in inter-school competitions: school chess leagues and cups, online events, country-wide competitions?</li><li>Does your school organize fun chess events such as a school chess day, “grandparent-child team tournament’, live chess on a giant board or similar?</li><li>Do you have activities that are not tournament-oriented?</li></ul><span></span>",
            de: "<span></span><ul><li>Organisieren Sie schulinterne Turniere? Wer nimmt daran teil?</li><li>Nimmt Ihre Schule an schulübergreifenden Wettbewerben teil: Schulschachligen und -pokalen, Online-Veranstaltungen, landesweiten Wettbewerben?</li><li>Organisiert Ihre Schule unterhaltsame Schachveranstaltungen wie einen Schulschachtag, ein „Großeltern-Kind-Mannschaftsturnier“, Live-Schach auf einem Riesenbrett oder ähnliches?</li><li>Haben Sie Schachaktivitäten, die nicht turnierorientiert sind?</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Who leads the chess instruction: teachers in your school, visiting chess coaches, or both?</li><li>Do teachers have FIDE School Instructor titles or a comparable qualification, such as the ECU 101 course award?</li><li>What chess titles, licenses and qualifications do visiting chess trainers have?</li><li>Do you provide training for your teachers? Please attach copies of certificates if available.</li></ul><span></span>",
            de: "<span></span><ul><li>Wer leitet den Schachunterricht: Lehrer an Ihrer Schule, Gast-Schachtrainer oder beides?</li><li>Verfügen Lehrer über FIDE-Schullehrertitel oder eine vergleichbare Qualifikation, wie zum Beispiel die ECU 101 Zertifizierung oder das Schulschachpatent?</li><li>Welche Schachtitel, Lizenzen und Qualifikationen haben Gastschachtrainer?</li><li>Bieten Sie Schulungen für Ihre Lehrer an? Bitte fügen Sie ggf. Kopien der Ausschreibungen/ Bescheinigungen bei.</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you hold promotional events inside and outside school?</li><li>Do you have a stand at the school festival?</li><li>Are there chess advertising flyers and posters displayed in your school, or on the school website?</li><li>Do you hold fundraising events?</li><li>What promotional materials do you use to attract new students to your school chess program?</li><li>Do you have a dedicated chess page on the school website or in the student newspaper? We are eager to see a small advertising example.</li></ul><span></span>",
            de: "<span></span><ul><li>Führen Sie Werbeveranstaltungen innerhalb und außerhalb der Schule durch?</li><li>Haben Sie einen Stand beim Schulfest?</li><li>Werden in Ihrer Schule oder auf der Website der Schule Werbeflyer und -plakate für Schach ausgehängt?</li><li>Veranstalten Sie Spendenaktionen?</li><li>Welche Werbematerialien verwenden Sie, um neue Schüler für Ihr Schulschachprogramm zu gewinnen?</li><li>Haben Sie eine eigene Schachseite auf der Schulwebsite oder in der Schülerzeitung? Wir sind gespannt auf ein kleines Werbebeispiel.</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Do you cater for children with special needs? How do you include them in the chess classes?</li><li>If chess is taught in an after-school or lunchtime club format, what is the age-spread of the children?</li><li>Do you cooperate with a local chess club to run joint events or refer some students?</li><li>What activities do you offer your students around chess that promote the development of socially responsible, independent personalities?</li></ul><span></span>",
            de: "<span></span><ul><li>Betreuen Sie Kinder mit besonderen Bedürfnissen? Wie bindet man sie in den Schachunterricht ein?</li><li>Wie groß ist die Altersspanne der Kinder, wenn Schach nach der Schule oder in einem Mittagsclub oder Neigungskurs unterrichtet wird?</li><li>Arbeiten Sie mit einem örtlichen Schachverein zusammen, um gemeinsame Veranstaltungen durchzuführen oder einige Schüler zu empfehlen?</li><li>Welche Aktivitäten bieten Sie Ihren Schülern rund ums Schach an, die die Entwicklung sozial verantwortlicher, eigenständiger Persönlichkeiten fördern?</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Is chess offered as a compulsory or optional subject in school?</li><li>If chess is a taught subject in the school curriculum, how many lessons are taught per week and to which age groups?</li><li>Does every child learn the rules of chess at some point?</li><li>Do educators also use chess-like minigames, strategy games, exercises and investigations in the lesson?</li><li>Give examples where chess is used as an interdisciplinary or as a transversal tool in your practice. [Transversal tool: when it is used in a field that cuts across all subjects, such as for developing emotional intelligence. Interdisciplinary tool: when it is used to facilitate the learning of a specific subject, such as mathematics or languages.]</li></ul><span></span>",
            de: "<span></span><ul><li>Wird Schach in der Schule als Pflicht- oder Wahlfach angeboten?</li><li>Wenn Schach ein Unterrichtsfach im Lehrplan ist, wie viele Unterrichtsstunden werden pro Woche unterrichtet und für welche Altersgruppen?</li><li>Lernt jedes Kind an ihrer Schule irgendwann die Schachregeln?</li><li>Setzen Pädagogen im Unterricht auch schachähnliche Minispiele, Strategiespiele, Übungen und Untersuchungen ein?</li><li>Nennen Sie Beispiele, wo Schach als interdisziplinäres oder transversales Werkzeug in Ihrer Praxis eingesetzt wird. [Transversales Werkzeug: wenn es in einem themenübergreifenden Bereich eingesetzt wird, beispielsweise zur Entwicklung emotionaler Intelligenz. Interdisziplinäres Werkzeug: wenn es verwendet wird, um das Erlernen eines bestimmten Fachs wie Mathematik oder Sprachen zu erleichtern.]</li></ul><span></span>",
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
          },
          type: "text",
          description: {
            default:
              "<span></span><ul><li>Does the school have a budget for providing extra-curricular chess after school or lunchtime?</li><li>Do parents pay for chess instruction?</li><li>Can all children play chess free of charge?</li><li>Are financially weak families supported if necessary?</li><li>How are equipment and activities financed?</li></ul><span></span>",
            de: "<span></span><ul><li>Verfügt die Schule über ein Budget für außerschulisches Schach nach der Schule oder in der Mittagspause? Gibt es Kooperationen mit anderen Einrichtungen/Trägern?</li><li>Bezahlen Eltern den Schachunterricht?</li><li>Können alle Kinder kostenlos Schach spielen?</li><li>Werden finanziell schwache Familien bei Bedarf unterstützt?</li><li>Wie werden Ausrüstung und Aktivitäten finanziert?</li></ul><span></span>",
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
          },
          type: "checkbox",
          choices: ["I will send it."],
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
          },
          type: "checkbox",
          choices: [
            {
              value: "I understand.",
              text: { deafult: "I understand", de: "Verstanden." },
            },
          ],
        },
        {
          name: "publishOnWebsite",
          title: {
            default:
              "If you receive the FIDE Chess School Award the following information will be published on the FIDE Chess in Education Commisson website:<ul><li>Name of School;</li><li>Country and City of School;</li><li>Level of Award.</li></ul>",
            de: "Wenn Sie den FIDE Schachschulpreis erhalten, werden folgende Informationen auf der Website der FIDE-Kommission für Schach in der Bildung veröffentlicht:<ul><li>Name der Schule;</li><li>Land und Stadt der Schule;</li><li>Auszeichnungsstufe.</li></ul>",
          },
          type: "checkbox",
          choices: [
            {
              value: "I agree.",
              text: { default: "I agree.", de: "Einverstanden." },
            },
          ],
        },
      ],
    },
  ],
};
