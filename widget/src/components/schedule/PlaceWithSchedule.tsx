import { faChevronDown, faChevronUp, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showActions } from "../../features/show/show.slice";
import useAppDispatch from "../../hooks/store/useAppDispatch";
import SeatsPage from "../../pages/SeatsPage";
import { PlaceWithSchedulesI } from "../../types/schedules.types";
import { ShowI } from "../../types/show.types";

const PlaceWithSchedule: FC<{
    place: PlaceWithSchedulesI,
    show: ShowI,
}> = ({place, show}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="selticket-border selticket-rounded-lg">
            <div className="selticket-px-4 selticket-py-1 selticket-text-sm selticket-font-bold">
                {place.title}
            </div>
            <div className="selticket-pb-5 selticket-pt-2 selticket-px-4">
                <div className="selticket-text-xs selticket-font-normal selticket-text-on-primary-container selticket-flex selticket-items-center selticket-justify-start selticket-gap-x-2 selticket-mb-5">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {place.address}
                </div>
                <div 
                    onClick={() => setOpen(p => !p)} 
                    className={
                        `selticket-relative selticket-cursor-pointer selticket-text-secondary selticket-px-4 selticket-py-2 selticket-text-sm selticket-font-medium selticket-flex selticket-justify-between selticket-items-center`
                    }
                >
                    <div 
                        className={`selticket-absolute selticket-top-0 selticket-right-0 selticket-h-full selticket-w-full selticket-bg-secondary selticket-opacity-10  ${open ? "selticket-rounded-t-lg" : "selticket-rounded-lg"}`}
                    />
                    <div>
                        انتخاب سانس
                    </div>
                    <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
                </div>
                {open && (
                    <div className="selticket-bg-tertiary selticket-p-4 selticket-rounded-b selticket-grid selticket-grid-cols-2 selticket-gap-4">
                        {place.schedules.map(schedule => (
                            <div key={schedule.id} className="selticket-bg-primary-container selticket-rounded-lg selticket-overflow-hidden selticket-flex selticket-flex-col selticket-items-stretch">
                                <div className="selticket-py-5 selticket-flex selticket-flex-col selticket-items-center">
                                    <div className="selticket-text-base selticket-font-bold selticket-text-secondary">
                                        {schedule.title.split(" ")[3]}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        dispatch(showActions.setSchedule(schedule))
                                        navigate("/seats")
                                    }}
                                    className="selticket-bg-black selticket-py-4 selticket-text-center selticket-text-xs selticket-text-white selticket-font-bold"
                                >
                                    انتخاب صندلی
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlaceWithSchedule