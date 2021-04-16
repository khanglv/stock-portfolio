import { props } from "ramda";
import React, { useState } from "react";
import { css } from 'emotion';

const CSS$ = css`
    .header {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #333333;
    }
    textarea {
        resize: none;
        background: #FFFFFF;
        border: 1px solid #E6EBF4;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 14px;
        width: 100%;
        padding: 5px;
        margin: 5px 0;
        line-height: 16px;
        color: #333333;
    }
`;
export const WrongData = (props) => {
    console.log(props)
    return (
        <div className={CSS$}>
            <div className="header">
                <span>Thông tin sai</span>
            </div>
            <textarea rows={7} disabled value={props.notes.notes}>
            </textarea>
        </div>
    )
}