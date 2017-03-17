import React, { Component } from 'react';


function renderDropDownList(data, display, match) {
    if (data) {
        return data.map((obj, index) =>
            <option key={index} selected={match(obj, index)} value={index}>{display(obj)}</option>
        );
    }else{
        return '';
    }

}

export default renderDropDownList;