import React from 'react';

const Error = ({message}) => {
    return (
        <div className='h-[50vh] flex justify-center items-center'>
            <p>{message}</p>
        </div>
    );
};

export default Error;