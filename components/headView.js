import Head from "next/head"
import buttonInstance from "./calibration"

class HeadView extends React.Component {
    constructor(props){
        super(props);
        this.state = {disp:'block', height:'50px', width:'50px', background:'#1c4587', color:'white', position:'absolute', number: 1, left:'600px', top:'100px'};
        this.counter = 5;
        this.leftDists = ['600px', '1200px', '450px', '1400px', '600px', '1200px'];
        this.topDists = ['100px', '325px', '625px'];
    }

    onClick = () => {
        if (this.counter > 1) {
            this.counter--;
        } else if (this.state.number < 6) {
            this.counter = 5;
            var curNumber = this.state.number;
            this.setState({number: curNumber + 1, left: this.leftDists[curNumber], top: this.topDists[Math.floor(curNumber / 2)]});
        } else {
            this.setState({height:'100px', width:'200px', background:'green', color:'black', number: 'Done', left: '850px', top: '350px'});
        }

        if (this.state.number == 'Done') {
            document.getElementById("vidshow").innerHTML = `
                <video id="videoitself" autoplay src="./video.mp4"></video>
            `
            this.setState({disp:'none'});
            this.calcScore();
        }
    }

    calcScore = () => {
        var good = 0;  // number of gazes within bounding box
        var total = 0;  // number of gazes total

        webgazer.setGazeListener(function(data, elapsedTime){
            if (data == null) {
                return;
            }
            if(window.eyeRecord){
                var xprediction = data.x;  // these x coordinates are relative to the viewport
                var yprediction = data.y;  // these y coordinates are relative to the viewport
                
                if (xprediction > 300) {
                    total++;
    
                    // bounding box for gaze
                    if (xprediction > 600 && xprediction < 1000 && yprediction > 100 && yprediction < 500) good++;
                    document.getElementById("eyeContactScore").innerHTML = "Eye contact score: " + good + "/" + total
                }
            }
            
           //console.log("score at " + elapsedTime + " ms: " + (good / total) * 100 + "% (" + good + "/" + total + ")");
        }).begin();
    }

    render() {
        return (
            <div className="headViewer">
                <Head>
                <script
                    src="https://code.jquery.com/jquery-3.4.1.js"
                    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
                    crossorigin="anonymous"></script>
                    <script type="text/javascript" src="/headViewScript.js"></script>
                    <script type="text/javascript" src="/webgazer.js"></script>
                </Head>
                <div id="vidshow">
                    Loading initial animation. Animation loading can take 30 seconds to a 1 minute. Complete the calibration sequence while you wait!
                </div>
                <button onClick={this.onClick} style={{display: this.state.disp, height:this.state.height, width:this.state.height, background:this.state.background, color:this.state.color, position:this.state.position, left:this.state.left, top:this.state.top}}>
                    {this.state.number}
                </button>
                

                <style jsx>{`
                    .headViewer {
                        width: 100%;
                        height: 45%;
                        color: 'yellow';
                    }
                    #vidshow {
                        font-size: calc(9.5px + (9.0)*((100vw - 300px) / (1600 - 300)));
                        font-family: 'DM Sans', 'sans-serif';
                        position: absolute;
                        left: 500px;
                    }
                `}</style>
            </div>
        );
        
    }

}

export default HeadView

