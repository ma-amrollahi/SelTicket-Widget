import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { locationActions } from "../../features/location/location.slice";
import useAppDispatch from "../../hooks/store/useAppDispatch";
import { ProvinceI } from "../../types/province.types";

const LocationSelector: FC<{
    open: "province" | "city" | null,
    onClose: () => void,
    items: ProvinceI[],
}> = props => {

    const dispatch = useAppDispatch()

    const handleItemClick = (item: ProvinceI) => {
        switch (props.open) {
            case "province": 
                dispatch(locationActions.setProvince(item))
                break
            case "city":
                dispatch(locationActions.setCity(item))
                break
        }
        props.onClose()
    }

    return (
        <div className="selticket-fixed selticket-h-screen selticket-w-screen selticket-right-0 selticket-top-full selticket-z-[999]">
            <div 
                className={
                    `selticket-relative selticket-transition-all ${props.open ? "-selticket-translate-y-full selticket-bg-black" : ""} selticket-w-full selticket-h-full selticket-bg-opacity-40`
                }
                onClick={props.onClose}
            >
                <div 
                    className="selticket-flex selticket-flex-col selticket-justify-start selticket-items-stretch selticket-h-5/6 selticket-w-full selticket-absolute selticket-bottom-0 selticket-right-0 selticket-bg-primary-container selticket-rounded-t-lg selticket-pt-4 "
                    onClick={e => e.stopPropagation()}
                >
                    <div className="selticket-px-4 selticket-text-on-primary-container selticket-pb-6 selticket-border-b selticket-border-tertiary">
                        <button 
                            onClick={props.onClose} 
                            className="selticket-h-8 selticket-w-8 selticket-flex selticket-justify-center selticket-items-center"
                        >
                            <FontAwesomeIcon icon={faXmark} size="xl" />
                        </button>
                    </div>
                    <div className="selticket-flex selticket-flex-col selticket-justify-start selticket-items-stretch selticket-flex-grow selticket-overflow-scroll selticket-px-4 selticket-py-4">
                        {props.items.map(item => (
                            <div
                                key={item.id}
                                className="selticket-text-sm selticket-cursor-pointer selticket-font-medium selticket-text-on-primary-container selticket-flex selticket-justify-between selticket-items-center selticket-py-2 selticket-px-4 selticket-border-b last:selticket-border-0 selticket-border-tertiary-container"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.name}
                                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationSelector