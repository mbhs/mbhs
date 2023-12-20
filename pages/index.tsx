import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const { push } = useRouter();
    useEffect(() => {
        let lang = localStorage.getItem("lang") || "en";
        push(`/${lang}`)
    });
    //redirect(`/{lang}/home`);
    //return (<p>hi</p>);
}