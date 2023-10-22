import { useHttp, useLoading } from "flawless-ui";
import { FC, useEffect, useState } from "react";
import Screening from "../components/screening/Screening";
import controller from "../controllers/controller";
import { ScreeningI } from "../types/screening.type";
import Loader from "../components/loader/Loader";
import Alert from "../components/alert/Alert";

const ScreeningPage: FC = () => {
  const [screenings, setScreenings] = useState<ScreeningI[]>([]);

  const { Feedback, loading, call } = useHttp({
    hideSuccess: true
  });

  useEffect(() => {
    (async () => {
      const response = await call(controller.getScreening());

      if (response.status === 200) {
        setScreenings(response.data.data);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="selticket-flex-center selticket-p-6">
        <Loader />
      </div>
    );
  return (
    <div className="selticket-px-4">
      {screenings.map((screening) => (
        <Screening key={screening.id} {...screening} />
      ))}
      <Feedback />
    </div>
  );
};

export default ScreeningPage;
