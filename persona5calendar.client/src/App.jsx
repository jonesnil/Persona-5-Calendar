import { useEffect, useState } from 'react';
import './App.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'
import calendarData from './Persona5RoyalCalendarInfo.json'
function CalendarEvent({ event }) {
    return <li className={"list-group-item arsenal-bold " + event["Type"].replaceAll(' ', '')}>{event["Title"]}</li>
}

function CalendarDay({ selectedMonthIndex, selectedWeekIndex, selectedDayIndex, weekIndex, dayIndex, onCalendarDayClick }) {
    var day = calendarData["Months"][selectedMonthIndex]["Weeks"][weekIndex][dayIndex];
    var cellClasses = "arsenal-regular ";

    if (day["OutOfMonth"]) {
        cellClasses += "outOfMonth ";
    }

    var dateNumberClasses = "calendarDateNumber "

    if (selectedWeekIndex === weekIndex &&
        selectedDayIndex === dayIndex) {
        dateNumberClasses += "fs-4 boxedText libre-franklin-bold rotatedText ";
    }
    else {
        dateNumberClasses += "fs-5 arsenal-bold ";
    }

    return (
        <td className={cellClasses} onClick={onCalendarDayClick}>
            <span className={dateNumberClasses} >{day["Date"]}</span>
            {("Events" in day && day["Events"].length > 0) ?
                <ul className="list-group fs-6" style={{ clear: "both", display: "block" }}>
                    {day["Events"].map((event) =>
                        <CalendarEvent key={event["Title"]} event={event}></CalendarEvent>)}
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

function Calendar({ onDetailsClick, selectedMonthIndex, selectedWeekIndex, selectedDayIndex }) {
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
                    {week.map((day, dayIndex) => <CalendarDay key={dayIndex} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex} weekIndex={weekIndex} dayIndex={dayIndex} onCalendarDayClick={() => handleClick(weekIndex, dayIndex)}></CalendarDay>)}
                </tr>
                )}
        </tbody>
    </table>
}

function Details({ onClickPreviousDay, onClickNextDay, selectedMonthIndex, selectedWeekIndex, selectedDayIndex }) {
    var selectedDay = calendarData["Months"][selectedMonthIndex]["Weeks"][selectedWeekIndex][selectedDayIndex];

    return <div className="card details">
        <div className="card-body">
            <h5 className="card-title text-center mb-4 libre-franklin-regular">
                <button className="btn btn-danger me-2 float-start" onClick={onClickPreviousDay}>{"<"}</button>
                {selectedDay["WeekDay"]}&nbsp;
                {selectedDay["OutOfMonth"] ? selectedDay["OutOfMonth"] : calendarData["Months"][selectedMonthIndex]["Month"]}&nbsp;
                {selectedDay["Date"]}
                <button className="btn btn-danger ms-2 float-end" onClick={onClickNextDay}>{">"}</button>
            </h5>
            {("Events" in selectedDay && selectedDay["Events"].length > 0) ?
                <ul className="list-group fs-6 arsenal-regular" style={{ clear: "both", display: "block" }}>
                    {selectedDay["Events"].map((event) =>
                        <CalendarEvent key={event["Title"]} event={event}></CalendarEvent>)}
                </ul> : ""
            }
            </div>
           </div>
}

export default function App() {

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
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
        <Calendar onDetailsClick={displayDetails} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}></Calendar>
        <Details onClickPreviousDay={() => iterateSelectedDay(false)} onClickNextDay={() => iterateSelectedDay(true)} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}></Details>
            </div>)
}