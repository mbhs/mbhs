import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Day } from '../../lib/types'


const inter = Inter({ subsets: ['latin'] })

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
    store: {
        [key: string]: number;
    }
}


export async function getStaticProps() {
    let days = await fetch(
		`https://strapi.mbhs.edu/api/days?filters&sort=date:ASC`
	).then((res) => res.json());

    const stored: {[key: string]: number} = {}

    days.data.forEach((day: Day) => { 
        let date = new Date(day.attributes.date)
        let newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        if (day.attributes.endDate != null) {
            let endDate = new Date(day.attributes.endDate)
            let newendDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1)
            for (let i = newdate; i < newendDate; i.setDate(i.getDate() + 1)) {
                stored[i.toDateString()] = dayType[day.attributes.type];
            }
        }
        stored[newdate.toDateString()] = dayType[day.attributes.type];
    })

    return {
        props: {
            store: stored
        },
        revalidate: 60,
    }
}

export default function Home({store}: EvenOddProps) {

    const stored = store

    function previousDay(date: Date): Date { //Assume all no-school/all-period/other days are entered in strapi (skip over them here)
        let day;
        if (date.getDay() === 1) {
            day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3)
        } else {
            day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
        }
        const today = stored[day.toDateString()]
        if (today != null) {
            if (today == dayType["no-school"] || today == dayType["all-period"] || today == dayType["other"]) {
                return previousDay(day)
            }
        }
        return day
    }

    function getEvenOdd(date: Date, levels = 100) { 
        // if stored value exists, return it
        if (stored[date.toDateString()] != null) return stored[date.toDateString()]
        // return the opposite of the previous even/odd day
        let previous = previousDay(date)
        let prev = -1;
        if (levels > 0) prev = getEvenOdd(previous, levels-1)
        let today = +!prev
        stored[date.toDateString()] = today
        return today
    }

    function eo({ date, view }: CalendarProps) {
        if (view === "month") {
            if (date.getDay() === 0 || date.getDay() === 6) return null
            if (getEvenOdd(date) == 0) return <p>even</p>
            else if (getEvenOdd(date) == 1) return <p>odd</p>
            else if (getEvenOdd(date) == 2) return <p>no school</p>
            else if (getEvenOdd(date) == 3) return <p>all period</p>
            else return <p></p> //eventually make the prop an actual prop and put the title here
        }
        return null
    }

    function exportJSON() {
        getEvenOdd(new Date(2023, 5, 16))
        const json = JSON.stringify(stored)
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = "data.json";
        a.href = url;
        a.click();
    }

    return (
        <>
            <Calendar tileContent={eo} className="my-5 self-center bg-black"></Calendar>
            <button onClick={exportJSON}>Export JSON</button>
        </>
    )
}
