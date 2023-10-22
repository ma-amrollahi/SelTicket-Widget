import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import controller from "../../controllers/controller";
import { showActions } from "../../features/show/show.slice";
import useAppDispatch from "../../hooks/store/useAppDispatch";
import ShowPage from "../../pages/ShowPage";
import { ScreeningI } from "../../types/screening.type";
import { ShowI } from "../../types/show.types";

const Screening: FC<ScreeningI> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [shows, setShows] = useState<ShowI[]>([]);
  const [more, setMore] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await controller.getShows(props.id);

      if (response.status === 200) {
        if (response.data.data.length > 9) setMore(true);
        setShows(response.data.data.slice(0, 9));
      }
    })();
  }, []);

  return (
    <div className="selticket-mb-6">
      <div className="selticket-flex selticket-justify-between selticket-items-center selticket-mb-4">
        <div className="selticket-flex selticket-flex-row selticket-items-center">
          <div className="selticket-w-2 selticket-h-2 selticket-bg-gray-300 selticket-ml-2 selticket-rounded-sm" />
          <h4 className="selticket-font-bold selticket-text-sm selticket-text-on-primary">
            {props.title}
          </h4>
        </div>
        <button
          disabled={!more}
          className="selticket-text-secondary disabled:selticket-text-on-secondary selticket-font-medium selticket-text-sm selticket-flex selticket-gap-1 selticket-items-center"
        >
          <div>مشاهده‌ی همه</div>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="selticket-grid selticket-grid-cols-3 selticket-gap-x-2 selticket-gap-y-5">
        {shows.map((show) => (
          <div
            key={show.id}
            className="selticket-h-full selticket-flex selticket-flex-col selticket-gap-1 selticket-cursor-pointer"
            onClick={() => {
              dispatch(showActions.setShow(show));
              navigate("/show");
            }}
          >
            <img
              src={show.image_url}
              alt={show.title}
              className="selticket-w-full selticket-mb-1 selticket-object-cover selticket-bg-gray-800 selticket-aspect-[3/4] selticket-flex-grow selticket-rounded selticket-overflow-hidden"
              loading="lazy"
            />
            <h6 className="selticket-text-center selticket-font-medium selticket-text-gray-500 selticket-line-clamp-1 selticket-text-xs">
              {show.title}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screening;
