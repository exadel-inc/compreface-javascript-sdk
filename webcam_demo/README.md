# Webcam Demo

In this documentation we show how to use our detection service with webcamera. **NOTE:** we have chosen reactjs as it is today's one of the most popular UI library.

1. Clone our repository
2. Enter to ```webcam_demo``` folder and install packages

``` cd webcam_demo```

```npm install```

3. Change detection API key inside ```src > App.js``` line ```40```

4. Start project

```npm start```

5. Click ```video start``` button to start your webcamera 

*OR follow below instructions to create project by yourself*

1. Install reactjs

```npx create-react-app compreface-demo```

2. Enter to project folder

```cd compreface-demo```

3. Install CompreFace SDK

```npm i @exadel/compreface-js-sdk```

4. Create your component and copy/past following code. NOTE: We have used functional component and video tag used to connect to your webcamera and canvas tags used for drawing square and some extra data.

```
import { useRef } from 'react'
import { CompreFace } from '@exadel/compreface-js-sdk';

function App() {
  const videoTag = useRef(null);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const canvas3 = useRef(null);
  
  const handleVideoStart = () => {
    console.log("Click is working")
  } 

  return (
    <div>
        <video ref={videoTag} width="640" height="480" autoPlay muted ></video>
        <canvas ref={canvas1} width="640" id="canvas" height="480" style={{ display: 'none' }}></canvas>
	      <canvas ref={canvas2} width="640" id="canvas2" height="480" style={{ position: 'absolute' }} ></canvas>
        <canvas ref={canvas3} width="640" height="480" style={{ position: 'absolute' }}></canvas>

        <div>
          <button onClick={handleVideoStart}>Start video</button>
        </div>
    </div>
  );
}

export default App;
```

5. Add ability to start webcamera when user clicks "Start video" button. Put following code into ```handleVideoStart()``` function. ```Navigator.mediaDevices``` is built in read-only property of browser which enables user to access webcamera.

```
 navigator.mediaDevices.getUserMedia({ video: true})
    .then(stream => videoTag.current.srcObject = stream)
    .catch( error => console.error(error) )
```

6. Initialize CompreFace instances and catch video event which fired when webcamera starts working. Your code should look like as following example. ```Play``` event listener fires when webcamera starts working and this is place where we need to use CompreFace SDK. NOTE: ```next_frame``` custom event created in order to create kind of recursion effect when we drawing square on face.
```
import { useRef } from 'react'
import { CompreFace } from '@exadel/compreface-js-sdk';

function App() {
  const videoTag = useRef(null);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const canvas3 = useRef(null);
  
  const handleVideoStart = () => {
    navigator.mediaDevices.getUserMedia({ video: true})
      .then(stream => videoTag.current.srcObject = stream)
      .catch( error => console.error(error) )

      videoTag.current.addEventListener('play', () => {
        // CompreFace init
        let server = "http://localhost";
        let port = 8000;
        let detection_key = "your_api_key_for_detection_service";
  
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
                /**

                  We need call draw function which draws square on face of user in front of webcamera

                */
              })
              .catch(error => console.log(error))
          }, 'image/jpeg', 0.95)
        })

        const evt = new Event("next_frame", {"bubbles":true, "cancelable":false});
			  document.dispatchEvent(evt);
      })
  } 

  return (
    <div>
        <video ref={videoTag} width="640" height="480" autoPlay muted ></video>
        <canvas ref={canvas1} width="640" id="canvas" height="480" style={{ display: 'none' }}></canvas>
	      <canvas ref={canvas2} width="640" id="canvas2" height="480" style={{ position: 'absolute' }} ></canvas>
        <canvas ref={canvas3} width="640" height="480" style={{ position: 'absolute' }}></canvas>

        <div>
          <button onClick={handleVideoStart}>Start video</button>
        </div>
    </div>
  );
}

export default App;
```

7. Add draw function. NOTE: You can extra canvas elemets which shows extra info related to detected face.

```
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
    extraCanvas.fillText( Number.parseFloat(box.probability).toPrecision(5) + '  ' + faceData.result[0].gender + '  ' + faceData.result[0].age[0] + '-' + faceData.result[0].age[1], box.x_min, box.y_min - 10)
  }
```

8. Final code should look like this.

```
import { useRef } from 'react'
import { CompreFace } from '@exadel/compreface-js-sdk';

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
    extraCanvas.fillText( Number.parseFloat(box.probability).toPrecision(5) + '  ' + faceData.result[0].gender + '  ' + faceData.result[0].age[0] + '-' + faceData.result[0].age[1], box.x_min, box.y_min - 10)
  }

  const handleVideoStart = () => {
    navigator.mediaDevices.getUserMedia({ video: true})
      .then(stream => videoTag.current.srcObject = stream)
      .catch( error => console.error(error) )

      videoTag.current.addEventListener('play', () => {
        // CompreFace init
        let server = "http://localhost";
        let port = 8000;
        let detection_key = "your_api_key_for_detection_service";
  
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
    <div>
        <video ref={videoTag} width="640" height="480" autoPlay muted ></video>
        <canvas ref={canvas1} width="640" id="canvas" height="480" style={{ display: 'none' }}></canvas>
	      <canvas ref={canvas2} width="640" id="canvas2" height="480" style={{ position: 'absolute' }} ></canvas>
        <canvas ref={canvas3} width="640" height="480" style={{ position: 'absolute' }}></canvas>

        <div>
          <button onClick={handleVideoStart}>Start video</button>
        </div>
    </div>
  );
}

export default App;
```
