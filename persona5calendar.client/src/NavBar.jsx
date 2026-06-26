import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import calendarData from './Persona5RoyalCalendarInfo.json'
function NavBar({ onMonthSelect, selectedMonthIndex, windowDimensions, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents, displayTVEvents, displayWeatherDetails, displayFreeTimeDetails, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents, setDisplayClassEvents, setDisplayTVEvents,setDisplayWeatherDetails, setDisplayFreeTimeDetails }) {
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
            displayExamEvents={displayExamEvents} setDisplayExamEvents={setDisplayExamEvents}
            displayStoryEvents={displayStoryEvents} setDisplayStoryEvents={setDisplayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents} setDisplayJazzClubEvents={setDisplayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents} setDisplayPuzzleEvents={setDisplayPuzzleEvents}
            displayClassEvents={displayClassEvents} setDisplayClassEvents={setDisplayClassEvents}
            displayTVEvents={displayTVEvents} setDisplayTVEvents={setDisplayTVEvents}
            displayWeatherDetails={displayWeatherDetails} setDisplayWeatherDetails={setDisplayWeatherDetails}
            displayFreeTimeDetails={displayFreeTimeDetails} setDisplayFreeTimeDetails={setDisplayFreeTimeDetails}></EventOptionsModal>
        <InfoModal showInfo={showInfo} handleCloseInfo={handleCloseInfo}></InfoModal>
    </h1>
}

function EventOptionsModal({ showSettings, handleCloseSettings, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents, displayTVEvents, displayWeatherDetails, displayFreeTimeDetails, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents, setDisplayClassEvents, setDisplayTVEvents, setDisplayWeatherDetails, setDisplayFreeTimeDetails }) {
    return (
        <>
            <Modal show={showSettings} onHide={handleCloseSettings} data-bs-theme="dark">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h3>Event Settings:</h3>
                    <ListGroup className="arsenal-bold mb-3">
                        <ListGroup.Item className="Story">
                            <Form.Check type="checkbox" id="StoryEventsCheck" checked={displayStoryEvents}
                                label="Display Story Events (Spoilers!)"
                                onChange={e => {
                                    setDisplayStoryEvents(e.target.checked);
                                    localStorage.setItem("displayStory", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="Exam">
                            <Form.Check type="checkbox" id="ExamEventsCheck" checked={displayExamEvents}
                                label="Display Exam Events"
                                onChange={e => {
                                    setDisplayExamEvents(e.target.checked);
                                    localStorage.setItem("displayExam", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="JazzClub">
                            <Form.Check type="checkbox" id="JazzClubEventsCheck" checked={displayJazzClubEvents}
                                label="Display Jazz Club Events"
                                onChange={e => {
                                    setDisplayJazzClubEvents(e.target.checked);
                                    localStorage.setItem("displayJazzClub", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="Puzzle">
                            <Form.Check type="checkbox" id="PuzzleEventsCheck" checked={displayPuzzleEvents}
                                label="Display Puzzle Events"
                                onChange={e => {
                                    setDisplayPuzzleEvents(e.target.checked);
                                    localStorage.setItem("displayPuzzle", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="Class">
                            <Form.Check type="checkbox" id="ClassEventsCheck" checked={displayClassEvents}
                                label="Display Class Events"
                                onChange={e => {
                                    setDisplayClassEvents(e.target.checked);
                                    localStorage.setItem("displayClass", e.target.checked);
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="TV">
                            <Form.Check type="checkbox" id="TVEventsCheck" checked={displayTVEvents}
                                label="Display TV Events"
                                onChange={e => {
                                    setDisplayTVEvents(e.target.checked);
                                    localStorage.setItem("displayTV", e.target.checked);
                                }} />
                        </ListGroup.Item>
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