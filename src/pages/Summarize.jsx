import React from "react";
import Navbar from "../components/Navbar";
import SummarizeText from "../components/SummarizeText";
import SummarizeContent from "../components/SummarizeContent";

export default function Summarize() {  
    return (
        <div>
            <Navbar />
            <SummarizeText />
            <SummarizeContent />
        </div>
    );
}