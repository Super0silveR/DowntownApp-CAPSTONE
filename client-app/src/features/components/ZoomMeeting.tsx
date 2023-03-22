import React, { useEffect } from 'react';

import { ZoomMtg } from '@zoomus/websdk';

const ZoomMeeting = ({ apiKey, apiSecret, meetingNumber, displayName }: { apiKey: string, apiSecret: string, meetingNumber: string, displayName: string }) => {
  useEffect(() => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    ZoomMtg.init({
      leaveUrl: 'http://localhost:3000',
      isSupportAV: true,
      success: function() {
        ZoomMtg.join({
          apiKey,
          apiSecret,
          meetingNumber,
          userName: displayName,
          passWord: '',
          success: function() {
            console.log('Zoom meeting joined successfully.');
          },
          error: function(res: any) {
            console.log(res);
          }
        });
      },
      error: function(res: any) {
        console.log(res);
      }
    });
  }, []);

  return (
    <div className="zoom-meeting-container">
      <div className="zoom-meeting-wrapper">
        <div id="zmmtg-root"></div>
      </div>
    </div>
  );
};

export default ZoomMeeting;
