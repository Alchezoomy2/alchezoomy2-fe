import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useObserver } from "mobx-react";
import { useStateStore } from "../../../utils/StoreProvider.js";
import { Paper } from "@material-ui/core";
import ChatBox from "../ChatBox/ChatBox";
import TranscriptBox from "../TranscriptBox/TranscriptBox";
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
        if (store.meetingDetails.videoUrl !== "") {
            setMedia(`${s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.mp4`);
        } else if (store.meetingDetails.audioUrl !== "") {
            setMedia(`${s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.m4a`);
        }

        setTimeout(() => player.current.seekTo(startTime, "seconds"), 500);

    }, []);


    const returnVideoTimestamp = () => {
        return videoTimestamp.current;
    };

    const handleChatSeek = (newTimestamp) => {
        player.current.seekTo(newTimestamp, "seconds");
    };

    return useObserver(() =>
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
                    <div className={classes.bigContainer}>
                        <div
                            className={classes.playerWrapper}>
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
                        <div className={classes.boxContainer}>
                            {store.meetingDetails.transcript_url ?
                                <TranscriptBox
                                    returnVideoTimestamp={returnVideoTimestamp}
                                    handleChatSeek={handleChatSeek}
                                />
                                : null
                            }
                            {store.meetingDetails.chat_url ?
                                <ChatBox
                                    returnVideoTimestamp={returnVideoTimestamp}
                                    handleChatSeek={handleChatSeek}
                                />
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </Paper>
        </div >
    );
};

export default MeetingDetails;