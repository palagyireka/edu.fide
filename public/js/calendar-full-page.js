const Calendar = tui.Calendar;
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const todayBtn = document.getElementById("today-btn");
const monthDisplay = document.getElementById("month");

const calendar = new Calendar("#calendar", {
  defaultView: "month",
  useDetailPopup: true,
  isReadOnly: true,
  month: { startDayOfWeek: 1 },
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const urlParams = new URLSearchParams(window.location.search);
const eventDate = new Date(urlParams.get("date").substring(0, 10));

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function setDate() {
  const dateObj = calendar.getDate();
  const currentYear = dateObj.d.getFullYear();
  const currentMonth = dateObj.d.getMonth();

  monthDisplay.innerText = `${currentYear} ${months[currentMonth]}`;
}
for (
  let i = 0;
  i < (calendar.getDate().getMonth() - eventDate.getMonth()) * -1;
  i++
) {
  loopFired = true;
  calendar.next();
}
setDate();
const urlParamsD = new URLSearchParams(window.location.search);
const eventID = urlParams.get("evtid");
prevBtn.addEventListener("click", () => {
  calendar.prev();
  setDate();
});

nextBtn.addEventListener("click", () => {
  calendar.next();
  setDate();
});

todayBtn.addEventListener("click", () => {
  calendar.today();
  setDate();
});

const eventAttachments = [];
let transformedEvents;

fetch("/api/events")
  .then(async (response) => {
    let { events } = await response.json();
    transformedEvents = eventTransform(events);
    calendar.createEvents(transformedEvents);
  })
  .catch((e) => {
    console.log(e);
  });

waitForElm(`[data-event-id="${eventID}"]`).then(() => {
  const el = document.querySelector(`[data-event-id="${eventID}"]`);

  const elRect = el.getBoundingClientRect();
  const model = calendar.getEvent(eventID, "1");

  calendar.getStoreDispatchers().popup.showDetailPopup(
    {
      event: model,
      eventRect: elRect,
    },
    false
  );
});

const eventTransform = (events) => {
  return events.map((evt) => {
    let evtCategory;
    let evtStart;
    let evtEnd;

    if (typeof evt.start.date !== "undefined") {
      evtCategory = "allday";
      evtStart = evt.start.date;
      evtEnd = evt.end.date;
    } else {
      evtCategory = "time";
      evtStart = evt.start.dateTime;
      evtEnd = evt.end.dateTime;
    }

    const eventObject = {
      id: evt.id,
      calendarId: "1",
      title: evt.summary,
      category: evtCategory,
      start: evtStart,
      end: evtEnd,
      attendees: [""],
      color: "#FFFFFF",
    };

    if (typeof evt.summary !== "undefined") {
      eventObject.title = evt.summary;
    } else {
      eventObject.title = "No title";
    }

    if (typeof evt.location !== "undefined") {
      eventObject.location = evt.location;
    }

    if (typeof evt.description !== "undefined") {
      eventObject.body = evt.description;
    }

    if (typeof evt.colorId !== "undefined") {
      switch (evt.colorId) {
        case "1":
          eventObject.backgroundColor = "#7986cb";
          break;
        case "2":
          eventObject.backgroundColor = "#33b679";
          break;
        case "3":
          eventObject.backgroundColor = "#8e24aa";
          break;
        case "4":
          eventObject.backgroundColor = "#e67c73";
          break;
        case "5":
          eventObject.backgroundColor = "#f6c026";
          break;
        case "6":
          eventObject.backgroundColor = "#f5511d";
          break;
        case "7":
          eventObject.backgroundColor = "#039be5";
          break;
        case "8":
          eventObject.backgroundColor = "#616161";
          break;
        case "9":
          eventObject.backgroundColor = "#3f51b5";
          break;
        case "10":
          eventObject.backgroundColor = "#0b8043";
          break;
        case "11":
          eventObject.backgroundColor = "#d60000";
          break;
      }
    } else {
      eventObject.backgroundColor = "#5b85aa";
    }

    if (evt.attachments) {
      eventAttachments.push(evt.attachments[0]);
    } else {
      eventAttachments.push("");
    }
    return eventObject;
  });
};

const changeToAttachment = () => {
  const title = document.querySelector(
    ".toastui-calendar-template-popupDetailTitle"
  ).innerText;
  const spaceForLink = document.querySelector(
    ".toastui-calendar-template-popupDetailAttendees"
  );
  const index = transformedEvents.findIndex(
    (element) => element.title === title
  );

  spaceForLink.innerHTML = `<a href="${eventAttachments[index].fileUrl}" target="_blank">${eventAttachments[index].title}</a>`;
};

const popup = document.querySelector(".toastui-calendar-popup-overlay");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName !== "style") return;
    if (mutation.target.style.display === "block") {
      changeToAttachment();
      const attachmentIcon = document.querySelector(
        ".toastui-calendar-ic-user-b"
      );

      attachmentIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
<path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
</svg>`;
    }
  });
});

observer.observe(popup, {
  attributeFilter: ["style"],
});
