import React from "react";
import Navbar from "../components/Navbar";
import HumanizeText from "../components/HumanizeText";
import HumanizeContent from "../components/HumanizeContent";

export default function Humanize() {  
    return (
        <div>
            <Navbar />
            <HumanizeText />
            <HumanizeContent />
        </div>
    );
}