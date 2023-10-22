import {FC} from "react";

type ISeatCardProps = {
    row:number,
    seat: number
}
const SeatCard:FC<ISeatCardProps> = ({row =0, seat =0}) => {
    return(
        <div
            className="selticket-flex selticket-justify-center selticket-items-center selticket-gap-1.5 selticket-text-xs selticket-px-4 selticket-h-8 selticket-bg-primary selticket-text-on-secondary selticket-rounded"
        >
            <div>ردیف</div>
            <div className="selticket-text-on-primary">{row}</div>
            <div>صندلی</div>
            <div className="selticket-text-on-primary">{seat}</div>
        </div>
    )
}

export default SeatCard