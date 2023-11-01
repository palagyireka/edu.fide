const editorOptions = {
  theme: "snow",
  modules: {
    imageResize: {},
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
      ],
    },
  },
};

const quill = new Quill("#editor", editorOptions);
const saveBtn = document.getElementById("save-edit");
const url = window.location.href;
const id = url.split("/")[4];

const setContent = () => {
  const value = `  <h2>FIDE PREPARATION OF TEACHERS COURSE COURSE DESCRIPTION</h2>
  <img src="/css/course-nfo.jpg" alt="Course info" />
  <h3>DURATION</h3>
  <p>Three days.</p>
  <h3>PREREQUISITES</h3>
  <p>
    Some classroom teaching experience is recommended. Basic knowledge of chess
    rules and regulations is required.
  </p>
  <p>
    Please note that to enrol in the course, having a FIDE ID is not obligatory,
    but it is needed to update your FIDE profile with the corresponding title
    obtained. In order to get it, you should request the Rating Officer of your
    chess federation to issue a FIDE ID to you.
  </p>
  <h3>TARGET AUDIENCE</h3>
  <p>Teachers, chess educators, beginner, and advanced players.</p>
  <h3>COURSE DESCRIPTION</h3>
  <p>
    Participate in a hands-on experience designed to introduce the game of
    chess. Create an inclusive age-appropriate positive learning environment for
    learners aged six years and older. The game is introduced through a series
    of minigames and exercises. Get familiar with different ideas on planning
    and providing chess lessons. Be introduced to current teaching methods and
    creative tools for online and face-to-face deliveries. Learn how to
    integrate critical thinking, literacy, and math into chess-related
    activities. Learn how to communicate with stakeholders about the benefits
    students are gaining from chess.
  </p>
  <h3>LEARNING OUTCOMES</h3>
  <p>
    Through interactive facilitation and group activities, participants will:
  </p>
  <ul>
    <li>Learn/Review basic chess knowledge.</li>
    <li>
      Connect chess to teaching academic and 21st century skills, such as
      critical thinking, creativity, communication, and collaboration.
    </li>
    <li>
      Discover ways to differentiate between various age and/or skill levels.
    </li>
    <li>
      Learn strategies for classroom management along with using mini-game and
      social chess activities that promote student motivation.
    </li>
    <li>Create and share lesson plans.</li>
    <li>Complete an online assessment based on course content.</li>
  </ul>
  <h3>TITLES</h3>
  <p>
    Successful candidates will obtain the FIDE School Instructor title. Titles
    when awarded include a three-year licence.
  </p>
  <p>
    Participants who pass the exam successfully will be offered lifetime access
    to the Opening Master premium chess databases, which currently hold more
    than 9.6 million official over-the-board human chess games and are growing
    on a monthly basis.
  </p>
  <p>
    Renewal of the licence requires the completion of a professional development
    course. A list of approved courses will be made available in early 2025. All
    previous School Instructor title holders (2012-2021) will be considered to
    have their title certificate licence validity until 28 February 2025.
  </p>`;
  const delta = quill.clipboard.convert(value);
  console.log("set");

  quill.setContents(delta, "silent");
};

setContent();

const getPath = () => {
  const params = window.location.pathname.split("/");
  const secondlast = params[params.length - 2];
  return secondlast;
};

const path = getPath();

const clickHandler = async () => {
  const textContent = quill.getContents();

  const postData = JSON.stringify({
    text: textContent,
  });

  fetch(`/pot/${path}`, {
    method: "POST",
    body: postData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      window.location.replace(`/pot/${path}`);
    })
    .catch(() => {
      window.location.replace(`/${path}/edit`);
    });
};

saveBtn.addEventListener("click", () => {
  clickHandler();
});
