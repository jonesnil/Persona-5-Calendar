import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import calendarData from './Persona5RoyalCalendarInfo.json'
function NavBar({ onMonthSelect, selectedMonthIndex, windowDimensions, displayExamEvents, displayJazzClubEvents, displayPuzzleEvents, displayStoryEvents, setDisplayExamEvents, setDisplayJazzClubEvents, setDisplayPuzzleEvents, setDisplayStoryEvents }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <h1 className="navBar text-center libre-franklin-bold" style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="boxedText ms-2" style={{ transform: "rotate(1deg)" }}>{windowDimensions.width <= 768 ? "" : "P5R Planner"}</span>
        <Form.Select size="lg" className="w-auto" value={selectedMonthIndex} onChange={e => { onMonthSelect(parseInt(e.target.value)); }}>
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
            displayPuzzleEvents={displayPuzzleEvents} setDisplayPuzzleEvents={setDisplayPuzzleEvents} ></EventOptionsModal>
    </h1>
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
                            <Form.Check type="checkbox" id="JazzClubEventsCheck" checked={displayJazzClubEvents}
                                label="Display Jazz Club Events"
                                onChange={e => {
                                    setDisplayJazzClubEvents(e.target.checked)
                                }} />
                        </ListGroup.Item>
                        <ListGroup.Item className="Puzzle">
                            <Form.Check type="checkbox" id="PuzzleEventsCheck" checked={displayPuzzleEvents}
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
export default NavBar;