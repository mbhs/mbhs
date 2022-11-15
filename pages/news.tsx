import NewsItem from "../components/NewsItem";

function News() {
    return ( 
        <div>
            <h1 className="text-xl md:text-4xl text-center font-bold pt-5">
				News
			</h1>
            
            <div className="content-body ">
                <NewsItem header="test" content="lorem ipsum" />
                <NewsItem header="test" content="lorem ipsum" />
                <NewsItem header="test" content="lorem ipsum" />
                <NewsItem header="test" content="lorem ipsum" />
                <NewsItem header="test" content="lorem ipsum" />
            </div>
        </div>
     );
}

export default News;