import { FC } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LiaBarcodeSolid } from "react-icons/lia";
import {PiNewspaperClippingLight} from "react-icons/pi";
import {OrderListDataI} from "../../types/order.types";
import {Link} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";

const OrderInfoItem: FC<{ content: string; icon: JSX.Element }> = (props) => {
  return (
    <li className="selticket-flex selticket-flex-row selticket-items-center selticket-text-on-primary-container">
      <div className="selticket-ml-1 selticket-text-sm">{props.icon}</div>
      <div className="selticket-text-xs">{props.content}</div>
    </li>
  );
};

const OrderCard: FC<{data: OrderListDataI}> = ({data}) => {
  const date = data?.showDay.split(" ")
  return (
    <div className="selticket-bg-white selticket-rounded-lg selticket-py-4 selticket-px-6 selticket-h-36 selticket-relative selticket-mb-4">
      <div className="selticket-bg-primary selticket-w-6 selticket-h-6 selticket-rounded-full selticket-absolute selticket-top-[40%] selticket-right-[-12px]" />
      <div className="selticket-bg-primary selticket-w-6 selticket-h-6 selticket-rounded-full selticket-absolute selticket-top-[40%] selticket-left-[-12px]" />
      <div className="selticket-flex selticket-flex-row selticket-justify-start selticket-h-full">
        <div className="selticket-flex-initial selticket-w-24 selticket-ml-3 selticket-bg-primary selticket-rounded-lg">
          <img
            src={data?.showImageUrl}
            alt={data?.showName}
            className="selticket-h-full selticket-rounded-lg selticket-object-cover"
          />
        </div>
        <div className="selticket-flex-grow selticket-py-1">
          <ul className="selticket-h-full selticket-flex selticket-flex-col selticket-justify-between selticket-items-start">
            <li className="selticket-flex selticket-flex-row selticket-justify-between selticket-items-center selticket-w-full">
              <h3 className="selticket-text-on-primary-container selticket-text-sm selticket-font-semibold">
                {data?.showName}
              </h3>
              <div className={"selticket-flex selticket-flex-row selticket-items-center selticket-text-xs selticket-bg-neutral-300 selticket-text-neutral-500 selticket-p-1 selticket-rounded"}>
                <div className={"selticket-text-lg selticket-ml-2"}><PiNewspaperClippingLight /></div>
                <div>{`${data?.ticketCount} بلیت`}</div>
              </div>
            </li>
            <OrderInfoItem
              icon={<IoLocationOutline />}
              content={data?.placeName}
            />
            <OrderInfoItem
              icon={<AiOutlineClockCircle />}
              content={`${date[1]} ${date[2]} ${date[3]} - سانس ${data?.showTime}`}
            />
            <li className="selticket-text-left selticket-w-full">
              <Link to={`/details/${data?.orderId}`}>
                <div className="selticket-flex selticket-flex-row selticket-justify-end selticket-items-center selticket-text-red-500">
                  <span className="!selticket-text-xs selticket-font-semibold">مشاهده بلیت</span>
                  <span className={"selticket-text-lg"}><IoIosArrowBack /></span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
