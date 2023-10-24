import { useLoading } from "flawless-ui";
import { FC, useEffect, useMemo, useState } from "react";
import PATHS from "../../constants/paths/paths";
import controller from "../../controllers/controller";
import { selectLocation } from "../../features/location/location.selectors";
import useAppSelector from "../../hooks/store/useAppSelector";
import { IPlace } from "../../types/place.types";
import { DayI, ISchedulenfoI } from "../../types/schedules.types";
import { IShow } from "../../types/show.types";
import Loader from "../loader/Loader";
import Location from "../location/Location";
import PlaceComponent from "./PlaceComponent";
import PlaceWithSchedule from "./PlaceWithSchedule";

const ShowSchedules: FC<{
  show: IShow;
}> = (props) => {
  const { city, province } = useAppSelector(selectLocation);

  const placesLoading = useLoading(PATHS.getPlaces);

  const loading = useMemo(() => {
    return placesLoading;
  }, [placesLoading]);

  const [days, setDays] = useState<DayI[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);

  const setNextSevenDates = () => {
    const today = new Date();
    var _dates: Date[] = [today];
    for (let i = 0; i < 6; i++) {
      var _date = new Date();
      _date.setDate(_dates[i].getDate() + 1);
      _dates.push(_date);
    }
    return _dates;
  };

  useEffect(() => {
    setDates(setNextSevenDates());
    if (province && city) {
      (async () => {
        const _places = await controller.getPlaces(
          props.show.id,
          province.id,
          city.id
        );

        if (_places.status === 200) {
          setPlaces(_places.data.data);
          const daysHolder: DayI[] = [];

          // for (let i = 0; i < places.data.data.length; i++) {
          //     const place = places.data.data[i];
          //     const schedules = await controller.getSchedules(place.id, props.show.id)
          //     if (schedules.status === 200) {
          //         schedules.data.data.forEach(schedule => {
          //             const titles = schedule.title.split(' ');
          //             const scheduleInfo: ISchedulenfoI = {
          //                 weekDay: titles[0],
          //                 day: parseInt(titles[1]),
          //                 month: titles[2],
          //                 // time: (() => {
          //                 //     const time = titles[3].split(":");
          //                 //     return {
          //                 //         hour: parseInt(time[0]),
          //                 //         minute: parseInt(time[1]),
          //                 //     }
          //                 // })(),
          //             }
          //             const index = daysHolder.findIndex(dh => dh.day === scheduleInfo.day)
          //             if (index !== -1) {
          //                 const placeIndex = daysHolder[index].places.findIndex(p => p.id === place.id)
          //                 if (placeIndex === -1) {
          //                     daysHolder[index].places.push({
          //                         ...place,
          //                         schedules: [schedule],
          //                     })
          //                 } else {
          //                     daysHolder[index].places[placeIndex].schedules.push(schedule)
          //                 }
          //             } else {
          //                 daysHolder.push({
          //                     ...scheduleInfo,
          //                     places: [{
          //                         ...place,
          //                         schedules: [schedule],
          //                     }],
          //                 })
          //             }

          //         })
          //     }
          // }
          setDays(daysHolder);
        }
      })();
    }
  }, [city, province]);

  const handleDayClick = async (day: number) => {
    setSelectedDay(day);
  };

  return (
    <>
      <Location />
      {province && city ? (
        loading ? (
          <div className="selticket-pt-6 selticket-flex-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="selticket-flex selticket-justify-start selticket-items-center selticket-gap-x-2 selticket-overflow-x-auto selticket-pb-2 selticket-my-4">
              {dates.map((date) => {
                return (
                  <>
                    <button
                      className={
                        "selticket-relative selticket-flex selticket-flex-col selticket-justify-center selticket-items-center selticket-min-w-[112px] selticket-px-4 selticket-py-1 selticket-border selticket-rounded selticket-w-32 selticket-group " +
                        (date.getDate() === selectedDate.getDate()
                          ? "selticket-border-secondary selticket-selected"
                          : "")
                      }
                      onClick={() => {
                        
                        setSelectedDate(date);
                      }}
                    >
                      {date.getDate() === selectedDate.getDate() && (
                        <div
                          className={
                            "selticket-absolute selticket-right-1 selticket-top-1 selticket-w-2.5 selticket-h-2.5 selticket-rounded-full selticket-bg-secondary"
                          }
                        />
                      )}
                      <div className="selticket-text-xs selticket-font-bold selticket-text-on-primary selticket-mb-1">
                        {new Date(date).toLocaleDateString("fa", {
                          weekday: "long",
                        })}
                      </div>
                      <div className="selticket-text-xs selticket-font-normal selticket-text-on-primary-container group-[.selticket-selected]:selticket-text-secondary">
                        {new Date(date).toLocaleDateString("fa")}
                      </div>
                    </button>
                  </>
                );
              })}

              {days.map((day) => (
                <button
                  key={day.day}
                  className={
                    "selticket-relative selticket-flex selticket-flex-col selticket-justify-center selticket-items-center selticket-min-w-[112px] selticket-px-4 selticket-py-1 selticket-border selticket-rounded selticket-w-32 selticket-group " +
                    (day.day === selectedDay
                      ? "selticket-border-secondary selticket-selected"
                      : "")
                  }
                  onClick={() => handleDayClick(day.day)}
                >
                  {day.day === selectedDay && (
                    <div
                      className={
                        "selticket-absolute selticket-right-1 selticket-top-1 selticket-w-2.5 selticket-h-2.5 selticket-rounded-full selticket-bg-secondary"
                      }
                    />
                  )}
                  <div className="selticket-text-xs selticket-font-bold selticket-text-on-primary selticket-mb-1">
                    {day.weekDay}
                  </div>
                  <div className="selticket-text-xs selticket-font-normal selticket-text-on-primary-container group-[.selticket-selected]:selticket-text-secondary">
                    {day.day} {day.month}
                  </div>
                </button>
              ))}
            </div>
            <div className="selticket-flex selticket-flex-col selticket-items-stretch selticket-justify-center selticket-gap-y-4 selticket-overflow-hidden">
    
              {places.map((place) => {
                return <PlaceComponent key={place.id} date={selectedDate} show={props.show} place={place} />;
              })}
            </div>
          </>
        )
      ) : null}
    </>
  );
};

export default ShowSchedules;
