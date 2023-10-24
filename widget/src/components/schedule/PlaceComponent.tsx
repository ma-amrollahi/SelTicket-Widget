import {
  faChevronDown,
  faChevronUp,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { IPlace } from "../../types/place.types";
import controller from "../../controllers/controller";
import { IShow } from "../../types/show.types";
import { ISchedule } from "../../types/schedules.types";
import { useLoading } from "flawless-ui";
import PATHS from "../../constants/paths/paths";
import Loader from "../loader/Loader";
import { showActions } from "../../features/show/show.slice";
import useAppDispatch from "../../hooks/store/useAppDispatch";
import { useNavigate } from "react-router-dom";

interface Props {
  place: IPlace;
  show: IShow;
  date: Date;
}

type HallSchedule = {
  [hall: string]: ISchedule[];
};

const PlaceComponent = ({ place, show, date }: Props) => {
  const [open, setOpen] = useState(false);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [schedules, setSchedules] = useState<HallSchedule | null>(null);
  useEffect(() => {
    setOpen(false);
    setSchedules(null);
    setSchedulesLoading(false);
  }, [date]);

  const groupByKey = (list: ISchedule[], key: string) =>
    list.reduce(
      (hash: any, obj: any) => ({
        ...hash,
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      }),
      {}
    );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          onClick={async () => {
            setSchedulesLoading(true);
            if (schedules == null) {
              const _schedules = await controller.getSchedules(
                place.id,
                show.id,
                `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              );
              var data: HallSchedule = groupByKey(
                _schedules.data.data,
                "venue_name"
              );

              setSchedules(data);
            }

            setOpen((p) => !p);
            setSchedulesLoading(false);
          }}
          className={`selticket-relative selticket-cursor-pointer selticket-text-secondary selticket-px-4 selticket-py-2 selticket-text-sm selticket-font-medium selticket-flex selticket-justify-between selticket-items-center`}
        >
          <div
            className={`selticket-absolute selticket-top-0 selticket-right-0 selticket-h-full selticket-w-full selticket-bg-secondary selticket-opacity-10  ${
              open ? "selticket-rounded-t-lg" : "selticket-rounded-lg"
            }`}
          />
          <div>انتخاب سانس</div>
          {schedulesLoading && <Loader />}
          {!schedulesLoading && (
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
          )}
        </div>

        {open &&
          schedules != null &&
          Object.keys(schedules)?.map((schedule: string) => (
            <div>
              <h4 className="selticket-p-2 selticket-border-b-2 selticket-border-b-red-500">
                {schedule}
              </h4>
              <div className="selticket-bg-tertiary selticket-p-4 selticket-rounded-b selticket-grid selticket-grid-cols-2 selticket-gap-4">
                {schedules[schedule].map((_sche) => {
                  return (
                    <div
                      key={_sche.id}
                      className="selticket-bg-primary-container selticket-rounded-lg selticket-overflow-hidden selticket-flex selticket-flex-col selticket-items-stretch"
                    >
                      <div className="selticket-py-5 selticket-flex selticket-flex-col selticket-items-center">
                        <div className="selticket-text-base selticket-font-bold selticket-text-secondary">
                          سانس {_sche.title.split(" ")[3]}
                        </div>
                        <div className="selticket-text-xs selticket-mt-2 selticket-text-grey-900">
                          {_sche.prices.length > 0
                            ? `${numberWithCommas(_sche.prices[0] / 10)} تومان`
                            : "بدون قیمت"}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(showActions.setSchedule(_sche));
                          navigate("/seats");
                        }}
                        className="selticket-bg-black selticket-py-4 selticket-text-center selticket-text-xs selticket-text-white selticket-font-bold"
                      >
                        انتخاب صندلی
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        {open && schedules != null && Object.keys(schedules).length == 0 && (
          <>
            <h3 className="selticket-text-center selticket-mt-4">
              هیچ سانسی یافت نشد!
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceComponent;
