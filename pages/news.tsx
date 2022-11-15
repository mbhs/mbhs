import NewsItem from "../components/NewsItem";
import { New } from '../lib/types'

interface NewsProps {
	news: New[];
}

export async function getStaticProps() {
    let news = await fetch("https://strapi.mbhs.edu/api/news").then((res) =>
		res.json()
	);

    console.log(news.data);

    return {
		props: {
			news: news.data,
		},
	};
}

function News({ news }: NewsProps) {
    return ( 
        <div>
            <h1 className="text-xl md:text-4xl text-center font-bold pt-5 domShadowText1">
				News
			</h1>
            
            <div className="content-body">

                <div >
                    {news.map(({attributes: { title, description, updatedAt }}) => (
                        <NewsItem header={title} content={description} lastUpdated={new Date(updatedAt)} />
                    ))}
                </div>
                
            </div>
        </div>
     );
}

export default News;