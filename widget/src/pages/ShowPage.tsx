import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons"
import ShowSchedules from "../components/schedule/ShowSchedules";
import useAppSelector from "../hooks/store/useAppSelector";
import { selectShow } from "../features/show/show.selectors";

const ShowPage: FC = () => {

    const show = useAppSelector(selectShow)

    return (
        <div className="selticket-flex selticket-items-stretch selticket-flex-col">
            <div className="selticket-flex selticket-justify-start selticket-items-stretch selticket-gap-x-4 selticket-px-4 selticket-py-8 selticket-relative">
                {show.banner && (
                    <img 
                        src={show.banner}
                        className="selticket-w-full selticket-h-full selticket-absolute selticket-top-0 selticket-right-0 selticket-object-cover"
                    />
                )}
                <div className="selticket-bg-[#1d1d1d]  selticket-opacity-70 selticket-w-full selticket-h-full selticket-absolute selticket-top-0 selticket-right-0 selticket-z-10" />
                <img 
                    src={show.image_url}
                    className="selticket-h-40 selticket-rounded selticket-overflow-hidden selticket-z-20"
                />
                <div className="selticket-z-20 selticket-h-40 selticket-box-border selticket-py-2 selticket-flex selticket-flex-col selticket-justify-between">
                    <h1 className="selticket-text-white selticket-font-semibold selticket-text-base selticket-pb-4">
                        {show.title}
                    </h1>
                    <div className="selticket-flex selticket-items-center selticket-gap-x-1">
                        {show.directors.map(director => (
                            <span key={director.id} className="selticket-text-white selticket-text-xs after:selticket-content-['،'] last:after:selticket-content-none">
                                {director.name}
                            </span>
                        ))}
                    </div>
                    <ul className="selticket-flex selticket-items-center selticket-gap-x-3">
                        <li className="selticket-flex selticket-items-center selticket-gap-x-1">
                            {show.genres.map(genre => (
                                <span key={genre.id} className="selticket-text-white selticket-text-xs after:selticket-content-['،'] last:after:selticket-content-none">
                                    {genre.title}
                                </span>
                            ))}
                        </li>
                        {show.duration !== null && (
                            <li className="selticket-flex selticket-items-center selticket-gap-x-1">
                                <FontAwesomeIcon icon={faClock} className="selticket-text-gray-400 selticket-text-xs" />
                                <span className="selticket-text-white selticket-text-xs">
                                    {show.duration} دقیقه
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {show.actors.length > 1 && (
                <div className="selticket-px-4 selticket-pt-6 selticket-pb-10 selticket-bg-primary">
                    <h3 className="selticket-text-on-primary-container selticket-text-sm selticket-font-bold selticket-pb-6">
                        بازیگران
                    </h3>
                    <div className="selticket-flex selticket-gap-2 selticket-flex-wrap">
                        {show.actors.map(actor => (
                            <div key={actor.id} className="selticket-rounded-lg selticket-overflow-hidden selticket-flex selticket-items-center selticket-bg-primary-container selticket-h-8">
                                <img 
                                    src={actor.image_url}
                                    className="selticket-h-8 selticket-w-8 selticket-object-cover"
                                />
                                <span className="selticket-px-2 selticket-text-on-primary selticket-text-xs">
                                    {actor.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="selticket-bg-primary-container selticket-px-6 selticket-rounded-lg selticket-py-5 selticket-flex-grow">
                <h3 className="selticket-text-on-primary-container selticket-text-sm selticket-font-bold selticket-mb-4">
                    انتخاب سینما و سانس
                </h3>
                <ShowSchedules show={show} />
            </div>
        </div>
    )
}

export default ShowPage