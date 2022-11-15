import ReactMarkdown from "react-markdown";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function NewsItem({ header, content, lastUpdated }: { header: string, content: string , lastUpdated: Date}) {

    return (
    <div className="bg-gray-200 w-1/2 place-content-center m-12 content-center rounded-xl hover:bg-gray-300 transition-all  odd: float-left even:float-right">
        <div className="px-5 py-5">
            <h1 className="text-xl md:text-3xl ">{header}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
            <br/>
            <em><>Last updated at {`${months[lastUpdated.getMonth()]} ${lastUpdated.getDate()}, ${lastUpdated.getFullYear()}`}</></em> 
        </div> 
    </div>
    );
}

export default NewsItem; 