import Head from "next/head";

const AudioRecord = () => (
    <div>
        <Head>
        <script
			  src="https://code.jquery.com/jquery-3.4.1.js"
			  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
			  crossorigin="anonymous"></script>
            <script src="/audioRecordScript.js"></script>
            <script src="/WebAudioRecorder.js"></script>
              
        </Head>
        <div className="audioRecord">
            <p id="recordingLabel">Audio File Recording:</p>
            <button id="startButton" className = "ssbutton">Start</button>
            <button id="stopButton" className = "ssbutton" disabled>Stop</button>
            <style jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=DM+Sans:400,700&display=swap');
                    .audioRecord {
                        display: flex;
                        flex-direction: row;
                        font-family: 'DM Sans', 'sans-serif';
                    }

                    .ssbutton {
                        margin-left: 1%;
                        padding: 15px;
                        font-size: calc(7.5px + (9.0)*((100vw - 300px) / (1600 - 300)));
                    }

                    #startButton {
                        background: #1c4587;
                        color: #f3f3f3ff;
                    }

                    #stopButton {
                        background: #434343ff;
                        color: #f3f3f3ff;
                    }

                    #recordingLabel{
                        font-size: calc(7.5px + (9.0)*((100vw - 300px) / (1600 - 300)));
                    }
            `}</style>
        </div>
        
        
    </div>
)

export default AudioRecord