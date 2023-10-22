import { FC } from "react";
import { Link } from "react-router-dom";

const EmptyOrders: FC = () => {
  return (
    <div className="selticket-bg-white selticket-rounded-lg selticket-p-8 selticket-text-center">
      <div className="selticket-py-5">
        <div className="selticket-flex selticket-justify-center selticket-mb-8">
          <svg
            width="130"
            height="130"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_475_5437)">
              <path
                d="M28 6H27.4141L30 3.4141L28.5859 2L2 28.5859L3.4141 30L7.4141 26H28C28.5302 25.9993 29.0385 25.7883 29.4134 25.4134C29.7883 25.0385 29.9993 24.5302 30 24V19C30 18.7348 29.8946 18.4804 29.7071 18.2929C29.5196 18.1054 29.2652 18 29 18C28.4696 18 27.9609 17.7893 27.5858 17.4142C27.2107 17.0391 27 16.5304 27 16C27 15.4696 27.2107 14.9609 27.5858 14.5858C27.9609 14.2107 28.4696 14 29 14C29.2652 14 29.5196 13.8946 29.7071 13.7071C29.8946 13.5196 30 13.2652 30 13V8C29.9994 7.46975 29.7885 6.9614 29.4135 6.58646C29.0386 6.21152 28.5302 6.00061 28 6ZM28 12.1265C27.1411 12.348 26.3803 12.8487 25.837 13.5498C25.2938 14.251 24.999 15.1128 24.999 15.9998C24.999 16.8867 25.2938 17.7485 25.837 18.4497C26.3803 19.1508 27.1411 19.6515 28 19.873V24H21V21H19V24H9.4141L19 14.4141V19H21V12.4141L25.4141 8H28V12.1265Z"
                fill="#D9D9D9"
              ></path>{" "}
              <path
                d="M4 12.1265V8H19V6H4C3.46975 6.00061 2.9614 6.21152 2.58646 6.58646C2.21152 6.9614 2.00061 7.46975 2 8V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14C3.53043 14 4.03914 14.2107 4.41421 14.5858C4.78929 14.9609 5 15.4696 5 16C5 16.5304 4.78929 17.0391 4.41421 17.4142C4.03914 17.7893 3.53043 18 3 18C2.73478 18 2.48043 18.1054 2.29289 18.2929C2.10536 18.4804 2 18.7348 2 19V24H4V19.873C4.85886 19.6515 5.61974 19.1508 6.16298 18.4497C6.70623 17.7485 7.00103 16.8867 7.00103 15.9998C7.00103 15.1128 6.70623 14.251 6.16298 13.5498C5.61974 12.8487 4.85886 12.348 4 12.1265Z"
                fill="#9F9F9F"
              ></path>
            </g>{" "}
            <defs>
              <clipPath id="clip0_475_5437">
                <rect width="32" height="32" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
          <h3 className="selticket-text-sm selticket-text-on-primary selticket-font-semibold selticket-mb-8">
            شما تاکنون هیچ بلیتی خریداری نکرده اید
          </h3>
          <p className="selticket-text-xs selticket-text-on-primary-container selticket-mb-12">
            در این صفحه بلیت های فعال و بلیت هایی که قبلا خریده اید به شما نمایش
            داده میشود
          </p>
        </div>
        <div>
          <Link
            to={"/"}
            className="selticket-bg-on-primary selticket-py-2 selticket-px-4 selticket-rounded selticket-text-white"
          >
            خرید بلیت
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrders;
