import { useEffect, useRef } from "react";

const SprintAudio = props =>{
    const audioPlayer = useRef(null);

    useEffect(() => {
        sayWord();
      }, [props.mainWord]);
    
    const sayWord = () => {
        const apiUrl = "https://rslang-server-2021.herokuapp.com";
        const soundUrl = `${apiUrl}/${props.mainWord.audio}`;

        audioPlayer.current.src = soundUrl;
        audioPlayer.current.autoPlay = true;

        setTimeout(() => {
            audioPlayer.current.play();
        }, 500);
    }
    

    return (
        <>
            <audio ref={audioPlayer} />
        </>
    )
}

export default SprintAudio;