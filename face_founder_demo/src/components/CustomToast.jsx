import React from 'react';
import { Toast } from 'react-bootstrap';

const CustomToast = ({ errorType, errorName, imageName }) => {
    return (
        <Toast>
            <Toast.Header>
                <strong className="me-auto">{errorType}</strong>
            </Toast.Header>
            <Toast.Body>
                {imageName}
                <div>
                    <small className="text-muted">{errorName}</small>
                </div>
            </Toast.Body>
        </Toast>
    )
}

export default CustomToast;


// onClose={ () => { setDetectionError(detectionError.splice(index, 0, undefined)) }}