import ListGroup from 'react-bootstrap/ListGroup';
import calendarData from './Persona5RoyalCalendarInfo.json'


function Calendar({ onDetailsClick, windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents }) {
    function handleClick(weekIndex, dayIndex) {
        onDetailsClick(weekIndex, dayIndex);
    }

    return <div className="calendar">
            <table className="table calendarTable">
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
                            displayPuzzleEvents={displayPuzzleEvents}
                            displayClassEvents={displayClassEvents}></CalendarDay>)}
                    </tr>
                )}
            </tbody>
            </table>
        </div>
}


function CalendarDay({ windowDimensions, selectedMonthIndex, selectedWeekIndex, selectedDayIndex, weekIndex, dayIndex, onCalendarDayClick, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents }) {
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
                            displayPuzzleEvents={displayPuzzleEvents}
                            displayClassEvents={displayClassEvents}></CalendarEvent>)}
                </ListGroup> : ""
            }
        </td>)
}

function CalendarEvent({ windowDimensions, event, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents }) {
    switch (event["Type"]) {
        case 'Class':
            if (!displayClassEvents)
                return null;
            break;
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

function WeatherIcon({ weather, windowDimensions }) {
    var iconName = weatherIconNameLookup(weather);
    if (windowDimensions.width <= 768) {
        iconName = null;
    }

    return <span className="material-symbols-outlined inlineIcon" title={weather}>{iconName}</span>
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


export default Calendar;