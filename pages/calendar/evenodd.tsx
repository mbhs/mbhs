import Calendar from 'react-calendar'
import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css'
import { Day } from '../../lib/types'

const dayType: {[key: string]: number} = {
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

function previousDay(date: Date, stored: {[key: string]: number}): Date { //Assume all no-school/all-period/other days are entered in strapi (skip over them here)
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

function getEvenOdd(date: Date, stored: {[key: string]: number}, levels = 365): number { 
    // if stored value exists, return it
    if (stored[date.toDateString()] != null) return stored[date.toDateString()]
    // return the opposite of the previous even/odd day
    let previous = previousDay(date, stored)
    let prev = -1;
    if (levels > 0) prev = getEvenOdd(previous, stored, levels-1)
    let today = +!prev
    stored[date.toDateString()] = today
    return today
}

const CalendarContainer = styled.div`
.react-calendar { 
    width: 500px;
    height: 500px;
    max-width: 100%;
    max-height: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    border-color: rgba(0,0,0,0);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
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
    color: #000;
    border-radius: 8px;
   }
   .react-calendar__month-view__days__day {
    background: rgb(220, 38, 38);
    border-radius: 100%;
    color: #fff;
    min-heigh: 30px;
    min-width: 30px;
   }
   .react-calendar__month-view__days__day--weekend {
    color: #a4a4a4;
    border-radius: 100%;
   }
   .react-calendar__tile:enabled:hover,
   .react-calendar__tile:enabled:focus {
    background: #e8e8ea;
    color: #eb4848;
    border-radius: 100%;
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
        `https://strapi.mbhs.edu/api/days?filters&sort=date:ASC`
        ).then((res) => res.json());
        
        const stored: {[key: string]: number} = {}

        days.data.forEach((day: Day) => { 
        let date = new Date(day.attributes.date)
        let newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        if (day.attributes.endDate != null) {
            let endDate = new Date(day.attributes.endDate)
            let newendDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
            for (let i = newdate; i < newendDate; i.setDate(i.getDate() + 1)) {
                stored[i.toDateString()] = dayType[day.attributes.type];
            }
        }
        stored[newdate.toDateString()] = dayType[day.attributes.type];
    })

    return {
        props: {
            dates: stored
        },
        revalidate: 60,
    }
}

export default function Home({dates}: EvenOddProps) {

    function eo({ date, view }: CalendarProps) {
        if (view === "month") {
            if (date.getDay() === 0 || date.getDay() === 6) return null
            if (getEvenOdd(date, dates) == 0) return <p>even</p>
            else if (getEvenOdd(date, dates) == 1) return <p>odd</p>
            else if (getEvenOdd(date, dates) == 2) return <p>no school</p>
            else if (getEvenOdd(date, dates) == 3) return <p>all period</p>
            else return <p></p> //eventually make the prop an actual prop and put the title here
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
            <CalendarContainer className="self-center my-5">
                <Calendar tileContent={eo} prev2Label={null} next2Label={null} calendarType="US"/>
            </CalendarContainer>
            {/*<button onClick={exportJSON}>Export JSON</button>*/}
        </>
    )
}
