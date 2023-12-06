import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MonetizationOn } from '@mui/icons-material';
import { useState, useRef, useMemo, useEffect } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
    Constants,
} from "@videosdk.live/react-sdk";
import { useStore } from '../../app/stores/store';
import { authToken, createRoom } from '../../../../Api/videoToken';
import ReactPlayer from "react-player";

//highligh-start
//importing hls.js
import Hls from "hls.js";
//highligh-end


function ViewerView() {
    // States to store downstream url and current HLS state
    const playerRef = useRef<HTMLVideoElement>(null);
    //Getting the hlsUrls
    const { hlsUrls, hlsState } = useMeeting();

    //Playing the HLS stream when the downstreamUrl is present and it is playable
    useEffect(() => {
        if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    maxLoadingDelay: 1, // max video loading delay used in automatic start level selection
                    defaultAudioCodec: "mp4a.40.2", // default audio codec
                    maxBufferLength: 0, // If buffer length is/become less than this value, a new fragment will be loaded
                    maxMaxBufferLength: 1, // Hls.js will never exceed this value
                    startLevel: 0, // Start playback at the lowest quality level
                    startPosition: -1, // set -1 playback will start from intialtime = 0
                    maxBufferHole: 0.001, // 'Maximum' inter-fragment buffer hole tolerance that hls.js can cope with when searching for the next fragment to load.
                    highBufferWatchdogPeriod: 0, // if media element is expected to play and if currentTime has not moved for more than highBufferWatchdogPeriod and if there are more than maxBufferHole seconds buffered upfront, hls.js will jump buffer gaps, or try to nudge playhead to recover playback.
                    nudgeOffset: 0.05, // In case playback continues to stall after first playhead nudging, currentTime will be nudged evenmore following nudgeOffset to try to restore playback. media.currentTime += (nb nudge retry -1)*nudgeOffset
                    nudgeMaxRetry: 1, // Max nb of nudge retries before hls.js raise a fatal BUFFER_STALLED_ERROR
                    maxFragLookUpTolerance: .1, // This tolerance factor is used during fragment lookup. 
                    liveSyncDurationCount: 1, // if set to 3, playback will start from fragment N-3, N being the last fragment of the live playlist
                    abrEwmaFastLive: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
                    abrEwmaSlowLive: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
                    abrEwmaFastVoD: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
                    abrEwmaSlowVoD: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
                    maxStarvationDelay: 1, // ABR algorithm will always try to choose a quality level that should avoid rebuffering
                });

                const player = document.querySelector("#hlsPlayer");

                hls.loadSource(hlsUrls.downstreamUrl);
                hls.attachMedia(player as HTMLMediaElement);
            } else {
                if (typeof playerRef.current?.play === "function") {
                    playerRef.current.src = hlsUrls.downstreamUrl;
                    playerRef.current.play();
                }
            }
        }
    }, [hlsUrls, hlsState, playerRef.current]);

    return (
        <div>
            {/* Showing message if HLS is not started or is stopped by HOST */}
            {hlsState != "HLS_PLAYABLE" ? (
                <div>
                    <p>HLS has not started yet or is stopped</p>
                </div>
            ) : (
                hlsState == "HLS_PLAYABLE" && (
                    <div>
                        <video
                            ref={playerRef}
                            id="hlsPlayer"
                            autoPlay={true}
                            controls
                            style={{ width: "100%", height: "100%" }}
                            playsInline
                            muted={true}
                            onError={(err) => {
                                console.log(err, "hls video error");
                            }}
                        ></video>
                    </div>
                )
            )}
        </div>
    );
}

function JoinScreen({ getMeetingAndToken, setMode }: { getMeetingAndToken: (id: string) => void; setMode: (mode: string) => void }) {
    var [meetingId, setMeetingId] = useState("");
    //Set the mode of joining participant and set the meeting id or generate new one
    const onClick = async (mode: string) => {
        setMode(mode);
        await getMeetingAndToken(meetingId);
    };
    
    const startLiveStream = async () => {
        const testID= "5xu2-a5zr-qra5";
        await getMeetingAndToken(testID); // Assuming a new meeting ID should be created
    };
    return (
        <div className="container">
            <button onClick={startLiveStream}>Start LiveStream</button>
            <br />
            <br />
            {" or "}
            <br />
            <br />
            <input
                type="text"
                placeholder="Enter LiveStream Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <br />
            <br />
            <button onClick={() => onClick("CONFERENCE")}>Join as Host</button>
            {" | "}
            <button onClick={() => onClick("VIEWER")}>Join as Viewer</button>
        </div>
    );
}

