import { useRef } from 'react'
import { CompreFace } from '@exadel/compreface-js-sdk';
import './App.css';

function App() {
  const videoTag = useRef(null);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const canvas3 = useRef(null);

  const drawFace = (canvasElement, faceData, extraCanvas) => {
    const evt = new Event("next_frame", {"bubbles":true, "cancelable":false});
    document.dispatchEvent(evt);
    let box = faceData.result[0].box;

    canvasElement.clearRect(0, 0, 640, 480);
    extraCanvas.clearRect(0, 0, 640, 480);

    canvasElement.strokeStyle = 'green';
    extraCanvas.strokeStyle = "blue";
    extraCanvas.fillStyle = "white"

    extraCanvas.lineWidth = 5;
    canvasElement.lineWidth = 5;
    
    canvasElement.strokeRect(box.x_min, box.y_min, box.x_max - box.x_min, box.y_max - box.y_min);
    extraCanvas.fillText( Number.parseFloat(box.probability).toPrecision(5) + '  ' + faceData.result[0].gender.value + '  ' + faceData.result[0].age.low + '-' + faceData.result[0].age.high, box.x_min, box.y_min - 10)

  }
  
  const handleVideoStart = () => {
    navigator.mediaDevices.getUserMedia({ video: true})
      .then(stream => videoTag.current.srcObject = stream)
      .catch( error => console.error(error) )

      videoTag.current.addEventListener('play', () => {
        // CompreFace init
        let server = "http://localhost";
        let port = 8000;
        let detection_key = "00000000-0000-0000-0000-000000000003";
  
        let core = new CompreFace(server, port);
        let detection_service = core.initFaceDetectionService(detection_key);
        // end of CompreFace init
  
        let ctx1 = canvas1.current.getContext('2d');
        let ctx2 = canvas2.current.getContext('2d');
        let ctx3 = canvas3.current.getContext("2d");

        document.addEventListener('next_frame', () => {
          ctx1.drawImage(videoTag.current, 0, 0, 640, 480)
          canvas1.current.toBlob( blob => {
            detection_service.detect(blob, {  limit: 1, face_plugins: 'age,gender' })
              .then(res => {
                drawFace(ctx2, res, ctx3)
              })
              .catch(error => console.log(error))
          }, 'image/jpeg', 0.95)
        })

        const evt = new Event("next_frame", {"bubbles":true, "cancelable":false});
			  document.dispatchEvent(evt);
      })
  } 

  return (
    <div className="App">
      <header className="App-header">
        <video ref={videoTag} width="640" height="480" autoPlay muted ></video>
        <canvas ref={canvas1} width="640" id="canvas" height="480" style={{ display: 'none' }}></canvas>
	      <canvas ref={canvas2} width="640" id="canvas2" height="480" style={{ position: 'absolute' }} ></canvas>
        <canvas ref={canvas3} width="640" height="480" style={{ position: 'absolute' }}></canvas>

        <div>
          <button onClick={handleVideoStart} >Start video</button>
        </div>

      </header>
    </div>
  );
}

export default App;
