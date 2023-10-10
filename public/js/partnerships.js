const partnerships = [
  {
    partner: "Opening Master",
    img: "/partnerships/OM-logo.webp",
    imgLink: "https://www.openingmaster.com/",
    desc: `Opening Master is an exceptional resource for the chess community, offering comprehensive databases and resources created by internationally recognized players with over 30 years of experience. Opening Master chess databases are an invaluable resource for chess players of all levels, from beginners to seasoned professionals. With the regularly updated comprehensive collection of opening variations, game analysis, and historical data, players can deepen their understanding of the game and develop their skills.
  Under an agreement signed with FIDE EDU in May 2023, Opening Master provides chess database support to FIDE EDU’s University Online Championships, FIDE EDU Online Courses as free memberships to teachers who complete the Preparation of Teachers and Preparation of Lecturers courses, FIDE EDU Training Courses  – led by the CIE Development Team for teachers/coaches who attend training and their students, and Chess for Freedom Online Championships memberships to participating institutions (prisons). Opening Master provides its premium chess databases, which currently hold more than 9.6 million official over-the-board human chess games and are growing on a monthly basis, to help FIDE EDU advance these initiatives.`,
  },
  {
    partner: "CIE Coalition",
    img: "/partnerships/blue-logo.webp",
    imgLink: "https://chessineducation.org/",
    desc: `This independent, non-commercial portal, chessineducation.org offers educators, researchers, and the general public access to the current state of the art information about Chess in Education (CIE) – both theory and current practice around the world. The website is a part of the CIE Initiative operated by Chess in Education – US, a non-profit US [501(c)(3)] corporation, in collaboration with the CIE Coalition, a group of several commercial and other non-profit organizations with a shared interest in advancing CIE.`,
  },
];

const memberships = document.querySelector("main.partnerships .members");

for (const member of partnerships) {
  const div = document.createElement("div");
  div.classList.add("memberdiv");
  const partner = document.createElement("h3");
  partner.innerText = member.partner;
  const imgLink = document.createElement("a");
  imgLink.href = member.imgLink;
  imgLink.target = "_blank";
  const img = document.createElement("img");
  img.src = member.img;
  img.alt = member.partner;
  imgLink.appendChild(img);
  const desc = document.createElement("p");
  desc.innerText = member.desc;
  div.appendChild(partner);
  div.appendChild(imgLink);
  div.appendChild(desc);
  memberships.appendChild(div);
}
