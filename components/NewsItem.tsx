function NewsItem({ header, content }) {
    return (
    <div className="bg-gray-200 w-1/2 place-content-center m-12 content-center rounded-xl hover:bg-gray-300 transition-all  odd: float-left even:float-right">
        <div className="px-5 py-5">
            <h1 className="text-xl md:text-3xl ">{header}</h1>
            <p>{content}</p>
        </div> 
    </div>
    );
}

export default NewsItem; 