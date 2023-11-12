import Calendar from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css'
import { Day } from '../../lib/types'

const dayType: { [key: string]: number } = {
    "even": 0,
    "odd": 1,
    "no-school": 2,
    "all-period": 3,
    "other": 4
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

function previousDay(date: Date, stored: { [key: string]: number }): Date { //Assume all no-school/all-period/other days are entered in strapi (skip over them here)
    let day;
    if (date.getDay() === 1) {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3)
    } else {
        day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    }
    const today = stored[day.toDateString()]
    if (today != null) {
        if (today == dayType["no-school"] || today == dayType["all-period"] || today == dayType["other"]) {
            return previousDay(day, stored)
        }
    }
    return day
}

/* function getEvenOdd(date: Date, stored: {[key: string]: number}, levels = 365): number { 
    // if stored value exists, return it
    if (stored[date.toDateString()] != null) return stored[date.toDateString()]
    // return the opposite of the previous even/odd day
    let previous = previousDay(date, stored)
    let prev = -1;
    if (levels > 0) prev = getEvenOdd(previous, stored, levels-1)
    let today = +!prev
    stored[date.toDateString()] = today
    return today
} */

//trying to make circles for each day (not working)
const CalendarContainer = styled.div`
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
const CalendarContainer2 = styled.div`
.react-calendar { 
    width: 500px;
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
    background: #eb484833;
    border-radius: 8px;
    font-weight: bold;
    color: #eb4848;
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
        "https://strapi.mbhs.edu/api/evenodd?populate=*"
    ).then((res) => res.json());

    const stored: { [key: string]: number } = {}

    stored[(new Date(days!.data.attributes.startDate)).toDateString()] = dayType[days!.data.attributes.startDateType];
    if (days!.data.attributes.endDateType != null)
        stored[(new Date(days!.data.attributes.endDate)).toDateString()] = dayType[days!.data.attributes.endDateType];

    days!.data.attributes.days.forEach((day: Day) => {
        let date = new Date(day.date)
        if (day.endDate != null) {
            let endDate = new Date(day.endDate)
            for (let i = date; i < endDate; i.setDate(i.getDate() + 1)) {
                stored[i.toDateString()] = dayType[day.type];
            }
        }
        stored[date.toDateString()] = dayType[day.type];
    })

    for (let i = new Date(days!.data.attributes.startDate); i < new Date(days!.data.attributes.endDate); i.setDate(i.getDate() + 1)) {
        if (stored[i.toDateString()] == null) { //if current day has no stored value
            let prev = stored[(previousDay(i, stored)).toDateString()] //previous even/odd day
            stored[i.toDateString()] = +!prev //set opposite
        }
    }

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
            else if (dates[date.toDateString()] == dayType["other"]) return <p>OTHER</p>
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
            <div className="self-center w-full md:w-fit h-[450px] md:h-[650px]">
                <CalendarContainer2 className="md:my-16 scale-[85%] text-xs md:text-base md:scale-100">
                    <Calendar tileContent={eo} prev2Label={null} next2Label={null} calendarType="gregory" />
                </CalendarContainer2>
            </div>
            {/*<button onClick={exportJSON}>Export JSON</button>*/}
        </>
    )
}
