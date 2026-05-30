import { useEffect, useState } from 'react';
import './App.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'
import calendarData from './Persona5RoyalCalendarInfo.json'
function CalendarEvent({ event }) {
    return <li className="list-group-item">{event["Title"]}</li>
}

function CalendarDay({ selectedMonthIndex, weekIndex, dayIndex, onCalendarDayClick }) {
    var day = calendarData["Months"][selectedMonthIndex]["Weeks"][weekIndex][dayIndex];

    return (
        <td className={day["OutOfMonth"] ? "outOfMonth" : ""} onClick={onCalendarDayClick}>
            <span style={{ float: "right", display: "block" }} >{day["Date"]}</span>
            {("Events" in day && day["Events"].length > 0) ?
                <ul className="list-group fs-6" style={{ clear: "both", display: "block" }}>
                    {day["Events"].map((event) =>
                        <CalendarEvent key={event["Title"]} event={event}></CalendarEvent>)}
                </ul> : ""
            }
        </td>)
}

function NavBar() {
    return <span className="navBar">~ March 2016 ~</span>
}

function Calendar({ onDetailsClick, selectedMonthIndex }) {
    function handleClick(weekIndex, dayIndex) {
        onDetailsClick(weekIndex, dayIndex);
    }

    return <table className="table calendar">
            <thead>
                <tr>
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
                    {week.map((day, dayIndex) => <CalendarDay key={dayIndex} selectedMonthIndex={selectedMonthIndex} weekIndex={weekIndex} dayIndex={dayIndex} onCalendarDayClick={() => handleClick(weekIndex, dayIndex)}></CalendarDay>)}
                </tr>
                )}
        </tbody>
    </table>
}

function Details({ onClickPreviousDay, onClickNextDay, selectedMonthIndex, selectedWeekIndex, selectedDayIndex }) {
    var selectedDay = calendarData["Months"][selectedMonthIndex]["Weeks"][selectedWeekIndex][selectedDayIndex];

    return <div className="card details">
        <div className="card-body">
            <h5 className="card-title text-center">
                <button className="btn btn-secondary me-2 float-start" onClick={onClickPreviousDay}>{"<"}</button>
                {selectedDay["WeekDay"]}&nbsp;
                {calendarData["Months"][selectedMonthIndex]["Month"]}&nbsp;
                {selectedDay["Date"]}
                <button className="btn btn-secondary ms-2 float-end" onClick={onClickNextDay}>{">"}</button>
            </h5>
            {("Events" in selectedDay && selectedDay["Events"].length > 0) ?
                <ul className="list-group fs-6" style={{ clear: "both", display: "block" }}>
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

    return (<div className="calendarLayout">
        <NavBar></NavBar>
        <Calendar onDetailsClick={displayDetails} selectedMonthIndex={selectedMonthIndex}></Calendar>
        <Details onClickPreviousDay={() => iterateSelectedDay(false)} onClickNextDay={() => iterateSelectedDay(true)} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}></Details>
            </div>)
}