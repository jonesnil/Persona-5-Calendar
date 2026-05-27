import { useEffect, useState } from 'react';
import './App.css';
import '../Content/bootstrap.css'
import '../Scripts/bootstrap.min.js'

function CalendarDay() {
    return <td>test</td>
}

function NavBar() {
    return <span className="navBar">~ March 2016 ~</span>
}

function Calendar() {
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
            <tr>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
        </tr>
        <tr>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
        </tr>
        <tr>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
        </tr>
        <tr>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            <CalendarDay></CalendarDay>
            </tr>
        </tbody>
    </table>
}

function Details() {
    return <div className="card details">
            <div className="card-body">
                This is some text within a card body.
            </div>
           </div>
}

export default function App() {
    return <div className="calendarLayout">
            <NavBar></NavBar>
            <Calendar></Calendar>
            <Details></Details>
           </div>
}