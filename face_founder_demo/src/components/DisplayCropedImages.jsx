import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const DisplayCropedImage = ({ personsImage, imageElement, canvasElement }) => {
    return (
        <Container style={{ display: 'none' }}>
            <Row>
                <Col>
                    <canvas width="700" height="850" ref={canvasElement}></canvas>
                </Col>
                <Col>
                    <Image alt="Exadel" rounded  src={ personsImage }  ref={imageElement} />
                </Col>
            </Row>
        </Container>
    )
}

export default DisplayCropedImage;