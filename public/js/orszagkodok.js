// Ezek ISO országkódok, a végleges verzióban a backend szerveren lesznek tárolva

let countryCodes = [
  { name: "Afghanistan", "alpha-2": "AF", "country-code": "004" },
  { name: "Albania", "alpha-2": "AL", "country-code": "008" },
  { name: "Algeria", "alpha-2": "DZ", "country-code": "012" },
  { name: "American Samoa", "alpha-2": "AS", "country-code": "016" },
  { name: "Andorra", "alpha-2": "AD", "country-code": "020" },
  { name: "Antigua and Barbuda", "alpha-2": "AG", "country-code": "1-268" },
  { name: "Angola", "alpha-2": "AO", "country-code": "024" },
  { name: "Anguilla", "alpha-2": "AI", "country-code": "660" },
  { name: "Argentina", "alpha-2": "AR", "country-code": "032" },
  { name: "Armenia", "alpha-2": "AM", "country-code": "051" },
  { name: "Aruba", "alpha-2": "AW", "country-code": "297" },
  { name: "Australia", "alpha-2": "AU", "country-code": "036" },
  { name: "Austria", "alpha-2": "AT", "country-code": "040" },
  { name: "Azerbaijan", "alpha-2": "AZ", "country-code": "031" },
  { name: "Bahamas", "alpha-2": "BS", "country-code": "044" },
  { name: "Bahrain", "alpha-2": "BH", "country-code": "048" },
  { name: "Bangladesh", "alpha-2": "BD", "country-code": "050" },
  { name: "Barbados", "alpha-2": "BB", "country-code": "052" },
  { name: "Belarus", "alpha-2": "BY", "country-code": "112" },
  { name: "Belgium", "alpha-2": "BE", "country-code": "056" },
  { name: "Belize", "alpha-2": "BZ", "country-code": "084" },
  { name: "Benin", "alpha-2": "BJ", "country-code": "204" },
  { name: "Bermuda", "alpha-2": "BM", "country-code": "060" },
  { name: "Bhutan", "alpha-2": "BT", "country-code": "064" },
  {
    name: "Bolivia (Plurinational State of)",
    "alpha-2": "BO",
    "country-code": "068",
  },
  {
    name: "Bonaire, Sint Eustatius and Saba",
    "alpha-2": "BQ",
    "country-code": "535",
  },
  { name: "Bosnia and Herzegovina", "alpha-2": "BA", "country-code": "070" },
  { name: "Botswana", "alpha-2": "BW", "country-code": "072" },
  { name: "Bouvet Island", "alpha-2": "BV", "country-code": "074" },
  { name: "Brazil", "alpha-2": "BR", "country-code": "076" },
  {
    name: "British Indian Ocean Territory",
    "alpha-2": "IO",
    "country-code": "086",
  },
  { name: "Brunei Darussalam", "alpha-2": "BN", "country-code": "096" },
  { name: "Bulgaria", "alpha-2": "BG", "country-code": "100" },
  { name: "Burkina Faso", "alpha-2": "BF", "country-code": "854" },
  { name: "Burundi", "alpha-2": "BI", "country-code": "108" },
  { name: "Cabo Verde", "alpha-2": "CV", "country-code": "132" },
  { name: "Cambodia", "alpha-2": "KH", "country-code": "116" },
  { name: "Cameroon", "alpha-2": "CM", "country-code": "120" },
  { name: "Canada", "alpha-2": "CA", "country-code": "124" },
  { name: "Canary Islands", "alpha-2": "IC", "country-code": "124c" },
  { name: "Cayman Islands", "alpha-2": "KY", "country-code": "136" },
  { name: "Central African Republic", "alpha-2": "CF", "country-code": "140" },
  { name: "Chad", "alpha-2": "TD", "country-code": "148" },
  { name: "Chile", "alpha-2": "CL", "country-code": "152" },
  { name: "China", "alpha-2": "CN", "country-code": "156" },
  { name: "Colombia", "alpha-2": "CO", "country-code": "170" },
  { name: "Comoros", "alpha-2": "KM", "country-code": "174" },
  { name: "Congo", "alpha-2": "CG", "country-code": "178" },
  {
    name: "Congo, Democratic Republic of the",
    "alpha-2": "CD",
    "country-code": "180",
  },
  { name: "Cook Islands", "alpha-2": "CK", "country-code": "184" },
  { name: "Costa Rica", "alpha-2": "CR", "country-code": "188" },
  { name: "Côte d'Ivoire", "alpha-2": "CI", "country-code": "384" },
  { name: "Croatia", "alpha-2": "HR", "country-code": "191" },
  { name: "Cuba", "alpha-2": "CU", "country-code": "192" },
  { name: "Curaçao", "alpha-2": "CW", "country-code": "531" },
  { name: "Cyprus", "alpha-2": "CY", "country-code": "196" },
  { name: "Czechia", "alpha-2": "CZ", "country-code": "203" },
  { name: "Denmark", "alpha-2": "DK", "country-code": "208" },
  { name: "Djibouti", "alpha-2": "DJ", "country-code": "262" },
  { name: "Dominica", "alpha-2": "DM", "country-code": "212" },
  { name: "Dominican Republic", "alpha-2": "DO", "country-code": "214" },
  { name: "Ecuador", "alpha-2": "EC", "country-code": "218" },
  { name: "Egypt", "alpha-2": "EG", "country-code": "818" },
  { name: "El Salvador", "alpha-2": "SV", "country-code": "222" },
  { name: "England", "alpha-2": "EL", "country-code": "notACountry" },
  { name: "Equatorial Guinea", "alpha-2": "GQ", "country-code": "226" },
  { name: "Eritrea", "alpha-2": "ER", "country-code": "232" },
  { name: "Estonia", "alpha-2": "EE", "country-code": "233" },
  { name: "Eswatini", "alpha-2": "SZ", "country-code": "748" },
  { name: "Ethiopia", "alpha-2": "ET", "country-code": "231" },
  {
    name: "Falkland Islands (Malvinas)",
    "alpha-2": "FK",
    "country-code": "238",
  },
  { name: "Faroe Islands", "alpha-2": "FO", "country-code": "234" },
  { name: "Fiji", "alpha-2": "FJ", "country-code": "242" },
  { name: "Finland", "alpha-2": "FI", "country-code": "246" },
  { name: "France", "alpha-2": "FR", "country-code": "250" },
  { name: "French Guiana", "alpha-2": "GF", "country-code": "254" },
  { name: "French Polynesia", "alpha-2": "PF", "country-code": "258" },
  {
    name: "French Southern Territories",
    "alpha-2": "TF",
    "country-code": "260",
  },
  { name: "Gabon", "alpha-2": "GA", "country-code": "266" },
  { name: "Gambia", "alpha-2": "GM", "country-code": "270" },
  { name: "Georgia", "alpha-2": "GE", "country-code": "268" },
  { name: "Germany", "alpha-2": "DE", "country-code": "276" },
  { name: "Ghana", "alpha-2": "GH", "country-code": "288" },
  { name: "Gibraltar", "alpha-2": "GI", "country-code": "292" },
  { name: "Greece", "alpha-2": "GR", "country-code": "300" },
  { name: "Greenland", "alpha-2": "GL", "country-code": "304" },
  { name: "Grenada", "alpha-2": "GD", "country-code": "308" },
  { name: "Guadeloupe", "alpha-2": "GP", "country-code": "312" },
  { name: "Guam", "alpha-2": "GU", "country-code": "316" },
  { name: "Guatemala", "alpha-2": "GT", "country-code": "320" },
  { name: "Guernsey", "alpha-2": "GG", "country-code": "831" },
  { name: "Guinea", "alpha-2": "GN", "country-code": "324" },
  { name: "Guinea-Bissau", "alpha-2": "GW", "country-code": "624" },
  { name: "Guyana", "alpha-2": "GY", "country-code": "328" },
  { name: "Haiti", "alpha-2": "HT", "country-code": "332" },
  {
    name: "Heard Island and McDonald Islands",
    "alpha-2": "HM",
    "country-code": "334",
  },
  { name: "Vatican", "alpha-2": "VA", "country-code": "379" },
  { name: "Honduras", "alpha-2": "HN", "country-code": "340" },
  { name: "Hong Kong", "alpha-2": "HK", "country-code": "344" },
  { name: "Hungary", "alpha-2": "HU", "country-code": "348" },
  { name: "Iceland", "alpha-2": "IS", "country-code": "352" },
  { name: "India", "alpha-2": "IN", "country-code": "356" },
  { name: "Indonesia", "alpha-2": "ID", "country-code": "360" },
  {
    name: "Iran (Islamic Republic of)",
    "alpha-2": "IR",
    "country-code": "364",
  },
  { name: "Iraq", "alpha-2": "IQ", "country-code": "368" },
  { name: "Ireland", "alpha-2": "IE", "country-code": "372" },
  { name: "Isle of Man", "alpha-2": "IM", "country-code": "833" },
  { name: "Israel", "alpha-2": "IL", "country-code": "376" },
  { name: "Italy", "alpha-2": "IT", "country-code": "380" },
  { name: "Jamaica", "alpha-2": "JM", "country-code": "388" },
  { name: "Japan", "alpha-2": "JP", "country-code": "392" },
  { name: "Jersey", "alpha-2": "JE", "country-code": "832" },
  { name: "Jordan", "alpha-2": "JO", "country-code": "400" },
  { name: "Kazakhstan", "alpha-2": "KZ", "country-code": "398" },
  { name: "Kenya", "alpha-2": "KE", "country-code": "404" },
  { name: "Kiribati", "alpha-2": "KI", "country-code": "296" },
  { name: "Kosovo", "alpha-2": "KO", "country-code": "notACountry" },
  {
    name: "Korea (Democratic People's Republic of)",
    "alpha-2": "KP",
    "country-code": "408",
  },
  { name: "Korea, Republic of", "alpha-2": "KR", "country-code": "410" },
  { name: "Kuwait", "alpha-2": "KW", "country-code": "414" },
  { name: "Kyrgyzstan", "alpha-2": "KG", "country-code": "417" },
  {
    name: "Lao People's Democratic Republic",
    "alpha-2": "LA",
    "country-code": "418",
  },
  { name: "Latvia", "alpha-2": "LV", "country-code": "428" },
  { name: "Lebanon", "alpha-2": "LB", "country-code": "422" },
  { name: "Lesotho", "alpha-2": "LS", "country-code": "426" },
  { name: "Liberia", "alpha-2": "LR", "country-code": "430" },
  { name: "Libya", "alpha-2": "LY", "country-code": "434" },
  { name: "Liechtenstein", "alpha-2": "LI", "country-code": "438" },
  { name: "Lithuania", "alpha-2": "LT", "country-code": "440" },
  { name: "Luxembourg", "alpha-2": "LU", "country-code": "442" },
  { name: "Macao", "alpha-2": "MO", "country-code": "446" },
  { name: "Madagascar", "alpha-2": "MG", "country-code": "450" },
  { name: "Malawi", "alpha-2": "MW", "country-code": "454" },
  { name: "Malaysia", "alpha-2": "MY", "country-code": "458" },
  { name: "Maldives", "alpha-2": "MV", "country-code": "462" },
  { name: "Mali", "alpha-2": "ML", "country-code": "466" },
  { name: "Malta", "alpha-2": "MT", "country-code": "470" },
  { name: "Marshall Islands", "alpha-2": "MH", "country-code": "584" },
  { name: "Martinique", "alpha-2": "MQ", "country-code": "474" },
  { name: "Mauritania", "alpha-2": "MR", "country-code": "478" },
  { name: "Mauritius", "alpha-2": "MU", "country-code": "480" },
  { name: "Mayotte", "alpha-2": "YT", "country-code": "175" },
  { name: "Mexico", "alpha-2": "MX", "country-code": "484" },
  {
    name: "Micronesia (Federated States of)",
    "alpha-2": "FM",
    "country-code": "583",
  },
  { name: "Moldova, Republic of", "alpha-2": "MD", "country-code": "498" },
  { name: "Monaco", "alpha-2": "MC", "country-code": "492" },
  { name: "Mongolia", "alpha-2": "MN", "country-code": "496" },
  { name: "Montenegro", "alpha-2": "ME", "country-code": "499" },
  { name: "Montserrat", "alpha-2": "MS", "country-code": "500" },
  { name: "Morocco", "alpha-2": "MA", "country-code": "504" },
  { name: "Mozambique", "alpha-2": "MZ", "country-code": "508" },
  { name: "Myanmar", "alpha-2": "MM", "country-code": "104" },
  { name: "Namibia", "alpha-2": "NA", "country-code": "516" },
  { name: "Nauru", "alpha-2": "NR", "country-code": "520" },
  { name: "Nepal", "alpha-2": "NP", "country-code": "524" },
  { name: "Netherlands", "alpha-2": "NL", "country-code": "528" },
  { name: "New Caledonia", "alpha-2": "NC", "country-code": "540" },
  { name: "New Zealand", "alpha-2": "NZ", "country-code": "554" },
  { name: "Nicaragua", "alpha-2": "NI", "country-code": "558" },
  { name: "Niger", "alpha-2": "NE", "country-code": "562" },
  { name: "Nigeria", "alpha-2": "NG", "country-code": "566" },
  { name: "Niue", "alpha-2": "NU", "country-code": "570" },
  { name: "Norfolk Island", "alpha-2": "NF", "country-code": "574" },
  { name: "North Macedonia", "alpha-2": "MK", "country-code": "807" },
  { name: "Northern Mariana Islands", "alpha-2": "MP", "country-code": "580" },
  { name: "Norway", "alpha-2": "NO", "country-code": "578" },
  { name: "Oman", "alpha-2": "OM", "country-code": "512" },
  { name: "Pakistan", "alpha-2": "PK", "country-code": "586" },
  { name: "Palau", "alpha-2": "PW", "country-code": "585" },
  { name: "Palestine, State of", "alpha-2": "PS", "country-code": "275" },
  { name: "Panama", "alpha-2": "PA", "country-code": "591" },
  { name: "Papua New Guinea", "alpha-2": "PG", "country-code": "598" },
  { name: "Paraguay", "alpha-2": "PY", "country-code": "600" },
  { name: "Peru", "alpha-2": "PE", "country-code": "604" },
  { name: "Philippines", "alpha-2": "PH", "country-code": "608" },
  { name: "Pitcairn", "alpha-2": "PN", "country-code": "612" },
  { name: "Poland", "alpha-2": "PL", "country-code": "616" },
  { name: "Portugal", "alpha-2": "PT", "country-code": "620" },
  { name: "Puerto Rico", "alpha-2": "PR", "country-code": "630" },
  { name: "Qatar", "alpha-2": "QA", "country-code": "634" },
  { name: "Réunion", "alpha-2": "RE", "country-code": "638" },
  { name: "Romania", "alpha-2": "RO", "country-code": "642" },
  { name: "Russian Federation", "alpha-2": "RU", "country-code": "643" },
  { name: "Rwanda", "alpha-2": "RW", "country-code": "646" },
  { name: "Saint Barthélemy", "alpha-2": "BL", "country-code": "652" },
  {
    name: "Saint Helena, Ascension and Tristan da Cunha",
    "alpha-2": "SH",
    "country-code": "654",
  },
  { name: "Saint Kitts and Nevis", "alpha-2": "KN", "country-code": "659" },
  { name: "Saint Lucia", "alpha-2": "LC", "country-code": "662" },
  {
    name: "Saint Martin (French part)",
    "alpha-2": "MF",
    "country-code": "663",
  },
  { name: "Saint Pierre and Miquelon", "alpha-2": "PM", "country-code": "666" },
  {
    name: "Saint Vincent and the Grenadines",
    "alpha-2": "VC",
    "country-code": "670",
  },
  { name: "Samoa", "alpha-2": "WS", "country-code": "882" },
  { name: "San Marino", "alpha-2": "SM", "country-code": "674" },
  { name: "Sao Tome and Principe", "alpha-2": "ST", "country-code": "678" },
  { name: "Saudi Arabia", "alpha-2": "SA", "country-code": "682" },
  { name: "Scotland", "alpha-2": "SW", "country-code": "notACountry" },
  { name: "Senegal", "alpha-2": "SN", "country-code": "686" },
  { name: "Serbia", "alpha-2": "RS", "country-code": "688" },
  { name: "Seychelles", "alpha-2": "SC", "country-code": "690" },
  { name: "Sierra Leone", "alpha-2": "SL", "country-code": "694" },
  { name: "Singapore", "alpha-2": "SG", "country-code": "702" },
  { name: "Sint Maarten (Dutch part)", "alpha-2": "SX", "country-code": "534" },
  { name: "Slovakia", "alpha-2": "SK", "country-code": "703" },
  { name: "Slovenia", "alpha-2": "SI", "country-code": "705" },
  { name: "Solomon Islands", "alpha-2": "SB", "country-code": "090" },
  { name: "Somalia", "alpha-2": "SO", "country-code": "706" },
  { name: "South Africa", "alpha-2": "ZA", "country-code": "710" },
  {
    name: "South Georgia and the South Sandwich Islands",
    "alpha-2": "GS",
    "country-code": "239",
  },
  { name: "South Sudan", "alpha-2": "SS", "country-code": "728" },
  { name: "Spain", "alpha-2": "ES", "country-code": "724" },
  { name: "Sri Lanka", "alpha-2": "LK", "country-code": "144" },
  { name: "Sudan", "alpha-2": "SD", "country-code": "729" },
  { name: "Suriname", "alpha-2": "SR", "country-code": "740" },
  { name: "Svalbard and Jan Mayen", "alpha-2": "SJ", "country-code": "744" },
  { name: "Sweden", "alpha-2": "SE", "country-code": "752" },
  { name: "Switzerland", "alpha-2": "CH", "country-code": "756" },
  { name: "Syrian Arab Republic", "alpha-2": "SY", "country-code": "760" },
  { name: "Taiwan, Province of China", "alpha-2": "TW", "country-code": "158" },
  { name: "Taipei", "alpha-2": "TP", "country-code": "notACountry" },
  { name: "Tajikistan", "alpha-2": "TJ", "country-code": "762" },
  {
    name: "Tanzania, United Republic of",
    "alpha-2": "TZ",
    "country-code": "834",
  },
  { name: "Thailand", "alpha-2": "TH", "country-code": "764" },
  { name: "Timor-Leste", "alpha-2": "TL", "country-code": "626" },
  { name: "Togo", "alpha-2": "TG", "country-code": "768" },
  { name: "Tokelau", "alpha-2": "TK", "country-code": "772" },
  { name: "Tonga", "alpha-2": "TO", "country-code": "776" },
  { name: "Trinidad and Tobago", "alpha-2": "TT", "country-code": "780" },
  { name: "Tunisia", "alpha-2": "TN", "country-code": "788" },
  { name: "Turkey", "alpha-2": "TR", "country-code": "792" },
  { name: "Turkmenistan", "alpha-2": "TM", "country-code": "795" },
  { name: "Turks and Caicos Islands", "alpha-2": "TC", "country-code": "796" },
  { name: "Tuvalu", "alpha-2": "TV", "country-code": "798" },
  { name: "Uganda", "alpha-2": "UG", "country-code": "800" },
  { name: "Ukraine", "alpha-2": "UA", "country-code": "804" },
  { name: "United Arab Emirates", "alpha-2": "AE", "country-code": "784" },
  {
    name: "United Kingdom of Great Britain and Northern Ireland",
    "alpha-2": "GB",
    "country-code": "826",
  },
  { name: "United States of America", "alpha-2": "US", "country-code": "840" },
  { name: "Uruguay", "alpha-2": "UY", "country-code": "858" },
  { name: "Uzbekistan", "alpha-2": "UZ", "country-code": "860" },
  { name: "Vanuatu", "alpha-2": "VU", "country-code": "548" },
  {
    name: "Venezuela (Bolivarian Republic of)",
    "alpha-2": "VE",
    "country-code": "862",
  },
  { name: "Viet Nam", "alpha-2": "VN", "country-code": "704" },
  { name: "Virgin Islands (British)", "alpha-2": "VG", "country-code": "092" },
  { name: "Virgin Islands (U.S.)", "alpha-2": "VI", "country-code": "850" },
  { name: "Wales", "alpha-2": "WA", "country-code": "notACountry" },
  { name: "Wallis and Futuna", "alpha-2": "WF", "country-code": "876" },
  { name: "Western Sahara", "alpha-2": "EH", "country-code": "732" },
  { name: "Yemen", "alpha-2": "YE", "country-code": "887" },
  { name: "Zambia", "alpha-2": "ZM", "country-code": "894" },
  { name: "Zimbabwe", "alpha-2": "ZW", "country-code": "716" },
];

