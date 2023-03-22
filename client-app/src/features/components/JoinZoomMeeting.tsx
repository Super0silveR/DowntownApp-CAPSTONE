import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZoomMeeting from './ZoomMeeting';
import { Zoom } from '@mui/material';


const JoinZoomMeeting = () => {
  const [zoomCredentials, setZoomCredentials] = useState<any>(null);

  useEffect(() => {
    const getZoomCredentials = async () => {
      const response = await axios.get('/zoom');
      setZoomCredentials(response.data);
    };

    getZoomCredentials();
  }, []);

  const handleJoinMeeting = () => {
    console.log('Joining Zoom meeting...');
    // Call ZoomMeeting function with credentials 
  };

  return (
    <div>
      {zoomCredentials ? (
        <div>
          <h1>Join Zoom Meeting</h1>
          <button onClick={handleJoinMeeting}>Join Meeting</button>
          <ZoomMeeting {...zoomCredentials} />
        </div>
      ) : (
        <p>Loading Zoom meeting credentials...</p>
      )}
    </div>
  );
};

export default JoinZoomMeeting;
