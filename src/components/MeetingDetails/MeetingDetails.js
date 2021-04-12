import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useObserver } from "mobx-react";
import { useStateStore } from "../../utils/StoreProvider.js";
import { Container } from "@material-ui/core";
import ChatBox from "../ChatBox/ChatBox";
import TranscriptBox from "../../components/TranscriptBox/TranscriptBox";
import useStyles from "./meetingDetailsStyles";
const s3VideoUrl = process.env.REACT_APP_S3_VIDEO_URL;



export const MeetingDetails = ({ startTime }) => {
    const store = useStateStore();
    const classes = useStyles();
    // const startingTimestamp = useRef(props.match.params.timestamp)
    let player = useRef();
    let videoTimestamp = useRef();
    const [media, setMedia] = useState("");



    useEffect(() => {
        console.log("useEffect");
        console.log("🚀 ~ file: MeetingDetails.js ~ line 26 ~ useEffect ~ store.meetingDetails", store.meetingDetails);
        if (store.meetingDetails.videoUrl) {
            console.log("video");
            setMedia(`${s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.mp4`);
        } else if (store.meetingDetails.audioUrl) {
            console.log("audio");
            setMedia(`${s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.m4a`);
        }
        async function startAtTimestamp() {
            if (startTime) player.current.seekTo(startTime, "seconds");
        }
        // function videoProgression() {
        //     setInterval(() => {
        //         videoTimestamp.current = player.current.getCurrentTime();
        //     }, 500)
        // }

        // videoProgression();
        startAtTimestamp();
    }, []);

    const returnVideoTimestamp = () => {
        return videoTimestamp.current;
    };

    const handleChatSeek = (newTimestamp) => {
        player.current.seekTo(newTimestamp, "seconds");
    };

    return useObserver(() =>
        <Container
            maxWidth="xl"
            style={{ display: "flex", justifyItems: "center" }}>
            <div className={classes.root}>
                <div className={classes.playerWrapper}>
                    {media ?
                        <ReactPlayer
                            className={classes.reactPlayer}
                            ref={player}
                            width="100%"
                            height="100%"
                            url={media}
                            controls
                        />
                        : null
                    }
                </div>
                <div className={classes.boxDiv}>
                    {store.meetingDetails.chat_url ?
                        <ChatBox
                            returnVideoTimestamp={returnVideoTimestamp}
                            handleChatSeek={handleChatSeek}
                        />
                        :
                        null
                    }
                    {store.meetingDetails.transcript_url ?
                        <TranscriptBox
                            returnVideoTimestamp={returnVideoTimestamp}
                            handleChatSeek={handleChatSeek}
                        />
                        : null
                    }
                </div>
            </div>
        </Container >
    );
};

export default MeetingDetails;