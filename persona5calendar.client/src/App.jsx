import { useEffect, useState } from 'react';
import './App.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import calendarData from './Persona5RoyalCalendarInfo.json'
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function weatherIconNameLookup(weather) {

    var iconName = null;
    switch (weather) {
        case 'Rain':
            iconName = "rainy";
            break;
        case 'Torrential Rain':
            iconName = "thunderstorm";
            break;
        case 'Snow':
            iconName = "snowflake";
            break;
        case 'Flu Season':
            iconName = "sick";
            break;
        case 'Pollen':
            iconName = "allergy";
            break;
        case 'Heat Wave':
            iconName = "local_fire_department";
            break;
        case 'Tropical Night':
            iconName = "local_fire_department";
            break;
        case 'Cold Wave':
            iconName = "thermostat_arrow_down";
            break;
        case 'Cloudy':
            iconName = "cloud";
            break;
        case 'Clear':
            iconName = "clear_day";
            break;
    }
    return iconName;
}

function EventOptionsModal({ show, handleClose, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} data-bs-theme="dark">
                <Modal.Header closeButton className="libre-franklin-regular">
                    <Modal.Title>Event Display Settings:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup className="arsenal-bold">
                    <ListGroup.Item className="Story">
                    <Form.Check type="checkbox" id="StoryEventsCheck" checked={displayStoryEvents}
                        label="Display Story Events (Spoilers!)"
                        onChange={e => {
                        setDisplayStoryEvents(e.target.checked)
                    }} />
                    </ListGroup.Item>
                    <ListGroup.Item className="Exam">
                    <Form.Check type="checkbox" id="ExamEventsCheck" checked={displayExamEvents}
                        label="Display Exam Events"
                        onChange={e => {
                            setDisplayExamEvents(e.target.checked)
                        }} />
                        </ListGroup.Item>
                    <ListGroup.Item className="JazzClub">
                    <Form.Check type="checkbox" id="JazzClubEventsCheck"checked={displayJazzClubEvents}
                        label="Display Jazz Club Events"
                        onChange={e => {
                        setDisplayJazzClubEvents(e.target.checked)
                    }} />
                    </ListGroup.Item>
                    <ListGroup.Item className="Puzzle">
                    <Form.Check type="checkbox" id="PuzzleEventsCheck"checked={displayPuzzleEvents}
                        label="Display Puzzle Events"
                        onChange={e => {
                            setDisplayPuzzleEvents(e.target.checked)
                        }} />
                    </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}

function WeatherIcon({ weather, windowDimensions }) {
    var iconName = weatherIconNameLookup(weather);
    if (windowDimensions.width <= 768) {
        iconName = null;
    }

    return <span className="material-symbols-outlined inlineIcon" title={weather}>{iconName}</span>
}

