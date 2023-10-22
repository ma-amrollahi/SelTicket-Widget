import {IoIosArrowBack, IoMdCheckmarkCircleOutline} from "react-icons/io";
import {PiNewspaperClippingLight} from "react-icons/pi";
import {IoCloseCircleOutline, IoLocationOutline} from "react-icons/io5";
import {AiOutlineFieldTime} from "react-icons/ai";
import {FC} from "react";
import {SaleI} from "../../types/sale.type";
import {Link, useNavigate} from "react-router-dom";

const PaymentCard:FC<{ data: SaleI }> = ({data}) => {
    const date = data?.persian_date.split(" ")
    const navigate = useNavigate()

    return(
        <>
            <div className="selticket-py-8 selticket-px-4">
                <div className="selticket-bg-primary-container selticket-pb-12 selticket-rounded selticket-shadow">
                    <div className="selticket-flex selticket-flex-row selticket-items-center selticket-py-4 selticket-px-5 selticket-border-b selticket-border-black">
                        <div className={`selticket-ml-2 selticket-text-2xl ${data?.status === "success" ? "selticket-text-on-primary-container" : "selticket-text-red-500"}`}>{data?.status === "success" ? <IoMdCheckmarkCircleOutline /> : <IoCloseCircleOutline />}</div>
                        <div className={`selticket-text-sm selticket-font-semibold ${data?.status === "success" ? "selticket-text-blackr" : "selticket-text-red-500"}`}>{data?.status === "success" ? "خرید شما با موفقیت انجام شد" : "خرید شما ناموفق بود"}</div>
                    </div>
                    <div className={"selticket-bg-primary selticket-py-2 selticket-px-4 selticket-space-y-4"}>
                        <div className={"selticket-relative selticket-shadow  selticket-h-36 selticket-rounded-lg selticket-py-2 selticket-px-6 selticket-overflow-hidden"}>
                            <div className=" selticket-absolute selticket-top-[55px] selticket-left-[-12px] selticket-bg-primary-container selticket-w-8 selticket-h-8 selticket-rounded-full selticket-z-10" />
                            <div className=" selticket-absolute selticket-top-[55px] selticket-right-[-12px] selticket-bg-primary-container selticket-w-8 selticket-h-8 selticket-rounded-full selticket-z-10" />
                            <div className={"selticket-flex selticket-flex-row selticket-h-full"}>
                                <div className={"selticket-bg-primary-container selticket-rounded-lg selticket-ml-2"}>
                                    <img src={data?.show_image_url} alt={data?.show_name} className=" selticket-w-20 selticket-object-cover" />
                                </div>
                                <div className={"selticket-flex-grow selticket-space-y-2"}>
                                    <div className="selticket-flex selticket-flex-row selticket-justify-between selticket-items-center">
                                        <div className="selticket-text-sm">{data?.show_name}</div>
                                        <div className={"selticket-flex selticket-flex-row selticket-items-center selticket-text-xs selticket-bg-neutral-300 selticket-text-neutral-500 selticket-p-1 selticket-rounded"}>
                                            <div className={"selticket-text-lg selticket-ml-2"}><PiNewspaperClippingLight /></div>
                                            <div>{`${data?.tickets_count} بلیت`}</div>
                                        </div>
                                    </div>
                                    {data?.place_name && <div className="selticket-flex selticket-flex-row selticket-items-center">
                                        <div className="selticket-text-on-primary-container selticket-ml-1"><IoLocationOutline /></div>
                                        <div  className="selticket-text-xs selticket-font-semibold">{data?.place_name}</div>
                                    </div>}
                                    <div className="selticket-flex selticket-flex-row selticket-items-center">
                                        <div className="selticket-text-on-primary-container selticket-ml-1"><AiOutlineFieldTime /></div>
                                        <div  className="selticket-text-on-primary-container selticket-text-xs">{`${date[1]} ${date[2]} ${date[3]} - سانس ${data?.created_at_hour}`}</div>
                                    </div>
                                    <Link to={`/details/${data?.order_id}`}>
                                        <div className="selticket-flex selticket-flex-row selticket-justify-end selticket-items-center selticket-text-red-500">
                                            <span className="!selticket-text-xs selticket-font-semibold">مشاهده بلیت</span>
                                            <span className={"selticket-text-lg"}><IoIosArrowBack /></span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"selticket-pt-16 selticket-pb-6 selticket-px-4"} onClick={() => navigate("/")}>
                        <div className={"selticket-bg-black selticket-py-3 selticket-rounded selticket-text-white selticket-text-center selticket-text-sm"}>
                            بازگشت
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentCard