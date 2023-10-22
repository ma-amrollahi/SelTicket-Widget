import { FC, useEffect, useState } from "react";
import controller from "../../controllers/controller";
import { selectLocation } from "../../features/location/location.selectors";
import useAppSelector from "../../hooks/store/useAppSelector";
import { ProvinceI, ProvincesT } from "../../types/province.types";
import LocationSelector from "./LocationSelector";

const optionClassName = "selticket-bg-primary selticket-cursor-pointer selticket-text-on-primary-container selticket-text-center selticket-px-4 selticket-py-2 selticket-rounded-lg"

const Location: FC = () => {

    const { city, province } = useAppSelector(selectLocation);

    const [openSelector, setOpenSelector] = useState<"province" | "city" | null>(null)
    const [items, setItems] = useState<ProvinceI[]>([])

    const handleSelectProvince = async () => {
        setOpenSelector("province")
        const response = await controller.getProvinces()

        if (response.status === 200) {
            setItemsFromResponse(response.data.data)
        }
    }

    const handleSelectCity = async () => {
        if (province) {
            setOpenSelector("city")
            const response = await controller.getCities(province.id)

            if (response.status === 200) {
                setItemsFromResponse(response.data.data)
            }
        }
    }

    const setItemsFromResponse = (p: ProvincesT) => {
        setItems(Object.entries(p).map(([id, name]) => ({
            id: parseInt(id),
            name,
        })))
    }

    const handleClose = () => {
        setOpenSelector(null)
        setItems([])
    }

    useEffect(() => {
        if(province && (city === undefined))
            handleSelectCity()
    }, [province])

    
    return (
        <div className="selticket-grid md:selticket-flex selticket-grid-cols-2 selticket-gap-2">
            {province
                ? <>
                    <div onClick={handleSelectProvince} className={optionClassName}>
                        استان: {province.name}
                    </div>
                    {city
                        ? <div onClick={handleSelectCity} className={optionClassName}>
                            شهر: {city.name}
                        </div>
                        : <div onClick={handleSelectCity} className={optionClassName}>
                            انتخاب شهر
                        </div>
                    }
                </>
                : <div className={optionClassName} onClick={handleSelectProvince}>
                    انتخاب استان
                </div>
            }
            <LocationSelector 
                open={openSelector}
                onClose={handleClose}
                items={items}
            />
        </div>
    )
}

export default Location