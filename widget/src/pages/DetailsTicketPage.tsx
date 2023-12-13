import {FC, useEffect, useState} from "react";
import SeatCard from "../components/card/SeactCard";
import Card from "../components/card/Card";
import {MdContentCopy} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {OrderDetailsDataI} from "../types/order.types";
import {useHttp} from "flawless-ui";
import controller from "../controllers/controller";
import Loader from "../components/loader/Loader";
import {priceFormatToman} from "../utils/functions";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";

const DetailsTicketPage: FC = () => {
    const params = useParams()
    const [details, setDetails] = useState<OrderDetailsDataI>()
    const [copyAlert, setCopyAlert] = useState<boolean>(false)

    const {Feedback, loading, call} = useHttp();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await call(controller.check(parseInt(params?.orderId!)));

            if (response.status === 200) {
                setDetails(response.data.data)
            }
        })();
    }, []);

    const handleCopyBtn = () => {
        navigator.clipboard.writeText(details?.code!).then(
            () => {
                // invoked if the data is copied
                setCopyAlert(true)
            },
            () => {
                // handle data copy error
                console.log("Copying failed")
            }
        )
        setTimeout(() => {
            setCopyAlert(false)
        }, 2500)
    }


    if (loading)
        return (
            <div className="selticket-flex-center selticket-p-6">
                <Loader/>
            </div>
        );

    return (
        <>
            <div className="selticket-relative selticket-py-8 selticket-px-4">
                <Card customClass={"selticket-relative selticket-shadow-none selticket-pb-4 selticket-overflow-hidden selticket-mb-8 !selticket-rounded-b"}>
                    <div className={"selticket-flex selticket-flex-row"}>
                        <div className={"selticket-w-28 selticket-h-full selticket-rounded selticket-ml-2 selticket-bg-gray-300"}>
                            <img src={details?.show_image_url} className={"selticket-rounded selticket-object-cover"} alt={details?.show_name} />
                        </div>
                        <div>
                            <div
                                className={"selticket-absolute selticket-bottom-[61px] selticket-right-[-15px] selticket-w-10 selticket-h-10 selticket-border-l-4 selticket-border-white selticket-rounded-full selticket-bg-primary"}/>
                            <div
                                className={"selticket-absolute selticket-bottom-[61px] selticket-left-[-15px] selticket-w-10 selticket-h-10 selticket-border-r-4 selticket-border-white selticket-rounded-full selticket-bg-primary"}/>
                            <div className={"selticket-mb-8"}>
                                <h3 className={"selticket-font-semibold selticket-mb-4"}>{details?.show_name}</h3>
                                <ul className={"selticket-text-xs selticket-text-on-primary-container selticket-space-y-2"}>
                                    <li>{`${details?.persian_date?.split(" ")[1]} ${details?.persian_date?.split(" ")[2]} ${details?.persian_date?.split(" ")[3]} / سانس ${details?.start_at_hour}`}</li>
                                    <li className={"selticket-text-black"}>{details?.place_name}</li>
                                    <li>{details?.place_address}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"selticket-grow selticket-mb-6"}>
                        <div className={"selticket-text-sm selticket-mb-4"}>شماره صندلی</div>
                        <div className="selticket-grid selticket-grid-cols-3 selticket-gap-2">
                            {details?.tickets?.map((item, _) => <SeatCard key={item?.id} row={parseInt(item?.row)}
                                                                          seat={item?.number}/>)}
                        </div>
                    </div>
                    <div
                        className={"selticket-h-[1px] selticket-bg-gradient-to-l selticket-from-transparent selticket-to-gray-300 selticket-to-50% selticket-from-40% selticket-bg-[length:7px_1px] selticket-bg-repeat-x selticket-w-full"}/>
                    <div
                        className={"selticket-h-16 selticket-pt-2 selticket-flex selticket-flex-row selticket-justify-between sleticket-items-start"}>
                        <div
                            className={"selticket-flex selticket-flex-row selticket-justify-start selticket-items-center"}>
                            <div className={"selticket-text-on-primary-container selticket-text-xs selticket-ml-1.5"}>کد
                                رزرو:
                            </div>
                            <div id={"reserve-code"} className={"selticket-font-semibold selticket-text-sm"}>{details?.code}</div>
                        </div>
                        <div className={"selticket-flex selticket-flex-row selticket-justify-start selticket-items-center selticket-text-red-500"} onClick={handleCopyBtn}>
                            <div className={"selticket-text-xl selticket-ml-1"}><MdContentCopy/></div>
                            <div className={"selticket-text-sm"}>کپی کد</div>
                        </div>
                    </div>
                </Card>
                <div className={"selticket-flex selticket-flex-row selticket-items-center selticket-bg-black/70 selticket-p-4 selticket-mb-8 selticket-rounded-lg selticket-text-white selticket-text-xs"}>
                    <div className={"selticket-ml-3 selticket-text-2xl"}><IoMdCheckmarkCircleOutline /></div>
                    <div>{`(${details?.tickets_count}) بلیت با موفقیت خریداری شد`}</div>
                </div>
                <Card customClass={"selticket-mb-14 selticket-pb-8"}>
                    <div
                        className={"selticket-flex selticket-flex-row selticket-justify-between selticket-items-center selticket-text-xs selticket-pb-6 selticket-border-b"}>
                        <div>مجموع هزینه</div>
                        <div>{`${details?.customer_final_price! > 0 ? priceFormatToman(details?.customer_final_price!) : 0} تومان`}</div>
                    </div>
                    <div
                        className={"selticket-flex selticket-flex-row selticket-justify-between selticket-items-center selticket-text-xs selticket-pt-6"}>
                        <div>
                            <span className={"selticket-ml-4"}>بلیت</span>
                            <span>{`${details?.tickets_count} عدد`}</span>
                        </div>
                        <div>{priceFormatToman(details?.tickets.reduce((total, s) => total + s.price, 0) ?? 0)} تومان</div>
                    </div>
                </Card>
                <div onClick={()=>{
                    navigate(-1);
                }} className={"selticket-bg-red-600 selticket-text-white selticket-py-4 selticket-px-3 selticket-text-center selticket-text-sm selticket-font-semibold selticket-rounded hover:selticket-opacity-80"}>
                    بازگشت به فهرست بلیت ها
                </div>
                {copyAlert && <div className={"selticket-sticky selticket-bottom-[30px] selticket-text-center selticket-bg-red-600 selticket-transition selticket-duration-300 selticket-p-4 selticket-mb-8 selticket-rounded-lg selticket-text-white selticket-text-xs"}>
                    <div>{`کد رزرو کپی شد`}</div>
                </div>}
            </div>
        </>
    )
}

export default DetailsTicketPage