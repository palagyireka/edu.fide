fetch("/api/listevents").then(async (response) => {
  let { events } = await response.json();
  const transformedEvents = eventTransform(events);
  const calendarListView = document.querySelector(".calendar-ul");
  transformedEvents.forEach((event) => {
    const listItem = document.createElement("li");
    const listItemTitle = document.createElement("div");
    const listItemDate = document.createElement("div");
    listItemTitle.innerText = event.title;
    listItemTitle.style.borderLeft = `4px solid ${event.backgroundColor}`;
    let listItemDateString = new Date(event.start);
    listItemDateString =
      listItemDateString.toLocaleString("default", {
        month: "long",
      }) +
      " " +
      listItemDateString.toLocaleString("default", {
        day: "numeric",
      });
    listItemDate.innerText = listItemDateString;
    listItem.appendChild(listItemDate);
    listItem.appendChild(listItemTitle);
    calendarListView.appendChild(listItem);
  });
});

const eventTransform = (events) => {
  if (events) {
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
        attendees: ["fideEdu"],
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

      return eventObject;
    });
  } else {
    document.querySelector(".calendar-list-container").remove();
  }
};
