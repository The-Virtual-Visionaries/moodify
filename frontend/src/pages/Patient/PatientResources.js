import "../../styles/Resources/Resources.css"
import Navbar from "../../components/Navbar";
import { HeaderCards } from "../../components/Resources/HeaderCards";
import waterImage from "../../assets/water.jpeg"
import oceanImage from "../../assets/ocean.jpeg"


/**
 * Static webpage that links users to relevant resources to get help.
 * @returns The static webpage of the application.
 */
export default function PatientResources() {
    return (
        <>
            <Navbar />
            <div className="resource-header">Hi there!</div>
            <div className="header-cards">
                <HeaderCards 
                    bgColor='#F4E6FF'
                    description='Meditation' 
                    subtext='Meditation can give you a sense of calm, peace and balance that can benefit both your emotional well-being and your overall health.'
                    buttonText='Watch here'
                    link="https://www.youtube.com/watch?v=O-6f5wQXSu8"
                />
                <HeaderCards 
                    bgColor='#F4E6FF'
                    description='Mental Health with Leon Taylor' 
                    subtext='Leon Taylor is a former competitive diver who competed for TeamGB at three Olympic Games'
                    buttonText='Watch here'
                    link="https://www.youtube.com/watch?v=rkZl2gsLUp4"
                />
            </div>
            <div className="resources-title">Resources</div>
            <div className="resources-cards">
                <HeaderCards
                    bgColor='#BDE3FF'
                    description='Mental Health Tips' 
                    subtext='Learn how your mind affects your physical and emotional health to strengthen your mental well-being.'
                    buttonText='Read here'
                    link="https://www.healthhub.sg/live-healthy/1926/10-Essentials-for-Mental-Well-Being"
                />

                <HeaderCards
                    bgColor='#CCFFED'
                    description='Helplines' 
                    subtext='Seek help here, it is a safe space'
                    buttonText='View here'
                    link="https://www.sos.org.sg/"
                /> 
                <HeaderCards
                    bgColor='#D2E2FF'
                    description='Mental Health Podcast' 
                    subtext='With topics ranging from anxiety and depression to self-love and substance abuse, these listens have something for everyone.'
                    buttonText='View here'
                    link="https://www.goodhousekeeping.com/health/wellness/g39754351/best-mental-health-podcasts/"
                /> 
            </div>

            <div className="container p-4">
                <div clasNames="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h5 className="mb-3" style={{ "letter-spacing": "2px", color: "#818963" }}>Note</h5>
                        <p>
                            If you are at risk of immediate harm, please call 995 or go to an Emergency Department (A&E) at a hospital.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}