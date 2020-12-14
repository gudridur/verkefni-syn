import React, {useState, useEffect} from "react";
import DropdownBanner from "./DropdownBanner";
import Program from './Program';
import { getData } from "../utils/axios";
import moment from "moment";
moment().locale("is");
const AllPrograms = () => {
    const [chosenChannel, setChosenChannel] = useState("stod2");
    const [chosenDate, setChosenDate] = useState(moment().format("L"));
    const [program, setProgram] = useState([]);

    useEffect(() => {
        if(chosenChannel && chosenDate) {
            const url = "https://api.stod2.is/dagskra/api/" + chosenChannel;
            getData(url).then((response) => {
                if(response) {
                    const data = response.filter(d => {

                        return moment(d.dagsetning).isSame(moment(chosenDate));
                    });

                    setProgram(data);

                }
            })
        }
    }, [chosenChannel, chosenDate]);

    return (
        <div>
            {/* Navision með dropdown */}
            <DropdownBanner 
                chosenDate={chosenDate}
                chosenChannel={chosenChannel}
                setChosenDate={(value) => setChosenDate(value)} 
                setChosenChannel={(value) => setChosenChannel(value)} 
            />
            {/* Töflu með upplýsingum - renderast bara þegar gögn hafa verið sótt */}
            {program && <Program program={program}/>}
        </div>
    )
}

export default AllPrograms;