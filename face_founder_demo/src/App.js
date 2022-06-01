import { CompreFace } from '@exadel/compreface-js-sdk';
import './custom.css';
import { useState, useRef, useEffect } from 'react';
import { Container, Row, Form, Col, ProgressBar, Spinner } from 'react-bootstrap';
import UploadedImage from './components/UploadedImge';
import DisplayFoundImages from './components/DisplayFoundImages';
import DisplayCropedImage from './components/DisplayCropedImages';
import { confirmAlert } from 'react-confirm-alert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ShowBadImages from './components/ShowBadImages';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  const [ personsImage, setPersonsImage ] = useState(null);
  const [ imageFolder, setImageFolder ] = useState(null);
  const [ uploadedImage, setUploadedImage ] = useState(null);
  const [ foundFaces, setFoundFaces ] = useState([]);
  const [ counter, setCounter ] = useState(0);
  const [ recognitionKey, setRecognitionKey ] = useState(null);
  const [ detectionKey, setDetectionKey ] = useState(null);
  const [ rate, setRate ] = useState(90);
  const [ fullData, setFullData ] = useState(null)
  const [ similarityRate, setSimilarityRate ] = useState([])
  const [ recognitionError, setRecognitionError ] = useState(false);
  const [ recError, setRecError ] = useState([]);
  const [ detError, setDetError ] = useState([]);
  const [ showInvalidFiles, setVisibilityInvalidFiles ] = useState(false);
  const [ bigImage, setBigImages ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(imageFolder !== null) {
      findImages();
    }
  }, [imageFolder]);

  const canvasElement = useRef(null);
  const imageElement = useRef(null);

  let server = "http://localhost";
  let port = 8000;

  let core = new CompreFace(server, port);

  let recognitionService = core.initFaceRecognitionService(recognitionKey);
  let faceCollection = recognitionService.getFaceCollection();
  let detectionService = core.initFaceDetectionService(detectionKey)

  const removeDublicates = (array) =>{
    let tempArray = [];
    let saveDublicate = [];

    for(let i = 0; i < array.length; i++){
        if(!saveDublicate.includes(array[i].subject)) tempArray.push([array[i].subject, array[i].similarity])

        saveDublicate.push(array[i].subject)
    }

    return tempArray;
  }

  const onRecognitionKeyChange = e => {
    setRecognitionKey(e.target.value)
  }

  const onDetectionKeyChange = e => {
    setDetectionKey(e.target.value)
  }

  const onChangePersonPhoto = e => {
    if(e.target.files[0]){
      setLoading(true)
      setFoundFaces([]);
      setCounter(0)
      setRecError(prevArray => [...new Set(prevArray)])
      setVisibilityInvalidFiles(true);

      const reader = new FileReader();
      reader.onload = myEvent => {
        setUploadedImage( myEvent.target.result )
        let sendata = myEvent.target.result.split(',')[1];

        recognitionService.recognize(sendata, {limit:10, prediction_count: 100, face_plugins: "age,gender"})
          .then(res => {
            setLoading(false)
            setFullData(res.result[0].subjects);
            let filtered = res.result[0].subjects.filter(subobj => subobj.similarity * 100 >= rate)
            let tmp = removeDublicates(filtered)

            setSimilarityRate(tmp)
            setRecognitionError(true)

            tmp.forEach(subject => {
              for(let i = 0; i < Object.values(imageFolder).length; i++){
                  if(subject[0] === imageFolder[i]['name']) setFoundFaces(oldFaces => [...oldFaces, imageFolder[i]])
              }
            })
          })
          .catch(error => {
            setRecognitionError(false)
            setLoading(false)
            NotificationManager.error("No face found in given image", "Error", 3000)
          })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onRateChanges = e => {
    let number = e.target.value;
    setFoundFaces([]);
    setRate(number);

    let filtered = fullData.filter(subobj => subobj.similarity * 100 >= number);
    let tmp = removeDublicates(filtered)
    setSimilarityRate(tmp)

    tmp.forEach(subject => {
      for(let i = 0; i < Object.values(imageFolder).length; i++ ){
        if(subject[0] === imageFolder[i]['name']) setFoundFaces(oldFaces => [...oldFaces, imageFolder[i]])
      }
    })
  }

  const onChangeImageFolder = event => {
    setRate(90)
    setCounter(0)
    setFoundFaces([])
    setImageFolder(event.target.files)
  }

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve({ base64: reader.result, fileName: file.name });
      reader.onerror = error => reject(error);
    });
  }

  const drawFace = (ctx, aface, index, fileName, lengthOfDetectedFaces, callback, itaration) => {
    ctx.drawImage(imageElement.current, aface.box.x_min, aface.box.y_min, aface.box.x_max - aface.box.x_min, aface.box.y_max - aface.box.y_min, 0, 0, aface.box.x_max - aface.box.x_min, aface.box.y_max - aface.box.y_min);

    canvasElement.current.toBlob( blob => {
      faceCollection.add(blob, fileName)
        .then(data => {
          if(lengthOfDetectedFaces === index + 1){
            itaration++;
            setCounter(itaration);
            callback(itaration)
            ctx.clearRect(0, 0, 700, 850);
          }
        })
        .catch(error => {
          setRecError(prevArray => [...prevArray, fileName]);
          if(lengthOfDetectedFaces === index + 1){
            confirmAlert({
              title: 'Recognition error',
              message: `Face not found in ${fileName}`,
              buttons: [
                {
                  label: 'OK',
                  onClick: () => {
                    itaration++;
                    setCounter(itaration);
                    callback(itaration);
                    ctx.clearRect(0, 0, 700, 850);

                  }
                }
              ],
              closeOnClickOutside: false,
              closeOnEscape: false
            });
          }
        })
    }, 'image/jpeg', 0.95)
  }

  const findImages = e => {
    setDetError([]);
    setRecError([]);
    setVisibilityInvalidFiles(false);

    let internalCounter = 0;

    const uploadRecursivley = (intarator) => {
      // stop processing at the end of file
      if(!imageFolder.item(intarator)){
        NotificationManager.success("Compeleted!", "Image processing completed!", 3000)
        return null;
      }

      // check size of image
      if(imageFolder.item(intarator).size < 5000000){
        // get base64 format of image
        getBase64(imageFolder.item(intarator))
          .then(customData => {
            setPersonsImage(customData.base64)
            let sendata = customData.base64.split(',')[1];
            let ctx = canvasElement.current.getContext('2d');

            detectionService.detect(sendata)
              .then(res => {
                res.result.forEach((aface, index) => {
                  drawFace(ctx, aface, index, customData.fileName, res.result.length, uploadRecursivley, intarator)
                })
              })
              .catch(error => {
                setDetError(prevArray => [...prevArray, customData.fileName])
                confirmAlert({
                  title: 'Detection error',
                  message: `Face not found in ${customData.fileName}`,
                  buttons: [
                    {
                      label: 'OK',
                      onClick: () => {
                        intarator++;
                        setCounter(intarator);
                        uploadRecursivley(intarator)
                      }
                    }
                  ],
                  closeOnClickOutside: false,
                  closeOnEscape: false
                });
              })
            })
            .catch(error => console.log(error))
      }else {
        setBigImages(prevArray => [...prevArray, imageFolder.item(intarator).name])
        intarator++;
        setCounter(intarator)
        uploadRecursivley(intarator);
      }
    }

    uploadRecursivley(internalCounter)
  }

  return (
    <Container className="custom-container" fluid>
      <Form className="custom-form">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Recognition key</Form.Label>
              <Form.Control onChange={onRecognitionKeyChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Detection key</Form.Label>
              <Form.Control onChange={onDetectionKeyChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
            <Col>
              <Form.File label="Select folder of images" custom onChange={onChangeImageFolder} webkitdirectory="true" mozdirectory="true" />
            </Col>
            <Col>
              <Form.File label="Select person's image" custom disabled = { (imageFolder && recognitionKey && detectionKey) ? false : true }  onChange={onChangePersonPhoto} />
            </Col>
        </Row>
        <Row className="marginTop-15">
          <Col>
            <Form.Group>
              <Form.Label>Similarity rate is {rate}%</Form.Label>
              <Form.Control  disabled={ recognitionError ? false: true } value={rate} onChange={onRateChanges} type="range" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col md={3}>
          { uploadedImage && <UploadedImage uploadedImage = { uploadedImage } />}
          { showInvalidFiles && <div>
            { recError.length && <ShowBadImages data={recError} badTitle="Recognition error occured in" />}
            { detError.length && <ShowBadImages data={detError} badTitle="Detection error occured in" />}
            { bigImage.length && <ShowBadImages data={bigImage} badTitle="Oversized images" />}
          </div> }
        </Col>
        <Col md={9}>
          { loading &&  <div style={{ margin: "20px auto" }} >
            <Spinner animation="grow" >
              <span style={{ marginLeft: "45px" }} >Loading...</span>
            </Spinner>
          </div>}

          { foundFaces.length > 0 && <DisplayFoundImages foundFaces = { foundFaces } similarityRate = { similarityRate } /> }
        </Col>
      </Row>
      { counter > 0 && <Row className="marginTop-15">
        <Col md={12} >
           <ProgressBar animated now={ ((counter + 1)/Object.values(imageFolder).length) * 100 } />
          { counter === Object.values(imageFolder).length ? <div>
            <span>Done you can select persons image</span>
          </div> : <div> <span>Processing images</span> </div>}
        </Col>
      </Row>}
      <Row> { personsImage && <DisplayCropedImage personsImage = { personsImage } imageElement = { imageElement } canvasElement = { canvasElement } />} </Row>
      <NotificationContainer/>
    </Container>
  );
}

export default App;
