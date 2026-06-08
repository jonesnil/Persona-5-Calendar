import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import calendarData from './Persona5RoyalCalendarInfo.json'
function Details({ onClickPreviousDay, onClickNextDay, windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents }) {
    var selectedMonth = calendarData["Months"][selectedMonthIndex];
    var selectedDay = calendarData["Months"][selectedMonthIndex]["Weeks"][selectedWeekIndex][selectedDayIndex];

    if (selectedDay["OutOfMonth"]) {
        if (selectedDay["OutOfMonthNum"] < selectedMonth["Number"]
            && selectedMonthIndex > 0) {
            var previousMonth = calendarData["Months"][selectedMonthIndex - 1];
            var numberOfWeeksInPreviousMonth = previousMonth["Weeks"].length;
            selectedDay = previousMonth["Weeks"][numberOfWeeksInPreviousMonth - 1][selectedDayIndex];
            selectedMonth = previousMonth;
        }
        if (selectedDay["OutOfMonthNum"] > selectedMonth["Number"]
            && selectedMonthIndex < calendarData["Months"].length - 1) {
            var nextMonth = calendarData["Months"][selectedMonthIndex + 1];
            console.log(`next month is ${selectedMonthIndex + 1}`);
            selectedDay = nextMonth["Weeks"][0][selectedDayIndex];
            selectedMonth = nextMonth;
        }
    }

    return <div className="card details">
        <div className="card-body">
            <DetailsNavbar day={selectedDay} month={selectedMonth} onClickNextDay={onClickNextDay} onClickPreviousDay={onClickPreviousDay} windowDimensions={windowDimensions}></DetailsNavbar>
            <WeatherDetails day={selectedDay} dayTime={true}></WeatherDetails>
            <WeatherDetails day={selectedDay} dayTime={false}></WeatherDetails>
            <FreeTimeDetails day={selectedDay}></FreeTimeDetails>
            {("Events" in selectedDay && selectedDay["Events"].length > 0) ?
                <ListGroup className="fs-6 arsenal-regular mb-2" style={{ clear: "both", display: "block" }}>
                    {selectedDay["Events"].map((event) =>
                        <CalendarEventDetails key={event["Title"]} event={event}
                            displayExamEvents={displayExamEvents}
                            displayStoryEvents={displayStoryEvents}
                            displayJazzClubEvents={displayJazzClubEvents}
                            displayPuzzleEvents={displayPuzzleEvents} ></CalendarEventDetails>)}
                </ListGroup> : ""
            }
            <WeeklyEventDetails day={selectedDay}></WeeklyEventDetails>
        </div>
    </div>
}

function DetailsNavbar({ day, month, onClickNextDay, onClickPreviousDay, windowDimensions }) {
    var dayText;
    var monthText;
    if (windowDimensions.width > 768 && windowDimensions.width <= 1024) {
        monthText = day["OutOfMonth"] ? day["OutOfMonthNum"] : month["Number"];
        dayText = `${monthText}/${day["Date"]}`;
    }
    else {
        monthText = day["OutOfMonth"] ? day["OutOfMonth"] : month["Month"];
        dayText = `${day["WeekDay"]} ${monthText} ${day["Date"]}`;
    }
    return <h5 className="card-title text-center mb-4 libre-franklin-regular flexSpaceBetween">
        <Button variant="danger" onClick={onClickPreviousDay}>
            <span className="material-symbols-outlined">line_start_arrow_notch</span>
        </Button>
        <span>{dayText}</span>
        <Button variant="danger" onClick={onClickNextDay}>
            <span className="material-symbols-outlined">line_end_arrow_notch</span>
        </Button>
    </h5>
}

