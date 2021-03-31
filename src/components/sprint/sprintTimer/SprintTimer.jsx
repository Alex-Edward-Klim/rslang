import { useEffect, useState } from "react";

const SprintTimer = (props) =>{
    const [time, setTime] = useState(60);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (time === 0) {
                props.setIsTimeUp(true);
            } else {
                setTime(time - 1)
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [time])

    return (
        <div className="sprint__header__timer">
            <span>{time}</span>
        </div>
    )
}

export default SprintTimer;