function CalendarEvent({ windowDimensions, event, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents }) {
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

    return <ListGroup.Item className={"arsenal-bold calendarEventSmall " + event["Type"].replaceAll(' ', '')}>
            {windowDimensions.width <= 1024 ? null : event["Title"]} 
           </ListGroup.Item>
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

function CalendarDay({ windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, weekIndex, dayIndex, onCalendarDayClick, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents }) {
    var day = calendarData["Months"][selectedMonthIndex]["Weeks"][weekIndex][dayIndex];
    var cellClasses = "arsenal-regular ";

    if (day["OutOfMonth"]) {
        cellClasses += "outOfMonth ";
    }

    var dateNumberClasses = "pe-2 "

    if (selectedWeekIndex === weekIndex &&
        selectedDayIndex === dayIndex) {
        dateNumberClasses += "calendarDateNumberSelected boxedText libre-franklin-bold rotatedText ";
    }
    else {
        dateNumberClasses += "calendarDateNumber arsenal-bold ";
    }

    var dayOverviewClasses = `dayOverviewDiv mb-2 ${day["DaySlot"]}${day["NightSlot"]}`;

    return (
        <td className={cellClasses} onClick={onCalendarDayClick}>
            <div className={dayOverviewClasses}>
                <div className="ps-1">
                    <WeatherIcon weather={day["WeatherDay"]} windowDimensions={windowDimensions}></WeatherIcon>
                    {weatherIconNameLookup(day["WeatherDay"]) === weatherIconNameLookup(day["WeatherNight"])
                        ? ""
                        : < WeatherIcon weather={day["WeatherNight"]} windowDimensions={windowDimensions}></WeatherIcon>}
                </div>
                <span className={dateNumberClasses} >{day["Date"]}</span>
            </div>
            {("Events" in day && day["Events"].length > 0) ?
                <ListGroup className="fs-6">
                    {day["Events"].map((event) =>
                        <CalendarEvent windowDimensions={windowDimensions} key={event["Title"]} event={event}
                            displayExamEvents={displayExamEvents}
                            displayStoryEvents={displayStoryEvents}
                            displayJazzClubEvents={displayJazzClubEvents}
                            displayPuzzleEvents={displayPuzzleEvents}></CalendarEvent>)}
                </ListGroup> : ""
            }
        </td>)
}

function NavBar({ onClickPreviousMonth, onClickNextMonth, selectedMonthIndex, windowDimensions, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents }) {
    var month = calendarData["Months"][selectedMonthIndex];
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <h1 className="navBar text-center libre-franklin-bold" style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="boxedText ms-2" style={{ transform: "rotate(1deg)" }}>{windowDimensions.width <= 768 ? "" : "P5R Planner" }</span>
        <div>
        <Button variant="dark" className="me-2" onClick={onClickPreviousMonth}>
            <span className="material-symbols-outlined">line_start_arrow_notch</span>
            </Button>
            <span className="boxedText" style={{ transform: "rotate(-2deg)" }}>{(windowDimensions.width <= 768 && month["Month"].length > 4) ? month["Month"].substring(0, 3) + "." : month["Month"]}</span>&nbsp;
        <span className="boxedText" style={{ transform: "rotate(1deg)" }}>{month["Year"]}</span>
        <Button variant="dark" className="ms-2" onClick={onClickNextMonth}>
         <span className="material-symbols-outlined">line_end_arrow_notch</span>
            </Button>
        </div>
        <div></div>
        <Button variant="dark" className="me-2 mt-1" onClick={handleShow}>
            <span className="material-symbols-outlined">settings</span>
        </Button>
        <EventOptionsModal show={show} handleClose={handleClose}
            displayExamEvents={displayExamEvents} setDisplayExamEvents={setDisplayExamEvents}
            displayStoryEvents={displayStoryEvents} setDisplayStoryEvents={setDisplayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents} setDisplayJazzClubEvents={setDisplayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents} setDisplayPuzzleEvents={setDisplayPuzzleEvents} ></EventOptionsModal>
        </h1>
}

function Calendar({ onDetailsClick, windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents }) {
    function handleClick(weekIndex, dayIndex) {
        onDetailsClick(weekIndex, dayIndex);
    }

    return <table className="table calendar">
        <colgroup>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
            <col style={{ width: "14%" }} ></col>
        </colgroup>
        <thead>
            <tr className="text-center">
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                </tr>
            </thead>
        <tbody>
            {calendarData["Months"][selectedMonthIndex]["Weeks"].map((week, weekIndex) =>
                <tr key={weekIndex}>
                    {week.map((day, dayIndex) => <CalendarDay key={dayIndex} windowDimensions={windowDimensions} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex} weekIndex={weekIndex} dayIndex={dayIndex} onCalendarDayClick={() => handleClick(weekIndex, dayIndex)}
                        displayExamEvents={displayExamEvents}
                        displayStoryEvents={displayStoryEvents}
                        displayJazzClubEvents={displayJazzClubEvents}
                        displayPuzzleEvents={displayPuzzleEvents}></CalendarDay>)}
                </tr>
                )}
        </tbody>
    </table>
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
                            displayStoryEvents = { displayStoryEvents }
                            displayJazzClubEvents = { displayJazzClubEvents }
                            displayPuzzleEvents = { displayPuzzleEvents } ></CalendarEventDetails>)}
                </ListGroup> : ""
            }
            <WeeklyEventDetails day={selectedDay}></WeeklyEventDetails>
            </div>
           </div>
}