function Controls() {
    const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
    return (
        <div>
            <button onClick={() => leave()}>Leave</button>
            &emsp;|&emsp;
            <button onClick={() => toggleMic()}>toggleMic</button>
            <button onClick={() => toggleWebcam()}>toggleWebcam</button>
            &emsp;|&emsp;
            <button
                onClick={() => {
                    //We will start the HLS in SPOTLIGHT mode and PIN as
                    //priority so only speakers are visible in the HLS stream
                    startHls({
                        layout: {
                            type: "SPOTLIGHT",
                            priority: "PIN",
                            gridSize: 20,
                        },
                        theme: "LIGHT",
                        mode: "video-and-audio",
                        quality: "high",
                        orientation: "landscape",
                    });
                }}
            >
                Start HLS
            </button>
            <button onClick={() => stopHls()}>Stop HLS</button>
        </div>
    );
}

function SpeakerView() {
    //Get the participants and hlsState from useMeeting
    const { participants, hlsState } = useMeeting();

    //Filtering the host/speakers from all the participants
    const speakers = useMemo(() => {
        const speakerParticipants = [...participants.values()].filter(
            (participant) => {
                return participant.mode == Constants.modes.CONFERENCE;
            }
        );
        return speakerParticipants;
    }, [participants]);
    return (
        <div>
            <p>Current HLS State: {hlsState}</p>
            {/* Controls for the meeting */}
            <Controls />

            {/* Rendring all the HOST participants */}
            {speakers.map((participant) => (
                <ParticipantView participantId={participant.id} key={participant.id} />
            ))}
        </div>
    );
}

function ParticipantView(props: { participantId: string, key: string }) {
    const micRef = useRef(null);
    const { webcamStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    return (
        <div>
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    //
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"300px"}
                    width={"300px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

function Container(props: { meetingId: string; onMeetingLeave: () => void }) {
    const [joined, setJoined] = useState("");
    //Get the method which will be used to join the meeting.
    const { join } = useMeeting();
    const mMeeting = useMeeting({
        //callback for when meeting is joined successfully
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        //callback for when meeting is left
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
        //callback for when there is error in meeting
        onError: (error) => {
            alert(error.message);
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined == "JOINED" ? (
                mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
                    <SpeakerView />
                ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
                    <ViewerView />
                ) : null
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
}


function EventLive() {
    const [meetingId, setMeetingId] = useState(null);
    const [mode, setMode] = useState("CONFERENCE");

    const getMeetingAndToken = async (id: string) => {
        const meetingId =
            id == null ? await createRoom({ token: authToken }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    const theme = useTheme();
    const { eventStore, userStore: { user } } = useStore();
    const { selectedEvent: event } = eventStore;
    return authToken && meetingId ? (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid container item spacing={1}>
                        <Grid item xs={12}>
                            {user?.userName}
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div" >
                                Title: {event?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MeetingProvider
                                config={{
                                    meetingId,
                                    micEnabled: true,
                                    webcamEnabled: true,
                                    name: user!.userName || "John Doe",
                                    mode: mode as "CONFERENCE" | "VIEWER" | undefined,
                                }}
                                token={authToken}
                            >
                                <MeetingConsumer>
                                    {() => (
                                        <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
                                    )}
                                </MeetingConsumer>
                            </MeetingProvider>
                        </Grid>
                    </Grid>


                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                display: 'inline',
                                textDecoration: 'none',
                                fontFamily: 'monospace'
                            }}
                            component="span"
                            variant="h6"
                            color="text.secondary"
                        >
                            Participants
                        </Typography>
                        <Paper
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                padding: theme.spacing(1),
                                fontSize: 16
                            }}
                            elevation={3}
                        >
                            <Typography variant="body1" color="text.secondary">
                                No participants yet!
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            startIcon={<MonetizationOn />}
                            variant='contained'
                            color='primary'
                            sx={{ textTransform: 'none' }}
                        >
                            Donate
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    ) : (
        <Box>
            <Grid container spacing={2}>
                <Grid container item spacing={1}>
                    <Grid item xs={12}>
                        {user?.userName}
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" component="div" >
                            Title: {event?.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}

export default observer(EventLive);
