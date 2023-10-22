import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import controller from "../controllers/controller";
import { orderActions } from "../features/order/order.slice";
import { selectSchedule } from "../features/show/show.selectors";
import useAppDispatch from "../hooks/store/useAppDispatch";
import useAppSelector from "../hooks/store/useAppSelector";
import { BlockI, SeatI, SeatStatus } from "../types/seats.types";
import { priceFormatToman } from "../utils/functions";

const SeatsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schedule = useAppSelector(selectSchedule);

  const [blocks, setBlocks] = useState<BlockI[]>([]);
  // [x, y, count]
  const [max, setMax] = useState<[number, number, number]>([0, 0, 0]);
  const [seatStatus, setSeatStatus] = useState<SeatStatus>({});
  const [selected, setSelected] = useState<BlockI | null>(null);

  useEffect(() => {
    (async () => {
      const response = await controller.getSeats(schedule.id);

      if (response.status === 200) {
        let maxX = 0;
        let maxY = 0;
        let count = 0;
        setBlocks(
          response.data.data.blocks.map((unsanitizedBlock) => {
            return {
              block_id: unsanitizedBlock.block_id,
              seats: unsanitizedBlock.seats.map((seat) => {
                if (seat[2] > maxX) maxX = seat[2];
                if (seat[3] > maxY) maxY = seat[3];
                count++;
                return {
                  schedule_seat_id: seat[0],
                  seat_id: seat[1],
                  x: seat[2],
                  y: seat[3],
                  type: seat[4],
                  row: seat[5],
                  number: seat[6],
                  price: seat[7],
                };
              }),
            };
          })
        );
        setMax([maxX + 68, maxY + 46, count]);
      }
    })();
    (async () => {
      const response = await controller.getSeatStatus(schedule.id);

      if (response.status === 200) {
        setSeatStatus(response.data.data);
      }
    })();
  }, [schedule]);

  const handleSeatClick = (block_id: number, seat: SeatI) => {
    const status = seatStatus[seat.seat_id];
    switch (status) {
      case 0:
        if (selected === null) {
          setSelected({
            block_id,
            seats: [seat],
          });
        } else if (selected.seats.length === 10) {
          return;
        } else {
          setSelected((prev) => ({
            block_id: prev!.block_id,
            seats: [...prev!.seats, seat],
          }));
        }
        setSeatStatus((prev) => ({
          ...prev,
          [seat.seat_id]: 2,
        }));
        break;
      case 2:
        if (selected === null) {
          return;
        } else {
          setSelected((prev) => ({
            block_id: prev!.block_id,
            seats: [...prev!.seats.filter((s) => s.seat_id !== seat.seat_id)],
          }));
        }
        setSeatStatus((prev) => ({
          ...prev,
          [seat.seat_id]: 0,
        }));
        break;
    }
  };

  return (
    <div className="selticket-flex selticket-flex-col selticket-justify-start selticket-items-stretch">
      <div className="selticket-overflow-auto selticket-flex-grow selticket-bg-neutral-600">
        <div
          className="selticket-flex selticket-justify-center selticket-items-start selticket-mb-12 selticket-pt-8 selticket-mx-auto"
          style={{ width: max[0] }}
        >
          <div className="selticket-text-center selticket-w-[90vw] selticket-rounded selticket-bg-neutral-800 selticket-py-3 selticket-text-white selticket-text-sm">
            صفحه اجرا
          </div>
        </div>
        <div
          className="selticket-relative selticket-mx-auto"
          style={{
            width: max[0],
            height: max[1],
          }}
        >
          {Object.keys(seatStatus).length ? (
            blocks.map((block) =>
              block.seats.map((seat) => (
                <div
                  key={seat.seat_id}
                  className={`selticket-absolute selticket-rounded-full selticket-h-7 selticket-w-7 ${(() => {
                    const status = seatStatus[seat.seat_id];
                    switch (status) {
                      case 0:
                        return "selticket-bg-neutral-400 selticket-cursor-pointer";
                      case 3: // taken
                        return "selticket-bg-neutral-700 selticket-border selticket-border-neutral-400";

                      case 2: // selected
                        return "selticket-bg-secondary selticket-cursor-pointer";
                      default:
                        return "selticket-bg-white";
                    }
                  })()} `}
                  style={{
                    left: seat.x,
                    top: seat.y,
                  }}
                  onClick={() => handleSeatClick(block.block_id, seat)}
                ></div>
              ))
            )
          ) : (
            <div className="selticket-pt-6 selticket-flex-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
      {(() => {
        let count = 0;
        let price = 0;
        selected?.seats.forEach((seat) => {
          count++;
          price += seat.price;
        });
        return (
          <div className="selticket-py-3 selticket-px-4 selticket-flex selticket-justify-between selticket-items-center selticket-bg-neutral-900 selticket-text-white">
            <div className="selticket-flex selticket-justify-start selticket-items-center selticket-gap-x-2">
              <FontAwesomeIcon
                icon={faCouch}
                className="selticket-text-secondary"
              />
              <div className={"selticket-text-sm"}>
                {selected?.seats.length ?? 0}
              </div>
            </div>
            <div className="py-3 px-4 flex justify-between items-center bg-neutral-900 text-white">
              <div className="selticket-text-sm">
                {priceFormatToman(
                  selected?.seats.reduce((total, s) => total + s.price, 0) ?? 0
                )}{" "}
                تومان
              </div>
            </div>
          </div>
        );
      })()}
      <div className="selticket-border-t selticket-border-neutral-100 selticket-bg-neutral-600 selticket-pt-4 selticket-pb-8 selticket-px-4">
        <div className="selticket-mb-6 selticket-flex selticket-justify-between selticket-items-center">
          <div className="selticket-px-1 iticke-py-0.5 selticket-text-white selticket-text-xs selticket-rounded selticket-bg-neutral-900">
            ظرفیت سالن: {max[2]}
          </div>
          {[
            { text: "صندلی خالی", color: "selticket-bg-neutral-400" },
            {
              text: "فروخته شده",
              color:
                "selticket-bg-neutral-700 selticket-border selticket-border-neutral-400",
            },
            { text: "انتخاب شما", color: "selticket-bg-secondary" },
          ].map((item, i) => (
            <div
              key={i}
              className="selticket-flex selticket-justify-start selticket-items-center selticket-gap-x-1"
            >
              <div
                className={
                  "selticket-rounded-full selticket-h-4 selticket-w-4 " +
                  item.color
                }
              />
              <span className="selticket-text-white selticket-text-xs">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <button
          className={`selticket-py-3 selticket-px-6 selticket-w-full selticket-text-white selticket-box-border ${
            selected != null && selected?.seats.length > 0
              ? "selticket-bg-red-600"
              : "selticket-bg-tertiary"
          } selticket-rounded selticket-text-sm`}
          disabled={selected === null}
          onClick={() => {
            dispatch(orderActions.setSelected(selected!));
            navigate("/order");
          }}
        >
          ثبت و پرداخت نهایی
        </button>
      </div>
    </div>
  );
};

export default SeatsPage;
