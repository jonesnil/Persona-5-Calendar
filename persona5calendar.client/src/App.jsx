import { useEffect, useState } from 'react';
import './App.css';
import './EventTypeTheming.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'

import NavBar from './NavBar';
import Calendar from './Calendar';
import Details from './Details';

import calendarData from './Persona5RoyalCalendarInfo.json'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

var backPressedDownLast = 0;
var forwardPressedDownLast = 0;
var upPressedDownLast = 0;
var downPressedDownLast = 0;
export default function App() {

    const [selectedMonthIndex, setSelectMonthIndex] = useState(localStorage.getItem("monthIndex") !== null ?
                                                             parseInt(localStorage.getItem("monthIndex")) :
                                                             0);
    const [selectedWeekIndex, setSelectWeekIndex] = useState(localStorage.getItem("weekIndex") !== null ?
                                                             parseInt(localStorage.getItem("weekIndex")) :
                                                             1);
    const [selectedDayIndex, setSelectedDayIndex] = useState(localStorage.getItem("dayIndex") !== null ?
                                                             parseInt(localStorage.getItem("dayIndex")) :
                                                             6);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [backPressed, setBackPressed] = useState(false);
    const [forwardPressed, setForwardPressed] = useState(false);
    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);

    var eventTypesList = ["Story", "Exam", "JazzClub", "Puzzle", "Class", "TV", "Subway", "Crane"];
    var displayEventSettingsInitial = {};
    eventTypesList.forEach(eventType => {
        var displayIfUnset = true;
        if (eventType == "Story")
        {
            displayIfUnset = false;
        }
        displayEventSettingsInitial[eventType] = localStorage.getItem(`display${eventType}`) !== null ? localStorage.getItem(`display${eventType}`) === "true" : displayIfUnset;
    });

    const [displayEventsSettings, setDisplayEventsSettings] = useState(displayEventSettingsInitial);

    const [displayWeatherDetails, setDisplayWeatherDetails] = useState(localStorage.getItem("displayWeather") !== null ? localStorage.getItem("displayWeather") === "true" : true);
    const [displayFreeTimeDetails, setDisplayFreeTimeDetails] = useState(localStorage.getItem("displayFreeTime") !== null ? localStorage.getItem("displayFreeTime") === "true" : true);

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
            // Check if the pressed key is 'up'
            if (event.keyCode === 38 || event.keyCode == 87) {
                if (Date.now() - upPressedDownLast > 200) {
                    setUpPressed(true);
                    upPressedDownLast = Date.now();
                }
            }
            // Check if the pressed key is 'down'
            if (event.keyCode === 40 || event.keyCode == 83) {
                if (Date.now() - downPressedDownLast > 200) {
                    setDownPressed(true);
                    downPressedDownLast = Date.now();
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
            // Check if the pressed key is 'up'
            if (event.keyCode === 38 || event.keyCode == 87) {
                upPressedDownLast = 0;
            }
            // Check if the pressed key is 'down'
            if (event.keyCode === 40 || event.keyCode === 83) {
                downPressedDownLast = 0;
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

    function handleSelectMonthIndex(index) {
        localStorage.setItem('monthIndex', index);
        setSelectMonthIndex(index);
    }

    function handleSelectWeekIndex(index) {
        localStorage.setItem('weekIndex', index);
        setSelectWeekIndex(index);
    }

    function handleSelectDayIndex(index) {
        localStorage.setItem('dayIndex', index);
        setSelectedDayIndex(index);
    }

    function displayDetails(weekIndex, dayIndex) {
        handleSelectWeekIndex(weekIndex);
        handleSelectDayIndex(dayIndex);
    }

    function iterateSelectedMonth(next) {
        var months = calendarData["Months"];
        if (next) {
            if (months.length - 1 > selectedMonthIndex) {
                handleSelectMonthIndex(selectedMonthIndex + 1);
            }
        }
        else {
            if (selectedMonthIndex > 0) {
                handleSelectMonthIndex(selectedMonthIndex - 1);
            }
        }
    }

    function handleMonthSelectClick(monthSelected) {
        handleSelectMonthIndex(monthSelected);
        handleSelectWeekIndex(0);
        handleSelectDayIndex(calendarData["Months"][monthSelected]["MonthBeginIndex"]);
    }
    function iterateSelectedDay(next) {
        var weeksInMonth = calendarData["Months"][selectedMonthIndex]["Weeks"];
        var selectedWeek = weeksInMonth[selectedWeekIndex];
        var selectedDay = selectedWeek[selectedDayIndex];

        if (next) {
            if (selectedWeek.length - 1 > selectedDayIndex) {
                handleSelectDayIndex(selectedDayIndex + 1);
            }
            else if (weeksInMonth.length - 1 > selectedWeekIndex) {
                handleSelectWeekIndex(selectedWeekIndex + 1);
                handleSelectDayIndex(0);
            }
            else if (calendarData["Months"].length - 1 > selectedMonthIndex) {
                iterateSelectedMonth(true);
                if (selectedDay["OutOfMonth"]) {
                    handleSelectWeekIndex(1);
                }
                else { 
                    handleSelectWeekIndex(0);
                }
                handleSelectDayIndex(0);
            }
        }
        else {
            if (selectedDayIndex > 0) {
                handleSelectDayIndex(selectedDayIndex - 1);
            }
            else if (selectedWeekIndex > 0) {
                handleSelectWeekIndex(selectedWeekIndex - 1);
                handleSelectDayIndex(weeksInMonth[selectedWeekIndex].length - 1);
            }
            else if (selectedMonthIndex > 0) {
                iterateSelectedMonth(false);
                var newWeeksInMonth = calendarData["Months"][selectedMonthIndex - 1]["Weeks"];
                if (selectedDay["OutOfMonth"]) {
                    handleSelectWeekIndex(newWeeksInMonth.length - 2);
                }
                else {
                    handleSelectWeekIndex(newWeeksInMonth.length - 1);
                }
                handleSelectDayIndex(6);
            }
        }
    }

    function iterateSelectedWeek(next) {
        var weeksInMonth = calendarData["Months"][selectedMonthIndex]["Weeks"];

        if (next) {
            if (weeksInMonth.length - 1 > selectedWeekIndex) {
                handleSelectWeekIndex(selectedWeekIndex + 1);
            }
        }
        else {
            if (selectedWeekIndex > 0) {
                handleSelectWeekIndex(selectedWeekIndex - 1);
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

    if (upPressed) {
        iterateSelectedWeek(false);
        setUpPressed(false);
    }

    if (downPressed) {
        iterateSelectedWeek(true);
        setDownPressed(false);
    }

    return (<div className="calendarLayout" data-bs-theme="dark">
        <NavBar onMonthSelect={handleMonthSelectClick}
            selectedMonthIndex={selectedMonthIndex}
            windowDimensions={windowDimensions}
            displayEventsSettings={displayEventsSettings}
            setDisplayEventsSettings={setDisplayEventsSettings}
            displayWeatherDetails={displayWeatherDetails} setDisplayWeatherDetails={setDisplayWeatherDetails}
            displayFreeTimeDetails={displayFreeTimeDetails} setDisplayFreeTimeDetails={setDisplayFreeTimeDetails}></NavBar>
        <Calendar onDetailsClick={displayDetails} windowDimensions={windowDimensions} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}
            displayEventsSettings={displayEventsSettings} ></Calendar>
        <Details onClickPreviousDay={() => iterateSelectedDay(false)} windowDimensions={windowDimensions} onClickNextDay={() => iterateSelectedDay(true)} selectedMonthIndex={selectedMonthIndex} selectedWeekIndex={selectedWeekIndex} selectedDayIndex={selectedDayIndex}
            displayEventsSettings={displayEventsSettings}
            displayWeatherDetails={displayWeatherDetails}
            displayFreeTimeDetails={displayFreeTimeDetails} ></Details>
            </div>)
}