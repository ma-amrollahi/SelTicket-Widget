import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Loader: FC<Omit<FontAwesomeIconProps, "icon">> = ({
    className,
    ...props
}) => {
    return (
        <FontAwesomeIcon 
            icon={faSpinner} 
            className={"selticket-animate-spin selticket-text-secondary " + className}
            size="2xl"
            {...props}
        />
    )
}

export default Loader