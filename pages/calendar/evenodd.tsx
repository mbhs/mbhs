import Calendar from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css'
import { Days, Day } from '../../lib/types'

//This, and several other types/functions are exported because they might be used in other files.
export const dayType: { [key: string]: number } = {
    "even": 0,
    "odd": 1,
    "no-school": 2,
    "all-period": 3,
    "special-schedule": 4,
    "summer": 5
}

export const reverseDayType: { [key: number]: string } = {
    0: "even",
    1: "odd",
    2: "no-school",
    3: "all-period",
    4: "special-schedule",
    5: "summer"
}

interface CalendarProps {
    date: Date;
    view: string;
}

interface EvenOddProps {
    dates: {
        [key: string]: number;
    }
}

export function previousDay(date: Date, stored: { [key: string]: number }): Date { //Assume all no-school/all-period/other days are entered in strapi (skip over them here)
    let day;
    if (date.getDay() === 1) {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3)
    } else {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    }
    const today = stored[day.toDateString()]
    if (today != null) {
        if (today != dayType["odd"] && today != dayType["even"]) {
            return previousDay(day, stored)
        }
    }
    return day
}

export function nextDay(date: Date, stored: { [key: string]: number }): {date: Date, type: number} { //Assume stored is filled out for all school days
    let day;
    if (date.getDay() === 5) {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3)
    } else {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }
    const today = stored[day.toDateString()]
    if (today != null) {
        if (today != dayType["odd"] && today != dayType["even"]) {
            return nextDay(day, stored)
        }
    }
    return {date: day, type: stored[day.toDateString()]}
}

export function getEvenOdd(stored: { [key: string]: number }): string {
    let today = new Date((new Date()).toLocaleString("en-US", { timeZone: "America/New_York" }));
    if (today.getHours() + (today.getMinutes())/60 >= 15.5) {
        const next = nextDay(today, stored)
        /*if (next.type === dayType["even"]) { // for more specific formatting

        } else if (next.type === dayType["odd"]) {

        } else if (next.type === dayType["all-period"]) {

        } */
        if (next.type === dayType["summer"]) return "Have a great summer!"
        return nextDay(today, stored).date.toDateString() + " will be an " + reverseDayType[next.type].toUpperCase() + " day"
    } else {
        return "Today is an " + reverseDayType[stored[today.toDateString()]] + " day"
    }
    return "error"
}

export function makeDates(days: Days): { [key: string]: number } {
    const stored: { [key: string]: number } = {}
    
    let startDate = new Date(days.attributes.startDate)
    let utcStartDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000)
    stored[utcStartDate.toDateString()] = dayType[days.attributes.startDateType];
    if (days.attributes.endDateType != null) {
        let endDate = new Date(days.attributes.endDate)
        let utcEndDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000)
        stored[utcEndDate.toDateString()] = dayType[days.attributes.endDateType];
    }

    days.attributes.days.forEach((day: Day) => {
        let date = new Date(day.date)
        let utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
        stored[utcDate.toDateString()] = dayType[day.type];
        if (day.endDate != null) {
            let endDate = new Date(day.endDate)
            let utcEndDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000)
            for (let i = utcDate; i <= utcEndDate; i.setDate(i.getDate() + 1)) {
                stored[i.toDateString()] = dayType[day.type];
            }
        }
    })

    for (let i = new Date(days.attributes.startDate); i <= new Date(days.attributes.endDate); i.setDate(i.getDate() + 1)) {
        if (stored[i.toDateString()] == null) { //if current day has no stored value
            let prev = stored[(previousDay(i, stored)).toDateString()] //previous even/odd day
            stored[i.toDateString()] = +!prev //set opposite
        }
    }

    return stored
}

//trying to make circles for each day (not working)
const CalendarContainerCircles = styled.div`
.react-calendar { 
    width: 500px;
    max-width: 100%;
    max-height: 100%;
    background-color: rgba(0,0,0,0);
    color: #222;
    border-radius: 8px;
    border-color: rgba(0,0,0,0);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    display: flex;
    flex-flow: column;
}
.react-calendar__navigation button {
    color: #fff;
    min-width: 44px;
    background: rgb(220, 38, 38);
    font-size: 22px;
}
.react-calendar__navigation__prev-button {
    border-radius: 8px 0 0 8px;
}
.react-calendar__navigation__next-button {
    border-radius: 0 8px 8px 0;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
    background-color: #f8d8da;
    color: rgb(220, 38, 38);
}
abbr[title] {
    text-decoration: none;
    color: #fff;
    mix-blend-mode: difference;
    border-radius: 8px;
}
.react-calendar__viewContainer {
    flex-grow: 1;
}
.react-calendar__month-view {
    height: 100%;
}
.react-calendar__month-view__days {
    height: 100%;
    display: flex;
    flex-direction: row;
}
.react-calendar__month-view__days__day {
    background: rgb(220, 38, 38);
    border-radius: 50%;
    color: #fff;
    aspect-ratio: 1/1;
    flex-grow: 1;
}
.react-calendar__month-view__days__day--weekend {
    color: #848484;
    border-radius: 50%;
}
.react-calendar__month-view__days__day--neighboringMonth {
    background: #ee8787;
    border-radius: 50%;
}
.react-calendar__tile {
    flex-grow: 1;
    //width: fit-content;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
    background: #e8e8ea;
    color: #eb4848;
    border-radius: 50%;
}
.react-calendar__tile--now {
    background: #fff;
    border-radius: 50%;
    font-weight: bold;
    color: #eb4848;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
    background: #eb484833;
    border-radius: 50%;
    font-weight: bold;
    color: #eb4848;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
    background: #e8e8ea;
}
.react-calendar__tile--active {
    background: #eb4848;
    border-radius: 50%;
    font-weight: bold;
    color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
    background: #eb4848;
    color: white;
    border-radius: 50%;
}
`;

