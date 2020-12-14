import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const RowExtraInfo = ({
    row
}) => {
    const {
        midill_heiti,
        upphaf,
        slott,
        thattur,
        thattafjoldi,
        lysing
    } = row;

    return (
        <div>
            <div>
                <div>{midill_heiti}</div>
                <div>{moment(upphaf).format("HH:mm")} - {moment(upphaf).add(slott, "minutes").format("HH:mm")}</div>
                <div>Þáttur {thattur} {thattafjoldi > 0 && (
                    <span>af {thattafjoldi}</span>
                )}</div>
            </div>
            <div>
                {lysing}
            </div>
        </div>
    )
}

RowExtraInfo.propTypes = {
    row: PropTypes.shape({
      midill_heiti: PropTypes.string.isRequired,
      upphaf: PropTypes.string.isRequired,
      isltitill: PropTypes.string.isRequired,
      lysing: PropTypes.string.isRequired,
      thattur: PropTypes.number.isRequired,
      thattafjoldi: PropTypes.number.isRequired,
      slott: PropTypes.number.isRequired,
    }).isRequired,
  };
  

export default RowExtraInfo;