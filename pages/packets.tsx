import { New } from "../lib/types";
import Markdown from "../components/Markdown";
import { GetStaticPropsContext } from "next";

interface NewsProps {
	news: New[];
}



function News({ news }: NewsProps) {
	return (
		<div className="pb-10 dark:text-white">
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
				Packets
			</h1>
            <div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
                	<h2 className="text-xl font-bold">Summer Work 2024</h2>
                	<p>Classes that have summer work to complete will have that work listed here for students to reference.</p>
           	  <p ><a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/Analysis1ASummer.pdf">Analysis
                	    1A</a> | <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/Analysis%201B%20Summer%20Packet.pdf">Analysis
                	    1B</a>  | <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/Pre-Analysis%20II%20Summer%20Assignment.pdf">Analysis
                	    2</a> | <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/Linear_Algebra_Summer_Math_Packet.pdf">Linear Algebra</a> | <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/Precalc-Functions%20Summer%20Review%20Packet.pdf">Magnet Precalculus/Functions</a> (with an <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/ANSWER%20KEY%20Precalc-Functions%20Summer%20Review%20Packet.pdf">Answer Key</a>) | <a className="text-red-500 hover:underline underline-offset-2" href="https://minio.mbhs.edu/strapi/PrecalC%20Sum%20Rev.pdf">Magnet Precalculus
           	      C</a></p>
			  <p><strong>Please note</strong> that assignments for <a className="text-red-500 hover:underline underline-offset-2" href="https://drive.google.com/file/d/1pu8-hDt2pkTDQEoujQ5pMX4ucgk8bbDM/view">non-Magnet math courses can be found here.</a>			  </p>
		
				</div> 

			
		</div>
	);
}

export default News;
