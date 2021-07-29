import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ percent }) => {
return (
    <div className="progress-bar-boundary">
        <div style={{width:`${percent}%`}}>{percent}%</div>
    </div>
)}

// const ProgressBar = (props) => {
//    const percent = props.percent
//     return <div>ProgressBar</div>
// }

export default ProgressBar;