import React from 'react';
import { Container, Row ,Col, Image} from 'react-bootstrap';

const UploadedImage = ({ uploadedImage }) => {
    return (
      <>
        <div className="found-images">
          <span>Uploaded image</span>
        </div>
        <Container>
          <Row>
            <Col md={3}>
              <Image src={ uploadedImage } className="full-width-image uploaded-image" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  export default UploadedImage;