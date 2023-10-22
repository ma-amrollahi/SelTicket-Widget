import { FC, ReactNode } from "react";

type ICardProps = {
    children: ReactNode,
    customClass? :string
}
const Card: FC<ICardProps> = props => {
    return (
        <div className={`selticket-bg-primary-container selticket-p-6 selticket-pb-12 selticket-rounded selticket-shadow ${props?.customClass ?? ''}`}>
            {props.children}
        </div>
    )
}

export default Card