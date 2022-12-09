import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function About() {
	const [shortcuts, setShortcuts] = useState<boolean>(false);

	return (
        <>
        <div className="flex flex-row" >
            <div className="flex flex-row flex-wrap" style={{width: '85%'}}>
                <div className="flex justify-center flex-wrap" style={{width: '100%'}}>
                <div style={{paddingLeft:'20%'}}>
              <Carousel infiniteLoop width="70%" showThumbs={false} showStatus={false}>
                  <div>
                      <img src="https://news.montgomeryschoolsmd.org/wp-content/uploads/2015/04/Renay-Johnson.jpg" alt="image1"/>
                      <p className="legend">Our wonderful principal, Renay Johnson</p>
  
                  </div>
                  <div>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Txz9AZ3mqnJ1KTPKsIEehO_eiHteQ-1FWA&usqp=CAU" alt="image2" />
                      <p className="legend">Image 2</p>
  
                  </div>
                  <div>
                      <img src="/3.png" alt="image3"/>
                      <p className="legend">Image 3</p>
  
                  </div>
                  <div>
                      <img src="/4.png" alt="image4"/>
                      <p className="legend">Image 4</p>
  
                  </div>
                  <div>
                      <img src="/5.png" alt="image5"/>
                      <p className="legend">Image 5</p>
  
                  </div>
              </Carousel></div>
            </div>
                <div className="flex flex-wrap" style={{width: '100%', padding: "5%"}}>
                <h1 className="text-xl md:text-4xl font-bold mb-5">About</h1>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <h3 className="text-xl md:text-xl font-bold mb-5">Admin</h3>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <div id="Admin" className="flex" style={{justifyContent : 'space-between'}}>
                <p>Meet our wonderful administrative team: 
                    <br></br>
                    Principal: Renay Johnson
                    <br></br>
                    Assistant Principals:
                    ...
                </p>
                
                <img width="40%" src="https://pbs.twimg.com/media/DyfaHwkW0AARh9n.jpg" alt="image1"/>
                </div>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <h3 id="directions" className="text-xl md:text-xl font-bold mb-5">Directions</h3>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <p>Widget?</p>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <h3 id="history" className="text-xl md:text-xl font-bold mb-5">History</h3>
                <p style={{flexBasis: '100%', height: '0'}}></p>
                <p>History stuffs...</p>
            </div>
            </div>
            <div className="flex " style={{justifyContent: 'flex-end', textAlign: 'right', width: '15%', background: "LightGray", paddingTop: "3%", paddingRight: "3%"}}>
                <div style={{position:"fixed"}}>
                <h1 className="text-xl md:text-2xl font-bold mb-5">Content</h1>
                <p style={{width: '100%', height: '0'}}></p>
                <a className="hover:text-red-600" href="#Admin">Admin</a>
                <p style={{width: '100%', height: '40'}}></p>
                <a className="hover:text-red-600" href="#directions"><br></br>Directions</a>
                <p style={{width: '100%', height: '3%'}}></p>
                <a className="hover:text-red-600" href="#history"><br></br>History</a>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Schedule</p>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Directory</p>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Traffic Cameras?</p>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Academies</p>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Programs</p>
                <p style={{width: '100%', height: '3%'}}></p>
                <p><br></br>Student News</p></div>
            </div>
        </div></>
	);
}