import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import calendarData from './Persona5RoyalCalendarInfo.json'
function NavBar({ onMonthSelect, selectedMonthIndex, windowDimensions, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents, displayWeatherDetails, displayFreeTimeDetails, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents, setDisplayClassEvents, setDisplayWeatherDetails, setDisplayFreeTimeDetails }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <h1 className="navBar text-center libre-franklin-bold" style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="boxedText ms-2" style={{ transform: "rotate(1deg)" }}>{windowDimensions.width <= 768 ? "" : "P5R Planner"}</span>
        <Form.Select size="lg" className="w-auto mt-1" value={selectedMonthIndex} onChange={e => { onMonthSelect(parseInt(e.target.value)); }}>
            {calendarData["Months"].map((month, monthIndex) =>
                <option key={monthIndex} value={monthIndex}>{month["Month"]} {month["Year"]}</option>
            )}
        </Form.Select>
        <div></div>
        <Button variant="dark" className="me-2 mt-1" onClick={handleShow}>
            <span className="material-symbols-outlined">settings</span>
        </Button>
        <EventOptionsModal show={show} handleClose={handleClose}
            displayExamEvents={displayExamEvents} setDisplayExamEvents={setDisplayExamEvents}
            displayStoryEvents={displayStoryEvents} setDisplayStoryEvents={setDisplayStoryEvents}
            displayJazzClubEvents={displayJazzClubEvents} setDisplayJazzClubEvents={setDisplayJazzClubEvents}
            displayPuzzleEvents={displayPuzzleEvents} setDisplayPuzzleEvents={setDisplayPuzzleEvents}
            displayClassEvents={displayClassEvents} setDisplayClassEvents={setDisplayClassEvents}
            displayWeatherDetails={displayWeatherDetails} setDisplayWeatherDetails={setDisplayWeatherDetails}
            displayFreeTimeDetails={displayFreeTimeDetails} setDisplayFreeTimeDetails={setDisplayFreeTimeDetails}></EventOptionsModal>
    </h1>
}

function EventOptionsModal({ show, handleClose, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, displayClassEvents, displayWeatherDetails, displayFreeTimeDetails, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents, setDisplayClassEvents, setDisplayWeatherDetails, setDisplayFreeTimeDetails }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} data-bs-theme="dark">
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
export default NavBar;