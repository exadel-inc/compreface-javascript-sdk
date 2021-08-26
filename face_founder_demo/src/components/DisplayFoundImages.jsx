import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../custom.css';

const DisplayFoundImages = ({ foundFaces, similarityRate }) => {
    return (
      <>
        <div className="found-images">
          <span>Matched image(s)</span>
        </div>
        <Container>
          <Row>
            { foundFaces.map((faceFile, index) => <Col key={index} md={3}>
              <div className="marginTop-15 found-images-container">{similarityRate[index][1]}</div>
              <Image className="custom-image" src={URL.createObjectURL(faceFile)} />
            </Col> ) }
          </Row>
        </Container>
      </>
    )
}

export default DisplayFoundImages;