var backPressedDownLast = 0;
var forwardPressedDownLast = 0;
export default function App() {

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [backPressed, setBackPressed] = useState(false);
    const [forwardPressed, setForwardPressed] = useState(false);


    const [displayStoryEvents, setDisplayStoryEvents] = useState(false);
    const [displayExamEvents, setDisplayExamEvents] = useState(true);
    const [displayJazzClubEvents, setDisplayJazzClubEvents] = useState(true);
    const [displayPuzzleEvents, setDisplayPuzzleEvents] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if the pressed key is 'left'
            if (event.keyCode === 37 || event.keyCode === 65) {
                if (Date.now()  - backPressedDownLast > 200) {
                    setBackPressed(true);
                    backPressedDownLast = Date.now();
                }
            }
            // Check if the pressed key is 'right'
            if (event.keyCode === 39 || event.keyCode === 68) {
                if (Date.now() - forwardPressedDownLast > 200) {
                    setForwardPressed(true);
                    forwardPressedDownLast = Date.now();
                }
            }
        };

        const handleKeyUp = (event) => {
            // Check if the pressed key is 'left'
            if (event.keyCode === 37 || event.keyCode === 65) {
                backPressedDownLast = 0;
            }
            // Check if the pressed key is 'right'
            if (event.keyCode === 39 || event.keyCode === 68) {
                forwardPressedDownLast = 0;
            }
        };


        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    function displayDetails(weekIndex, dayIndex) {
        setSelectedWeekIndex(weekIndex);
        setSelectedDayIndex(dayIndex);
    }

    function iterateSelectedMonth(next) {
        var months = calendarData["Months"];
        if (next) {
            if (months.length - 1 > selectedMonthIndex) {
                setSelectedMonthIndex(selectedMonthIndex + 1);
            }
        }
        else {
            if (selectedMonthIndex > 0) {
                setSelectedMonthIndex(selectedMonthIndex - 1);
            }
        }
    }

    function iterateSelectedMonthButtonClick(next) {
        iterateSelectedMonth(next);
        setSelectedWeekIndex(0);
        setSelectedDayIndex(0);
    }
    function iterateSelectedDay(next) {
        var weeksInMonth = calendarData["Months"][selectedMonthIndex]["Weeks"];
        var selectedWeek = weeksInMonth[selectedWeekIndex];
        var selectedDay = selectedWeek[selectedDayIndex];

        if (next) {
            if (selectedWeek.length - 1 > selectedDayIndex) {
                setSelectedDayIndex(selectedDayIndex + 1);
            }
            else if (weeksInMonth.length - 1 > selectedWeekIndex) {
                setSelectedWeekIndex(selectedWeekIndex + 1);
                setSelectedDayIndex(0);
            }
            else if (calendarData["Months"].length - 1 > selectedMonthIndex) {
                iterateSelectedMonth(true);
                if (selectedDay["OutOfMonth"]) {
                    setSelectedWeekIndex(1);
                }
                else { 
                    setSelectedWeekIndex(0);
                }
                setSelectedDayIndex(0);
            }
        }
        else {
            if (selectedDayIndex > 0) {
                setSelectedDayIndex(selectedDayIndex - 1);
            }
            else if (selectedWeekIndex > 0) {
                setSelectedWeekIndex(selectedWeekIndex - 1);
                setSelectedDayIndex(weeksInMonth[selectedWeekIndex].length - 1);
            }
            else if (selectedMonthIndex > 0) {
                iterateSelectedMonth(false);
                var newWeeksInMonth = calendarData["Months"][selectedMonthIndex - 1]["Weeks"];
                if (selectedDay["OutOfMonth"]) {
                    setSelectedWeekIndex(newWeeksInMonth.length - 2);
                }
                else {
                    setSelectedWeekIndex(newWeeksInMonth.length - 1);
                }
                setSelectedDayIndex(6);
            }
        }
    }

    if (backPressed) {
        iterateSelectedDay(false);
        setBackPressed(false);
    }

    if (forwardPressed) {
        iterateSelectedDay(true);
        setForwardPressed(false);
    }

    return (<div className="calendarLayout" data-bs-theme="dark">
        <NavBar onClickPreviousMonth={() => iterateSelectedMonthButtonClick(false)}
            onClickNextMonth={() => iterateSelectedMonthButtonClick(true)}
            selectedMonthIndex={selectedMonthIndex}
            windowDimensions={windowDimensions}
            displayExamEvents={displayExamEvents} setDisplayExamEvents={setDisplayExamEvents}
            displayStoryEvents={displayStoryEvents} setDisplayStoryEvents={setDisplayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents} setDisplayJazzClubEvents={setDisplayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents} setDisplayPuzzleEvents={setDisplayPuzzleEvents}        ></NavBar>
        <Calendar onDetailsClick={displayDetails} windowDimensions={windowDimensions} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}
            displayExamEvents={displayExamEvents}
            displayStoryEvents={displayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents}></Calendar>
        <Details onClickPreviousDay={() => iterateSelectedDay(false)} windowDimensions={windowDimensions} onClickNextDay={() => iterateSelectedDay(true)} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}
            displayExamEvents={displayExamEvents}
            displayStoryEvents={displayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents}></Details>
            </div>)
}