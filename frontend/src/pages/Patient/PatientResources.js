import { useState } from "react"
import "../../styles/Resources/resources.css"
import Navbar from "../../components/Navbar";
import { HeaderCards } from "../../components/Resources/HeaderCards";

/**
 * Static webpage that links users to relevant resources to get help.
 * @returns The static webpage of the application.
 */
export default function PatientResources() {
    return (
        <>
            <Navbar />
            
            <HeaderCards />
        
        </>
    );
}