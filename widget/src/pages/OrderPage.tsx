import {faTicket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC, useEffect, useState} from "react";
import Card from "../components/card/Card";
import {selectOrderState} from "../features/order/order.selectors";
import {selectShowState} from "../features/show/show.selectors";
import useAppSelector from "../hooks/store/useAppSelector";
import controller from "../controllers/controller";
import {priceFormatToman} from "../utils/functions";
import {OrderI} from "../types/order.types";
import SeatCard from "../components/card/SeactCard";
import {useHttp} from "flawless-ui";
import Loader from "../components/loader/Loader";
import {SaleI} from "../types/sale.type";
import PaymentCard from "../components/payment/PaymentCard";

const OrderPage: FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderI>({
        order_id: 0, final_price: 0, customer_final_price: 0
    })
    const {Feedback, loading, call} = useHttp();
    const [resultPayment, setResultPayment] = useState<SaleI>()

    const {
        show,
        schedule,
    } = useAppSelector(selectShowState)

    const {
        selected,
        order,
    } = useAppSelector(selectOrderState)

    useEffect(() => {
        (async () => {
            const response = await call(controller.reserve({
                seat_ids: selected.seats.map(s => s.seat_id),
                block_id: selected.block_id.toString(),
                schedule_id: schedule.id.toString(),
                applicationId: window.selTicket?.applicationId!
            }))

            if (response.status === 200) {
                setOrderDetails(response.data.data)
            }
        })()
    }, [])

    const handlePaymentBtn = async () => {
        const response = await call(controller.sale(orderDetails?.order_id))

        if(response.status === 200){
            setResultPayment(response?.data?.data)
        }else{
            const res_error = await call(controller.fail(orderDetails?.order_id))

            if(res_error.status === 200){
                const scheduleSplit = schedule.title.split(" ")
                setResultPayment({
                    status : "success",
                    order_id: orderDetails?.order_id,
                    show_name: show?.title,
                    show_image_url: show?.image_url,
                    place_name: "show?.",
                    place_address: "",
                    persian_date: `${scheduleSplit[1]} ${scheduleSplit[2]}`,
                    created_at_hour: `${scheduleSplit[3]}`,
                    tickets_count: selected?.seats?.length > 0 ? selected?.seats?.length : 0,
                })
            }
        }
    }

    console.log('orderId', orderDetails.order_id)

    if (!order) {
        return (resultPayment !== undefined) ? <PaymentCard data={resultPayment} /> :
        (
            <div className="selticket-bg-primary selticket-px-4 selticket-py-10 selticket-flex selticket-flex-col selticket-items-stretch selticket-gap-8">
                <Card>
                    <div className="selticket-flex selticket-items-center selticket-gap-5 selticket-mb-6 ">
                        <img
                            src={show.image_url}
                            className="selticket-h-40 selticket-rounded selticket-overflow-hidden selticket-z-20"
                        />
                        <div
                            className="selticket-z-20 selticket-h-40 selticket-box-border selticket-py-2 selticket-flex selticket-flex-col selticket-justify-between">
                            <h1 className="selticket-text-on-primary selticket-font-semibold selticket-text-sm selticket-pb-4">
                                {show.title}
                            </h1>
                            {(() => {
                                const scheduleSplit = schedule.title.split(" ")
                                return (
                                    <div className="selticket-flex selticket-flex-col selticket-gap-y-2">
                                        <div className="selticket-text-on-primary selticket-text-xs">
                                            {scheduleSplit[0]}
                                        </div>
                                        <div className="selticket-text-on-primary selticket-text-xs">
                                            {scheduleSplit[1]} {scheduleSplit[2]}
                                        </div>
                                        <div className="selticket-text-on-primary selticket-text-xs">
                                            ساعت {scheduleSplit[3]}
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>
                    </div>
                    <div
                        className="selticket-w-full selticket-border-t selticket-border-tertiary-container selticket-pt-6 ">
                        <div className="selticket-flex selticket-justify-between selticket-items-center selticket-mb-6">
                        <span className="selticket-text-xs selticket-text-on-primary selticket-font-bold">
                            صندلی‌های شما
                        </span>
                            <div
                                className="selticket-flex selticket-items-center selticket-gap-2 selticket-text-[10px] selticket-px-4 selticket-h-8 selticket-bg-primary selticket-text-on-secondary selticket-rounded">
                                <FontAwesomeIcon icon={faTicket}/>
                                <span>
                                {selected.seats.length} بلیت
                            </span>
                            </div>
                        </div>
                        <div className="selticket-grid selticket-grid-cols-3 selticket-gap-2">
                            {selected.seats.map(seat => <SeatCard key={seat.seat_id} row={parseInt(seat.row)}
                                                                  seat={seat.number}/>)}
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="selticket-text-xs selticket-font-semibold selticket-text-on-primary selticket-mb-4">
                        قوانین و مقررات
                    </div>
                    <ul className="selticket-pr-3">
                        {[
                            "کنسلی بلیت تنها تا ۲ ساعت قبل از زمان اکران فیلم امکان‌پذیر است.",
                            "پیش از پرداخت آنلاین وجه، محل صندلی خود را انتخاب نمایید. در غیر این صورت این سایت مسئولیتی در قبال بلیت شما نخواهد داشت.",
                            "فیلم در صورتی اکران میشود که حداقل ۵ بلیت فروش رفته باشد.",
                            "برای دریافت بلیت خود ۱۵ دقیقه قبل از شروع سانس به گیشه یا کیوسک‌های آی‌تیکت مراجعه فرمایید.",
                            "کاربر موظف است اطلاعات شخصی واقعی و صحیح خود را در سایت وارد نماید. سایت آی‌تیکت مسئولیتی در قبال هرگونه مشکل احتمالی که در اثر ارایه‌ی اطلاعات نادرست از طرف کاربر ایجاد شده است، ندارد.",
                        ].map((item, index) => (
                            <li key={index}
                                className="selticket-flex selticket-list-none before:selticket-content-['●'] before:selticket-text-[22px] before:selticket-text-secondary before:selticket-opacity-25 selticket-mt-2">
                            <span
                                className="selticket-mr-3 selticket-pt-1.5 selticket-text-xs selticket-text-on-primary-container selticket-text-justify selticket-leading-[18px]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    {loading ? <div className="selticket-text-center"><Loader/></div> :
                        <>
                            <div
                                className={"selticket-grid selticket-grid-cols-5 selticket-gap-4 selticket-text-xs selticket-text-on-primary-container selticket-mb-5"}>
                                <div className="selticket-col-span-2">بلیت های شما</div>
                                <div
                                    className="selticket-col-span-1 selticket-font-semibold">{`${selected.seats.length} عدد`}</div>
                                <div
                                    className="selticket-col-span-2 selticket-font-semibold selticket-text-left">{`${priceFormatToman(orderDetails?.final_price)} تومان`}</div>
                            </div>
                            <div
                                className={"selticket-grid selticket-grid-cols-5 selticket-gap-4 selticket-text-xs selticket-text-on-primary-container selticket-mb-7"}>
                                <div className="selticket-col-span-2">کارمزد خریدهای آنلاین</div>
                                <div className="selticket-col-span-1 selticket-font-semibold">%4</div>
                                <div
                                    className="selticket-col-span-2 selticket-font-semibold selticket-text-left">{`${priceFormatToman(orderDetails?.customer_final_price - orderDetails?.final_price)} تومان`}</div>
                            </div>
                            <hr className="selticket-mb-7"/>
                            <div
                                className="selticket-flex selticket-flex-row selticket-text-on-primary selticket-justify-between selticket-items-center selticket-text-xs selticket-font-bold selticket-mb-8">
                                <div>مبلغ قابل پرداخت</div>
                                <div>{`${priceFormatToman(orderDetails?.customer_final_price)} تومان`}</div>
                            </div>
                            {orderDetails?.customer_final_price > 0 && <div
                                className="selticket-bg-black selticket-text-white selticket-p-3 selticket-text-on-primary selticket-text-xs selticket-font-semibold selticket-rounded">
                                <div
                                    className="selticket-flex selticket-flex-row selticket-justify-around selticket-items-center"
                                    onClick={handlePaymentBtn}>
                                    <div>پرداخت</div>
                                    <div>{`${priceFormatToman(orderDetails?.customer_final_price)} تومان`}</div>
                                </div>
                            </div>}
                        </>
                    }
                </Card>
                <Feedback />
            </div>
        )
    }
    return null
}

export default OrderPage