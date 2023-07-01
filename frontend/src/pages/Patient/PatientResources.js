import { useState } from "react"
import "../../styles/Resources/resources.css"
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
            <HeaderCards />
            <h1 className="container">Resources
                <div className="card-container">
                    <div className="card">
                        <div className="card-image">
                            <img src={waterImage} alt="water" />
                            <div className="card-text">
                                Feeling troubled
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-image">
                            <img src={oceanImage} alt="water2" />
                            <div className="card-text">
                                Another card
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-image">
                            <img src={oceanImage} alt="water3" />
                            <div className="card-text">
                                Another card
                            </div>
                        </div>
                    </div>
                </div>
            </h1>

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