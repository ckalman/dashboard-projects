import React, { Component } from 'react';


function renderDropDownList(data, display, match) {
    return data.map((obj, index) =>
        <option key={index} selected={match(obj, index)} value={index}>{display(obj)}</option>
    );
}

export default renderDropDownList;