//better format than original unstyled calendar
const CalendarContainer = styled.div`
.react-calendar { 
    width: 600px;
    //height: 550px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    //border-color: #000;
    font-size: 0.9em;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
}   
.react-calendar__navigation {
    height: 44px;
    margin-bottom: 0;
}
.react-calendar__navigation button {
    color: #fff;
    min-width: 44px;
    background: rgb(220, 38, 38);
    font-size: 22px;
}
.react-calendar__navigation__prev-button {
    border-radius: 8px 0 0 8px;
}
.react-calendar__navigation__next-button {
    border-radius: 0 8px 8px 0;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
    background-color: #f8d8da;
    color: rgb(220, 38, 38);
}
.react-calendar__viewContainer {
    height: 92%;
    padding: 8px 0 0 0;
}
abbr[title] {
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
}
abbr {
    font-weight: 900;
}
/* .react-calendar__month-view__days__day--weekend {
    color: #d10000;
    border-radius: 8px;
} */
.react-calendar__month-view {
    height: 100%;
}
.react-calendar__month-view__days {
    height: 100%;
    display: flex;
    flex-direction: row;
}
.react-calendar__month-view__days__day {
    border-radius: 8px;
    aspect-ratio: 1/1;
    flex-grow: 1;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
    background: #e8e8ea;
    color: #eb4848;
    border-radius: 8px;
}
.react-calendar__tile--now {
    background: #fff;
    border-radius: 8px;
    color: #000;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
    background: #eb484833;
    border-radius: 8px;
    font-weight: bold;
    color: #eb4848;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
    background: #e8e8ea;
}
.react-calendar__tile--active {
    background: #eb4848;
    border-radius: 8px;
    font-weight: bold;
    color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
    background: #eb4848;
    color: white;
    border-radius: 8px;
}
`;


export async function getStaticProps() {
    let days = await fetch(
        "https://strapi.mbhs.edu/api/evenodd?pagination[pageSize]=3&populate=*"
    ).then((res) => res.json());

    const stored: { [key: string]: number } = makeDates(days!.data)

    return {
        props: {
            dates: stored
        },
        revalidate: 60,
    }
}

export default function Home({ dates }: EvenOddProps) {

    function eo({ date, view }: CalendarProps) {
        if (view === "month") {
            if (date.getDay() === 0 || date.getDay() === 6) return null

            if (dates[date.toDateString()] == dayType["even"]) return <p>EVEN</p>
            else if (dates[date.toDateString()] == dayType["odd"]) return <p>ODD</p>
            else if (dates[date.toDateString()] == dayType["no-school"]) return <p>NO SCHOOL</p>
            else if (dates[date.toDateString()] == dayType["all-period"]) return <p>ALL PERIOD</p>
            else if (dates[date.toDateString()] == dayType["special-schedule"]) return <p>OTHER</p>
            else return <p></p>
        }
        return null
    }

    /*function exportJSON() {
        getEvenOdd(new Date(2023, 5, 16))
        const json = JSON.stringify(stored)
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = "data.json";
        a.href = url;
        a.click();
    } */

    return (
        <>
            <div className="self-center w-full md:w-fit h-fit">
                <div className="w-full ml-8 md:ml-0 p-2 mt-8 -mb-4 md:-mb-8 text-black dark:text-white font-extrabold">
                    <p className="text-center">{getEvenOdd(dates)}</p>
                </div>
                <CalendarContainer className="my-2 md:my-16 scale-[85%] text-xs md:text-base md:scale-100">
                    <Calendar tileContent={eo} value={new Date((new Date()).toLocaleString("en-US", { timeZone: "America/New_York" }))} prev2Label={null} next2Label={null} calendarType="gregory" />
                </CalendarContainer>
            </div>
            {/*<button onClick={exportJSON}>Export JSON</button>*/}
        </>
    )
}