const copiedEmails = `fadedz[at]outlook.com
fax.angola[at]gmail.com
antiguanchess[at]outlook.com
federacion.argentina.ajedrez[at]gmail.com
arubachess[at]gmail.com
abasinmohibi[at]gmail.com
gwastell[at]netspace.net.au
info[at]achf.org.al
info[at]escacsandorra.com
sargsyantamarachess[at]aspu.am
email:office[at]chess.at
email:office[at]asf.org.az
tmokwaledi[at]gmail.com
echecsburkina[at]gmail.com
fechebur[at]yahoo.fr
bahamaschessofficial[at]gmail.com
bcfsecretary[at]barbadoschess.org
belizechess.bcf[at]gmail.com
bermudachess[at]gmail.com
federacion.boliviana.ajedrez[at]gmail.com
gmdarcylima[at]gmail.com
triadbvi[at]gmail.com
bahrainchess[at]sport.bh
banchessfed[at]gmail.com
bhutanchessfederation[at]gmail.com
bruneichessfederation[at]hotmail.com
blr_chess[at]tut.by
luc.cornet[at]frbe-kbsb-ksb.be
bihchess[at]bih.net.ba
chess[at]danielflorea.ro
secretariat[at]fecade.cm
geral[at]fcvx.org
echecs236.rca[at]gmail.com
federation.echecstchad[at]yahoo.com
contact[at]fce.co.km
justin_brou6[at]yahoo.fr
info[at]chess.ca
caychess[at]gmail.com
ajefech[at]gmail.com
fecodaz[at]gmail.com
secretaria[at]fcacostarica.com
riverocajedrez[at]gmail.com
dachanggroup[at]gmail.com
2647506476[at]qq.com
chinesetaipeichess[at]gmail.com
hss.crochess[at]gmail.com
cypruschessfederation[at]gmail.com
sekretariat[at]chess.cz
fecojec[at]hotmail.fr
djibfedechec[at]gmail.com
Dominicachessfederation[at]gmail.com
contacto[at]fdajedrez.com
president[at]skak.dk
egyptian.chess.fed[at]gmail.com
ajedrezguinea[at]gmail.com
ernchf[at]gmail.com
swazichess[at]gmail.com
secretaria[at]feda.ec
fedeajedrezsv[at]gmail.com
office[at]englishchess.org.uk
maleliit[at]maleliit.ee

office[at]fijichess.com
ingi[at]faroechess.com
eetu.tiiva[at]shakkiliitto.fi
erick.mouret[at]ffechecs.fr

akanga2001[at]yahoo.fr
laminj2002[at]yahoo.co.uk
ghanachess[at]gmail.com
grenadachessfederation[at]gmail.com
fenag[at]hotmail.com
guyanachess[at]gmail.com
santosalmer[at]yahoo.com
akaki.iashvili[at]fide.com
praesident[at]schachbund.de
info[at]chessfed.gr
gcf[at]gcf.org.gg

info[at]haiti-echecs.org
hernandezjc84[at]gmail.com
kkchan.hkg[at]gmail.com
chess[at]chess.hu

akverma101010[at]gmail.com
pb.percasi[at]gmail.com
ircfchess[at]gmail.com
dhafer.madhloom[at]yahoo.com
skaksamband[at]skaksamband.is
secretary[at]icu.ie
ao[at]manx.net
office[at]chessfed.org.il
fsi[at]federscacchi.it

jamchessfed.secretary[at]gmail.com
info[at]japanchess.org
royalchessjo[at]yahoo.com
louisjouault[at]hotmail.com

secretarychesskenya[at]gmail.com
adiya.n[at]kazchess.kz
q8chess[at]hotmail.com
kyrgyzchessunion[at]gmail.com
fshk[at]shahu-rks.com

motloheloatseliso[at]gmail.com
federationchessliberia[at]gmail.com
Libyanchess[at]yahoo.com
laochess[at]yahoo.com
secretary[at]lebanesechessfederation.org
info[at]sahafederacija.lv
info[at]schach.li
info[at]chessfed.lt
contact[at]flde.lu

fmje.mad123[at]gmail.com
chessam2018[at]gmail.com
fmje2005[at]yahoo.fr
mtnchess[at]yahoo.fr
krish75[at]intnet.mu
frmechecs1963[at]gmail.com
fmxdireccao[at]gmail.com
maramire2001[at]gmail.com
macauchessfederation[at]gmail.com
mcfsecretariat[at]malaysiachess.org
maldiveschessassociation[at]gmail.com
info[at]mcf.mn
chess1991[at]gmail.com
info[at]chessmalta.com
chessfederation.md[at]gmail.com
cemc[at]libello.com
office[at]sahcg.me

president[at]namibiachessfederation.com
contact[at]fenijec.org
kunle[at]olchessclub.com
curacaochessfederation[at]gmail.com
guy.bendana[at]guybendana.com.ni
duggob[at]gmail.com
info[at]nepalchess.org
NZCFSecretary[at]newzealandchess.co.nz
bondsbureau[at]schaakbond.nl
chessmkd[at]t.mk
nsf[at]sjakk.no

omanchesscommittee[at]gmail.com

info[at]ajedrez.com.pa
feparaj[at]gmail.com
unidadtecnica[at]federacionperuanadeajedrez.org
info[at]federaciondeajedrezdepuertorico.com
hanif50us[at]gmail.com
robert_flor31154[at]yahoo.com
pcf[at]poc.ps
tompetermccoy[at]gmail.com
ncfpcorrespondence[at]gmail.com
biuro[at]pzszach.pl
fpx[at]fpx.pt

qatarchess[at]hotmail.com

rwandachess[at]gmail.com
nb[at]ruchess.ru
contact[at]frsah.ro

tomefernandes57[at]gmail.com
fesec.infos[at]gmail.com
seychess[at]yahoo.com
secretariat[at]sierraleonechess.org
Somalichess[at]hotmail.com
olalekan.adeyemi[at]fide.com
president[at]sscfed.com
sudanchessfed[at]yahoo.com
pdellapstanley[at]gmail.com
StLuciaChessFederation[at]gmail.com
svgchessf[at]yahoo.com
surichess[at]yahoo.com
info[at]scf.gov.sa
sgchessfed[at]singaporechess.org.sg
amaelasi[at]gmail.com
kchess3448[at]gmail.com
chessfederationsl[at]gmail.com
aliabbas.chess[at]gmail.com
smrchessfed[at]yahoo.it
fide[at]chessscotland.com
office[at]serbiachess.org
sekretariat[at]chess.sk
info[at]sah-zveza.si
ajedrez[at]feda.org
kansliet[at]schack.se
andre.voegtlin[at]swisschess.ch

kenokenneth8[at]gmail.com
ftdetogo[at]yahoo.fr
tunchess.fed[at]gmail.com
secretary[at]chesstt.org
tajchessfed[at]mail.ru
thailandchess.tca[at]gmail.com
ztilman1411[at]gmail.com
tkmchess[at]gmail.com
tsf[at]tsf.org.tr

ugandachess[at]yahoo.com
littlehouseofchess[at]gmail.com
presidencia[at]fuajedrez.org
usvichess[at]gmail.com

uzchess[at]inbox.ru
rating[at]ukr.net

fvajedrez[at]gmail.com
office[at]vietnamchess.vn

executivedirector[at]welshchessunion.uk

Yemenchessfederation1[at]gmail.com

cfz.secretariat[at]gmail.com
adeyinkaadewole[at]gmail.com`;

