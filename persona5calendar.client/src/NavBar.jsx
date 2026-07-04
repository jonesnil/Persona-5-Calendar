import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import calendarData from './Persona5RoyalCalendarInfo.json'
function NavBar({ onMonthSelect, selectedMonthIndex, windowDimensions, displayEventsSettings, displayWeatherDetails, displayFreeTimeDetails, displaySpoilerAnswers, setDisplayEventsSettings, setDisplayWeatherDetails, setDisplayFreeTimeDetails, setDisplaySpoilerAnswers }) {
    const [showSettings, setShowSettings] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);

    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    return <h1 className="navBar text-center libre-franklin-bold" style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="boxedText ms-2" style={{ transform: "rotate(1deg)" }}>{windowDimensions.width <= 768 ? "" : "P5R Planner"}</span>
        <Form.Select size="lg" className="w-auto mt-1" value={selectedMonthIndex} onChange={e => { onMonthSelect(parseInt(e.target.value)); }}>
            {calendarData["Months"].map((month, monthIndex) =>
                <option key={monthIndex} value={monthIndex}>{month["Month"]} {month["Year"]}</option>
            )}
        </Form.Select>
        <div></div>
        <span>
            <Button variant="dark" className="me-1 mt-1" onClick={handleShowInfo}>
                <span className="material-symbols-outlined">info</span>
            </Button>
            <Button variant="dark" className="me-2 mt-1" onClick={handleShowSettings}>
                <span className="material-symbols-outlined">settings</span>
            </Button>
        </span>
        <EventOptionsModal showSettings={showSettings} handleCloseSettings={handleCloseSettings}
            displayEventsSettings={displayEventsSettings}
            setDisplayEventsSettings={setDisplayEventsSettings}
            displayWeatherDetails={displayWeatherDetails} setDisplayWeatherDetails={setDisplayWeatherDetails}
            displayFreeTimeDetails={displayFreeTimeDetails} setDisplayFreeTimeDetails={setDisplayFreeTimeDetails}
            displaySpoilerAnswers={displaySpoilerAnswers} setDisplaySpoilerAnswers={setDisplaySpoilerAnswers} ></EventOptionsModal>
        <InfoModal showInfo={showInfo} handleCloseInfo={handleCloseInfo}></InfoModal>
    </h1>
}

function EventOptionsModal({ showSettings, handleCloseSettings, displayEventsSettings, displayWeatherDetails, displayFreeTimeDetails, displaySpoilerAnswers, setDisplayEventsSettings, setDisplayWeatherDetails, setDisplayFreeTimeDetails, setDisplaySpoilerAnswers }) {
    return (
        <>
            <Modal show={showSettings} onHide={handleCloseSettings} data-bs-theme="dark">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h3>Event Settings:</h3>
                    <ListGroup className="arsenal-bold mb-3">
                        {Object.keys(displayEventsSettings).map((eventType, index) =>
                            <ListGroup.Item key={index} className={eventType.replaceAll(' ', '')}>
                                <Form.Check type="checkbox" id={`${eventType}EventsCheck`} checked={displayEventsSettings[eventType]}
                                    label={`Display ${eventType == "JazzClub" ? "Jazz Club" : eventType} Events${eventType == "Story" ? " (Spoilers!)" : ""}`}
                                onChange={e => {
                                    setDisplayEventsSettings(displayEventsSettings => ({
                                    ...displayEventsSettings,
                                    [eventType]: e.target.checked
                                    }));
                                    localStorage.setItem(`display${eventType.replaceAll(' ', '') }`, e.target.checked);
                                }
                            }/>
                        </ListGroup.Item>)
                        }
                    </ListGroup>
                    <h3>General Settings:</h3>
                    <ListGroup className="arsenal-bold mb-2">
                        <ListGroup.Item>
                            <Form.Check type="checkbox" id="WeatherDetailsCheck" checked={displayWeatherDetails}
                                label="Display Weather Details"
                                onChange={e => {
                                    setDisplayWeatherDetails(e.target.checked);
                                    localStorage.setItem("displayWeather", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Check type="checkbox" id="FreeTimeDetailsCheck" checked={displayFreeTimeDetails}
                                label="Display Free Time Details"
                                onChange={e => {
                                    setDisplayFreeTimeDetails(e.target.checked);
                                    localStorage.setItem("displayFreeTime", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Check type="checkbox" id="SpoilerAnswersCheck" checked={displaySpoilerAnswers}
                                label="Display Answers (Quizzes, Crosswords)"
                                onChange={e => {
                                    setDisplaySpoilerAnswers(e.target.checked);
                                    localStorage.setItem("displaySpoilerAnswers", e.target.checked);
                                }} />
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}

function InfoModal({ showInfo, handleCloseInfo }) {
    return (
        <>
            <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <span className="fs-4 boxedText rotatedTextAlt">LET US START THE GAME.</span>
                </Modal.Header>
                <Modal.Body>
                    This website is a tool to help tricksters on their playthrough of Persona 5 Royal. Unlike a full guide, this site won't tell you what to do on any given day, but instead it lists many things you may want to keep in mind so you can plan your own playthrough.
                    <h5 className="mt-3 mb-1">How to read a day:</h5>
                    The colors underneath the dates in the calendar view are meaningful! They tell you how much free time the player will have on a given day. The left side of the bar represents daytime, and the right side of the bar represents night time. Let's look at the below example:
                    <div className="dayOverviewDiv dayOverviewDemo FreeBlocked mb-2">
                        <div></div>
                        <span className="pe-2 calendarDateNumber arsenal-bold" >14</span>
                    </div>
                    It looks like the 14th here is gray on the left and red on the right. That means the player will have free time during the day (gray) but none at night (red.) If you see gold under the date, that means that time slot will be free but can only be spent in Leblanc.
                    <h5 className="mt-3 mb-1">About the site:</h5>
                    I made this tool as an excuse to learn <a href="https://react.dev/">React</a>. The code is available on <a href="https://github.com/jonesnil/Persona-5-Calendar">GitHub</a>. I hope you find the tool useful! If you have any issues or would like to give feedback, you can email me at <a href="mailto:P5RPlanner@jonesnil.com">P5RPlanner@jonesnil.com</a> 
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NavBar;