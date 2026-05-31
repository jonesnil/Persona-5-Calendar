import { useEffect, useState } from 'react';
import './App.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'
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

function WeatherIcon({ weather, windowDimensions }) {
    var iconName = weatherIconNameLookup(weather);
    if (windowDimensions.width <= 768) {
        iconName = null;
    }

    return <span className="material-symbols-outlined inlineIcon" title={weather}>{iconName}</span>
}

function CalendarEvent({ windowDimensions, event }) {
    return <li className={"list-group-item arsenal-bold calendarEventSmall " + event["Type"].replaceAll(' ', '')}>
            {windowDimensions.width <= 1024 ? null : event["Title"]} 
           </li>
}

function CalendarEventDetails({ event }) {
    return (<li className={"list-group-item arsenal-bold " + event["Type"].replaceAll(' ', '')}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{event["Title"]}</h5>
                    <small>{event["Type"]}</small>
                </div>
                <p className="mb-1">{event["Details"]}</p>
                <small>{event["Footnote"]}</small>
            </li>)
}

function FreeTimeDetails({ day }) {
    var headerText;
    var detailedText;
    if (day["DaySlot"] === "Blocked" &&
        day["NightSlot"] === "Blocked") {
        headerText = "Busy Day!";
        detailedText = "Joker will have no free time.";
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

function CalendarDay({ windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, weekIndex, dayIndex, onCalendarDayClick }) {
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

    var dayOverviewClasses = "dayOverviewDiv mb-2 ";
    if (day["DaySlot"] === "Free" &&
        day["NightSlot"] === "Free") {
        dayOverviewClasses += " freeTime ";
    }
    else if (day["DaySlot"] === "Free" &&
        day["NightSlot"] === "Blocked") {
        dayOverviewClasses += " freeTimeNightOnly ";

    }
    else if (day["DaySlot"] === "Blocked" &&
        day["NightSlot"] === "Free") {
        dayOverviewClasses += " freeTimeDayOnly ";

    }
    else if (day["DaySlot"] === "Blocked" &&
        day["NightSlot"] === "Blocked") {
        dayOverviewClasses += " blockedTime ";

    }

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
                <ul className="list-group fs-6">
                    {day["Events"].map((event) =>
                        <CalendarEvent windowDimensions={windowDimensions} key={event["Title"]} event={event}></CalendarEvent>)}
                </ul> : ""
            }
        </td>)
}

function NavBar({ selectedMonthIndex }) {
    var month = calendarData["Months"][selectedMonthIndex];

    return <h1 className="navBar text-center libre-franklin-bold">
        ~<span className="boxedText" style={{ transform: "rotate(-2deg)" }}>{month["Month"]}</span>&nbsp;
         <span className="boxedText" style={{ transform: "rotate(1deg)" }}>{month["Year"]}</span>~</h1>
}

function Calendar({ onDetailsClick, windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex }) {
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
                    {week.map((day, dayIndex) => <CalendarDay key={dayIndex} windowDimensions={windowDimensions} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex} weekIndex={weekIndex} dayIndex={dayIndex} onCalendarDayClick={() => handleClick(weekIndex, dayIndex)}></CalendarDay>)}
                </tr>
                )}
        </tbody>
    </table>
}

function DetailsNavbar({ selectedDay, selectedMonthIndex, onClickNextDay, onClickPreviousDay, windowDimensions }) {
    var dayText;
    var monthText;
    var month = calendarData["Months"][selectedMonthIndex];
    if (windowDimensions.width > 768 && windowDimensions.width <= 1024) {
        monthText = selectedDay["OutOfMonth"] ? selectedDay["OutOfMonthNum"] : month["Number"];
        dayText = `${monthText}/${selectedDay["Date"]}`;
    }
    else {
        monthText = selectedDay["OutOfMonth"] ? selectedDay["OutOfMonth"] : month["Month"];
        dayText = `${selectedDay["WeekDay"]} ${monthText} ${selectedDay["Date"]}`;
    }
    return <h5 className="card-title text-center mb-4 libre-franklin-regular flexSpaceBetween">
                <button className="btn btn-danger" onClick={onClickPreviousDay}>{"<"}</button>
                <span>{dayText}</span>
                <button className="btn btn-danger" onClick={onClickNextDay}>{">"}</button>
            </h5>
}

function Details({ onClickPreviousDay, onClickNextDay, windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex }) {
    var selectedDay = calendarData["Months"][selectedMonthIndex]["Weeks"][selectedWeekIndex][selectedDayIndex];

    return <div className="card details">
        <div className="card-body">
            <DetailsNavbar selectedDay={selectedDay} selectedMonthIndex={selectedMonthIndex} onClickNextDay={onClickNextDay} onClickPreviousDay={onClickPreviousDay} windowDimensions={windowDimensions}></DetailsNavbar>
            <FreeTimeDetails day={selectedDay}></FreeTimeDetails>
            {("Events" in selectedDay && selectedDay["Events"].length > 0) ?
                <ul className="list-group fs-6 arsenal-regular" style={{ clear: "both", display: "block" }}>
                    {selectedDay["Events"].map((event) =>
                        <CalendarEventDetails key={event["Title"]} event={event}></CalendarEventDetails>)}
                </ul> : ""
            }
            </div>
           </div>
}

export default function App() {

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function displayDetails(weekIndex, dayIndex) {
        setSelectedWeekIndex(weekIndex);
        setSelectedDayIndex(dayIndex);
    }

    function iterateSelectedDay(next) {
        var weeksInMonth = calendarData["Months"][selectedMonthIndex]["Weeks"];
        var selectedWeek = weeksInMonth[selectedWeekIndex];
        if (next) {
            if (selectedWeek.length - 1 > selectedDayIndex) {
                setSelectedDayIndex(selectedDayIndex + 1);
            }
            else if (weeksInMonth.length - 1 > selectedWeekIndex) {
                setSelectedWeekIndex(selectedWeekIndex + 1);
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
        }
    }

    return (<div className="calendarLayout" data-bs-theme="dark">
        <NavBar selectedMonthIndex={selectedMonthIndex}></NavBar>
        <Calendar onDetailsClick={displayDetails} windowDimensions={windowDimensions} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}></Calendar>
        <Details onClickPreviousDay={() => iterateSelectedDay(false)} windowDimensions={windowDimensions} onClickNextDay={() => iterateSelectedDay(true)} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}></Details>
            </div>)
}