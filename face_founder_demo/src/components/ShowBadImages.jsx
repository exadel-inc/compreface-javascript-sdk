import React from 'react';

const ShowBadImages = props => {
    const { data, badTitle } = props;
    return (
        <div>
            <label className="bigText">{badTitle}</label>
            <ul>
                {data.map( (fileName, index) => (
                    <li key={index}> {fileName} </li>))}
            </ul>
        </div> 
    )
}

export default ShowBadImages;