import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, PropsWithChildren, useEffect } from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
  useRoutes,
  useNavigate,

} from "react-router-dom";
import { GoChecklist } from "react-icons/go";

const Layout: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname != '/cinema') {
      navigate('/')
    }
  }, [window.location.pathname])
  

  const handleBack = () => {
    if (location.pathname === "/") window.selTicket?.onClose();
    else navigate(-1);
  };

  return (
    <div className="selticket-py-4 selticket-bg-primary selticket-min-h-screen">
      <div className="selticket-flex selticket-flex-row selticket-justify-between selticket-items-center selticket-px-4 selticket-mb-4">
        <button
          onClick={handleBack}
          className="selticket-text-secondary selticket-font-medium selticket-text-sm selticket-flex selticket-gap-1 selticket-items-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          <div>بازگشت</div>
        </button>
        <Link to={"/orders"}>
          <div className="selticket-flex selticket-flex-row selticket-items-center selticket-text-on-primary-container">
            <div className="selticket-text-sm selticket-ml-1.5">
              <GoChecklist />
            </div>
            <div className="selticket-text-xs selticket-font-semibold">
              بلیط های من
            </div>
          </div>
        </Link>
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
