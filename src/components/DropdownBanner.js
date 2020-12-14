import React, {useState, useEffect} from 'react';
import moment from "moment";
import { getData } from '../utils/axios';
import Dropdown from './Dropdown';

const DropdownBanner = ({
  chosenChannel = "",
  chosenDate = undefined,
  setChosenChannel = (value) => {},
  setChosenDate = (value) => {}
}) => {

  const [channels, setChannels] = useState([]);
  const [dateFilters, setDateFilters] = useState([])

  useEffect(() => {
    // sækir stöðvar
    getChannels();
    // Sækir / býr til dagsetnigar og setur í state
    setDateFilters(getDates());
  }, []);

  const getChannels = () => {
    // sækja allar stöðvar
    const url = "https://api.stod2.is/dagskra/api";
    getData(url).then((response) => {
      if(response) {
        // set stöðvar í state
        setChannels(getChannelOptions(response));
      }
    })
  };

  const getChannelOptions = (data) => {
    return data.map((val) => {
      return {
        label: val,
        value: val
      }
    })
  }

  const getDates = () => {
    const startDate = moment().subtract(1, "days");
    const endDate = moment().add(7, "days");
    let dates = [];
    for (let currentDate = startDate; currentDate <= endDate; currentDate.add(1, "days")) {
      dates.push({
        label: currentDate.format("LL"),
        value: currentDate.format("L")
      });
    }
  
    return dates;
  }
  return (
    <div className="allPrograms">
      {/* Birtist bara ef það eru gögn í dateFilters */}
      {dateFilters && dateFilters !== [] && (
        <Dropdown currentValue={chosenDate} onOptionChange={(value) => setChosenDate(value)} placeholder="Dagar" options={dateFilters}/>
      )}
      {/* Birtist bara ef það eru gögn í channels */}
      {channels && channels !== [] && (
        <Dropdown currentValue={chosenChannel} onOptionChange={(value) => setChosenChannel(value)} placeholder="Stöðvar" options={channels} />
      )}
    </div>
  )
};

export default DropdownBanner;