const federationEmails = copiedEmails.split("\n");

const copiedCountryNames = `Algeria
Angola
Antigua and Barbuda
Argentina
Aruba
Afghanistan
Australia
Albania
Andorra
Armenia
Austria
Azerbaijan
Botswana
Burkina Faso
Burundi
Bahamas
Barbados
Belize
Bermuda
Bolivia
Brazil
British Virgin Islands
Bahrain
Bangladesh
Bhutan
Brunei Darussalam
Belarus
Belgium
Bosnia & Herzegovina
Bulgaria
Cameroon
Cape Verde
Central African Republic
Chad
Comoros Islands
Cote d’Ivoire
Canada
Cayman Islands
Chile
Colombia
Costa Rica
Cuba
Cambodia
China
Chinese Taipei
Croatia
Cyprus
Czech Republic
Democratic Republic of the Congo
Djibouti
Dominica
Dominican Republic
Denmark
Egypt
Equatorial Guinea
Eritrea
Eswatini
Ecuador
El Salvador
England
Estonia

Fiji
Faroe Islands
Finland
France

Gabon
Gambia
Ghana
Grenada
Guatemala
Guyana
Guam
Georgia
Germany
Greece
Guernsey

Haiti
Honduras
Hong Kong, China
Hungary

India
Indonesia
Iran
Iraq
Iceland
Ireland
Isle of Man
Israel
Italy

Jamaica
Japan
Jordan
Jersey

Kenya
Kazakhstan
Kuwait
Kyrgyzstan
Kosovo

Lesotho
Liberia
Libya
Laos
Lebanon
Latvia
Liechtenstein
Lithuania
Luxembourg

Madagascar
Malawi
Mali
Mauritania
Mauritius
Morocco
Mozambique
Mexico
Macau
Malaysia
Maldives
Mongolia
Myanmar
Malta
Moldova
Monaco
Montenegro

Namibia
Niger
Nigeria
Netherlands Antilles
Nicaragua
Nauru
Nepal
New Zealand
Netherlands
North Macedonia
Norway

Oman

Panama
Paraguay
Peru
Puerto Rico
Pakistan
Palau
Palestine
Papua New Guinea
Philippines
Poland
Portugal

Qatar

Rwanda
Russian Federation
Romania

Sao Tome and Principe
Senegal
Seychelles
Sierra Leone
Somalia
South Africa
South Sudan
Sudan
St Kitts and Nevis
Saint Lucia
Saint Vincent and the Grenadines
Suriname
Saudi Arabia
Singapore
Solomon Islands
South Korea
Sri Lanka
Syria
San Marino
Scotland
Serbia
Slovakia
Slovenia
Spain
Sweden
Switzerland

Tanzania
Togo
Tunisia
Trinidad and Tobago
Tajikistan
Thailand
Timor-Leste
Turkmenistan
Turkiye

Uganda
United States of America
Uruguay
US Virgin Islands
United Arab Emirates
Uzbekistan
Ukraine

Venezuela
Vietnam

Wales

Yemen

Zambia
Zimbabwe`;

