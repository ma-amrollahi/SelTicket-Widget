import React, {FC, useEffect} from "react";

type AlertProps = {
    type: 'error' | 'success' | 'warning' | 'info',
    message: string
}
const Alert: FC<AlertProps> = props => {
    const [show, setShow] = React.useState<boolean>(false)

    useEffect(() => {
        setShow(true)
        const time = setTimeout(() => {
            setShow(false)
        }, 4000, 'slow')

        return () => clearTimeout(time)
    }, [])

    return (
        <>
            {show &&
                <div className={"selticket-fixed selticket-bottom-0 selticket-right-0 selticket-left-0 selticket-text-center selticket-bg-red-600 transition-opacity ease-in duration-700 opacity-100 selticket-p-4 selticket-mx-4 selticket-mb-8 selticket-rounded-lg selticket-text-white selticket-text-xs selticket-z-50 selticket-shadow"}>
                    <div>{props?.message}</div>
                </div>
            }
        </>
    )
}

export default Alert