function CalendarEventDetails({ event, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents }) {
    switch (event["Type"]) {
        case 'Exam':
            if (!displayExamEvents)
                return null;
            break;
        case 'Jazz Club':
            if (!displayJazzClubEvents)
                return null;
            break;
        case 'Story':
            if (!displayStoryEvents)
                return null;
            break;
        case 'Puzzle':
            if (!displayPuzzleEvents)
                return null;
            break;
    }

    return (<ListGroup.Item className={"arsenal-bold " + event["Type"].replaceAll(' ', '')}>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{event["Title"]}</h5>
            <small>{event["Type"]}</small>
        </div>
        <p className="mb-1">{event["Details"]}</p>
        <ListGroup>
            {event["ListDetails"] ? event["ListDetails"].map((listItem, index) => <ListGroup.Item key={index}>{listItem}</ListGroup.Item>) : ""}
        </ListGroup>
        <small>{event["Footnote"]}</small>
    </ListGroup.Item>)
}
function WeatherDetails({ day, dayTime }) {
    var headerText;
    var statusEffects = [];
    var weatherSlot = day["WeatherDay"];
    var timeSlot = day["DaySlot"];

    if (!dayTime) {
        weatherSlot = day["WeatherNight"];
        timeSlot = day["NightSlot"];
    }

    if (timeSlot === "Free") {
        switch (weatherSlot) {
            case 'Rain':
                if (dayTime) {
                    headerText = "Rainy Day";
                    statusEffects.push("Studying at Diner gives +3 Knowledge");
                }
                else {
                    headerText = "Rainy Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
            case 'Torrential Rain':
                if (dayTime) {
                    headerText = "Torrential Rain";
                    statusEffects.push("Mementos Effect: Higher chance of rare/treasure shadows");
                    statusEffects.push("Mementos Effect: More treasure chests");
                    statusEffects.push("Studying at Diner gives +3 Knowledge");

                }
                else {
                    headerText = "Rainy Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
            case 'Snow':
                if (dayTime) {
                    headerText = "Snowy Day";
                    statusEffects.push("Studying at Diner gives +3 Knowledge");
                }
                else {
                    headerText = "Snowy Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
            case 'Flu Season':
                if (dayTime) {
                    headerText = "Flu Season";
                    statusEffects.push("Mementos Effect: Shadows may start combat with Despair");
                }
                break;
            case 'Pollen':
                if (dayTime) {
                    headerText = "Pollen Warning";
                    statusEffects.push("Mementos Effect: Shadows may start combat Asleep");
                }
                break;
            case 'Heat Wave':
                if (dayTime) {
                    headerText = "Heat Wave";
                    statusEffects.push("Mementos Effect: Shadows may start combat with Burn");
                    statusEffects.push("Studying at Diner gives +3 Knowledge");
                }
                else {
                    headerText = "Tropical Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
            case 'Tropical Night':
                if (dayTime) {
                    headerText = "Heat Wave";
                    statusEffects.push("Mementos Effect: Shadows may start combat with Burn");
                    statusEffects.push("Studying at Diner gives +3 Knowledge");
                }
                else {
                    headerText = "Tropical Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
            case 'Cold Wave':
                if (dayTime) {
                    headerText = "Cold Day";
                    statusEffects.push("Mementos Effect: Shadows may start combat with Freeze");
                    statusEffects.push("Studying at Diner gives +3 Knowledge");
                }
                else {
                    headerText = "Cold Night";
                    statusEffects.push("Bathhouse gives +3 Charm and +1 Guts");
                    statusEffects.push("Studying at Leblanc gives +3 Knowledge");
                }
                break;
        }
    }

    if (headerText) {
        return <div className="mb-3">
            <h4>{headerText}</h4>
            <ul>
                {statusEffects.map((status, index) => <li key={index}>{status}</li>)}
            </ul>
        </div>
    }
    return (null)
}

function FreeTimeDetails({ day }) {
    var headerText;
    var detailedText;
    if (day["DaySlot"] === "Blocked" &&
        day["NightSlot"] === "Blocked") {
        headerText = "Busy Day!";
        detailedText = "Joker will have no free time.";
    }
    else if (day["DaySlot"] === "Blocked" && day["NightSlot"] === "Restricted") {
        headerText = "Busy day, night in...";
        detailedText = "Joker will only have free time at night, and he must stay in Leblanc.";
    }
    else if (day["DaySlot"] === "Free" && day["NightSlot"] === "Restricted") {
        headerText = "Night in...";
        detailedText = "Joker must stay in Leblanc at night.";
    }
    else if (day["DaySlot"] === "Blocked") {
        headerText = "Busy Afternoon!";
        detailedText = "Joker will only have free time at night.";
    }
    else if (day["NightSlot"] === "Blocked") {
        headerText = "Busy Night!";
        detailedText = "Joker will only have free time during the day.";
    }

    if (headerText) {
        return <div className="mb-3">
            <h4>{headerText}</h4>
            <span>{detailedText}</span>
        </div>
    }
    return (null)
}

function WeeklyEventDetails({ day }) {
    var headerText;
    var detailedText;

    if (day["DaySlot"] === "Free" || day["NightSlot"] === "Free") {
        switch (day["WeekDay"]) {
            case 'Sunday':
                headerText = "Aojiru";
                detailedText = "Visit the drink stand in the Shibuya Underground Walkway to buy a Social Stat raising drink (does not spend free time!)";
                break;
        }
    }

    if (headerText) {
        return <div className="mb-3">
            <h4>{headerText}</h4>
            <span>{detailedText}</span>
        </div>
    }
    return (null)
}

export default Details;