let copiedLinks = `http://www.fade-dz.net/


http://www.federacionargentinadeajedrez.org/


http://www.auschess.org.au/
https://achf.org.al/
http://www.escacsandorra.com/
http://www.chessfed.am/
http://www.chess.at/

https://www.bnsc.co.bw/node/187


http://www.bahamaschess.org/
http://www.barbadoschess.org/
https://www.belizechess.com/
https://www.bermudachess.com/
https://www.federacionbolivianadeajedrez.com/
http://www.cbx.org.br/


https://www.bdchessfederation.com/

http://www.bruneichess.org.bn/
http://www.openchess.by/
https://www.frbe-kbsb-ksb.be/en/


http://www.fecade.cm/
http://www.fcvx.org/




http://www.chess.ca/


http://www.fecodaz.com/
https://fcacostarica.com/


http://cca.imsa.cn/
http://www.chinesetaipeichess.com.tw/
https://hrvatski-sahovski-savez.hr/
https://cypruschessfederation.org/
http://www.chess.cz/


https://www.facebook.com/chess767/
http://fdajedrez.com/
http://www.skak.dk/





http://www.ajedrezenelsalvador.com/
http://www.englishchess.org.uk/
http://www.maleliit.ee/

https://www.facebook.com/fijichess
http://www.faroechess.com/
http://www.shakkiliitto.fi/
http://www.echecs.asso.fr/



http://ghanachess.com/

http://www.fenag.net/
https://guyanachess.gy/

http://www.gcf.org.ge/
http://www.schachbund.de/
http://www.chessfed.gr/
http://www.guernseychessfederation.org.gg/


http://www.ajedrezhonduras.com/
https://hkcfl.com/
http://www.chess.hu/

http://www.aicf.in/
https://www.pbpercasi.com/
http://www.ircf.ir/

http://www.skaksamband.is/
http://www.icu.ie/

http://www.chess.org.il/
http://www.federscacchi.it/

http://www.jamchess.com/
https://japanchess.org/
http://www.jordanchess.com/
http://www.jerseychessclub.com/

http://www.chesskenya.or.ke/
http://www.kazchess.kz/
http://www.kmsaq8.com/

http://www.shahu-rks.com/




http://laoschess.com/
https://lebanesechessfederation.org/
https://sahafederacija.lv/
http://www.schach.li/
http://www.chessfed.lt/
http://www.flde.lu/


http://malawi.fide.com/

http://www.mauritaniachess.com/
http://www.mauritius-chess-federation.com/




http://malaysiachess.org/

http://www.mongolchess.mn/
http://www.myachess.com/
http://www.chessmalta.com/
http://www.sahmoldova.md/
http://www.facebook.com/groups/722958844403190
http://www.sahcg.me/

http://www.namchess.blogspot.com/
https://fenijec.org/
http://www.ncf.com.ng/

http://www.academiadeajedrezjulioramirezdearellano.com/

http://www.nepalchess.org/
http://www.newzealandchess.co.nz/
https://www.schaakbond.nl/
http://chess-mkd.mk/
http://www.sjakk.no/

https://www.oman-chess.org/home/

https://ajedrez.com.pa/
http://www.feparaj.org.py/
https://federacionperuanadeajedrez.org/
https://www.federaciondeajedrezdepuertorico.com/

http://www.palau-chess.blogspot.com/
http://www.palchess.ps/
http://www.auschess.org.au/oceania/png/
http://www.ncf-phil.org/
http://www.pzszach.pl/
http://www.fpx.pt/

http://www.qatarchess.com/


http://www.ruchess.ru/
http://www.frsah.ro/

http://www.fexa.asso-stp.org/
https://www.fesec.org/


http://www.somchess.net/






http://www.surichess.com/
http://scf.gov.sa/
http://www.singaporechess.org.sg/

http://www.kchess.or.kr/
http://www.srilankachess.lk/

https://sanmarinoscacchi.com/
http://www.chessscotland.com/
http://serbiachess.org/
http://www.chess.sk/
http://www.sah-zveza.si/
http://www.feda.org/
http://www.schack.se/
http://www.swisschess.ch/


https://ftde.org/
http://www.chess.tn/
http://www.chesstt.org/

http://www.thailandchess.or.th/


http://www.tsf.org.tr/

http://uganda.fide.com/
https://new.uschess.org/
http://www.fuajedrez.com/
http://www.usvichessfederation.com/
http://www.uaechess.ae/
http://www.uzchess.uz/
http://www.ukrchess.org.ua/


http://vnchess.com.vn/

http://www.welshchessunion.uk/



http://www.zambiachess.com/
https://zimbabwechess.com/`;

let copiedContactNames = `








Tamara Sargsyan

















Luc Cornet

Daniel Florea






































Lamin Jammeh





Akaki Iashvili
Ingrid Lauterbach








Adjeet Kumar Verma




Ciaran Mahon







Louis Jouault


Adiya Nurmanova
































Khoa Goodwill

















Hanif Qureshi










Nina Bodenchuk










P'Della'P Stanley












Vladimir Szucs



Andre Voegtlin












Sophia Rhode









Mark Adams




`;

const excelContactNames = copiedContactNames.split("\n");

const excelLinks = copiedLinks.split("\n");

const excelCountryNames = copiedCountryNames.split("\n");

let excelCountryDatas = [];

for (let i = 0; i < excelCountryNames.length; i++) {
  excelCountryDatas.push([
    excelCountryNames[i],
    federationEmails[i],
    excelLinks[i],
    excelContactNames[i],
  ]);
}

for (const country of countryCodes) {
  for (let i = 0; i < excelCountryDatas.length; i++) {
    if (country.name == excelCountryDatas[i][0]) {
      country.email = excelCountryDatas[i][1];
      country.website = excelCountryDatas[i][2];
      country.contact = excelCountryDatas[i][3];
    }
  }
}
