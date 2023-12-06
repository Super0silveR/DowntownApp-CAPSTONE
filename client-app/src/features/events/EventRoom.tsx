import '@livekit/components-styles';
import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from '@livekit/components-react';
import { observer } from 'mobx-react-lite';

const serverUrl = 'wss://downtown-1u9c02rc.livekit.cloud';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE5NjczMDksImlzcyI6IkFQSVJwN2Q0YkJKTUhMUCIsIm5iZiI6MTcwMTg4MDkwOSwic3ViIjoicXVpY2tzdGFydCB1c2VyIHpkdjZrcSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.y8bjZir5LUzjhOHifpW8PtS0PDPL4C0vj6lx99okgZU';

function EventRoom() {
        return (
            <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={serverUrl}
                // Use the default LiveKit theme for nice styles.
                data-lk-theme="default"
                style={{ height: '90vh' }}
            >
                {/* Your custom component with basic video conferencing functionality. */}
                <VideoConference />
                {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
                <RoomAudioRenderer />
            </LiveKitRoom>
        );
    }

export default observer(EventRoom);