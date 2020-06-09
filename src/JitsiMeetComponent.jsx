import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';

function JitsiMeetComponent() {
const [loading, setLoading] = useState(true);
const containerStyle = {
    width: '800px',
    height: '400px',
};

const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
}

function startConference() {
    try {
        //const domain = 'meet.jit.si';
        const domain = 'localhost:8080';
        const options = {
            roomName: 'Poojac_Meeting',
            height: 500,
            parentNode: document.getElementById('jitsi-container'),
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                     'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'e2ee', 'security'
                ],
                RANDOM_AVATAR_URL_PREFIX: true,
                RANDOM_AVATAR_URL_SUFFIX: false,
                FILM_STRIP_MAX_HEIGHT: 200,
                MOBILE_APP_PROMO: false,
                DEFAULT_BACKGROUND: '#ebe134'
            },
            configOverwrite: {
                disableSimulcast: false,
                transcribingEnabled: true,
            },
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBvb2phIENob2xlcmEiLCJpYXQiOjE1MTYyMzkwMjJ9.E_g2EVeSH-MgKGDcngvx8njWVQMmq5P1F9mmAaWWnho',

        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.addEventListener('videoConferenceJoined', () => {
            console.log('Local User Joined');
            setLoading(false);
            api.executeCommand('displayName', 'Pooja Cholera');
            api.executeCommand('password', 'pooja@1234');
            api.executeCommand('subject', 'Say Hi to Pooja here');
        });
    } catch (error) {
        console.error('Failed to load Jitsi API', error);
    }
}

useEffect(() => {
    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI) startConference();
    else alert('Jitsi Meet API script not loaded');
}, []);

return (
    <div
        style={containerStyle}
    >
        <h1>Jitsi meet</h1>
        {loading && <ProgressComponent />}
        <div
            id="jitsi-container"
            style={jitsiContainerStyle}
        />
        <footer>
            Using Jitsi
        </footer>
    </div>
);
}
export default JitsiMeetComponent;
