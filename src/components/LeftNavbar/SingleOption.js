import React from 'react';

const SingleOption = props => {

    const { value } = props;

    return(

        <div className="input-group">
            <div className="input-group-prepend">
                <input type="text" value={value} disabled/>
            </div>
            <div className="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" id={value} />
            </div>
        </div>

    )

};

export default SingleOption;