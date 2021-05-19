import React, { useState, useEffect } from "react";

import { Cervical, Thoracic, Lumbar, Sacrum } from "./SpineHelper";

import "./Panel.css";

export default function PanelLeft(props) {
    const initialSelection = [
        ...Cervical.vertebrae,
        ...Thoracic.vertebrae,
        ...Lumbar.vertebrae,
        "sacrum",
    ].reduce((selection, item) => {
        selection[item] = false;
        return selection;
    }, {});

    const [selectedVertebrae, setSelectedVertebrae] = useState(
        initialSelection
    );

    const [selectedSummary, setSelectedSummary] = useState(
        ''
    );

    const [selectedCervicals, setSelectedCervicals] = useState(
        0
    );

    // Create DOM elements for the vertebrae lists – @todo refactor to make the code less repetitive
    const cervicalVertebrae = Cervical.vertebrae.map((name, i) => (
        <li key={`c${i}`} className="lists">
            <label>
                {name}
                <input
                    type="checkbox"
                    name={name}
                    value="1"
                    checked={selectedVertebrae[name]}
                    onChange={() => {
                        const newSelection = {
                            ...selectedVertebrae,
                            [name]: !selectedVertebrae[name],
                        };
                        setSelectedVertebrae(newSelection);
                        if (props.onSelectVertebrae)
                            props.onSelectVertebrae(newSelection);
                    }}
                />
            </label>
        </li>
    ));
    const thoracicVertebrae = Thoracic.vertebrae.map((name, i) => (
        <li key={`t${i}`} className="lists">
            <label>
                {name}{" "}
                <input
                    type="checkbox"
                    name={name}
                    value="1"
                    checked={selectedVertebrae[name]}
                    onChange={() => {
                        const newSelection = {
                            ...selectedVertebrae,
                            [name]: !selectedVertebrae[name],
                        };
                        setSelectedVertebrae(newSelection);
                        if (props.onSelectVertebrae)
                            props.onSelectVertebrae(newSelection);
                    }}
                />
            </label>
        </li>
    ));
    const lumbarVertebrae = Lumbar.vertebrae.map((name, i) => (
        <li key={`l${i}`} className="lists">
            <label>
                {name}{" "}
                <input
                    type="checkbox"
                    name={name}
                    value="1"
                    checked={selectedVertebrae[name]}
                    onChange={() => {
                        const newSelection = {
                            ...selectedVertebrae,
                            [name]: !selectedVertebrae[name],
                        };
                        setSelectedVertebrae(newSelection);
                        if (props.onSelectVertebrae)
                            props.onSelectVertebrae(newSelection);
                    }}
                />
            </label>
        </li>
    ));

     function setSummary(sel){
         setSelectedSummary(sel);
    }

    function countCervicals(zone){
        let keys = Object.keys(selectedVertebrae);
        let count = 0;
        keys.forEach(key => {
            if(key[0] === zone){
                if(selectedVertebrae[key] === true){
                    count++
                }
            }

        })

        //setSelectedCervicals(count);
        //return setSelectedCervicals(count);
    }
/*
    useEffect((zone) => {
        let keys = Object.keys(selectedVertebrae);
        let count = 0;
        keys.forEach(key => {
            if(key[0] === zone){
                if(selectedVertebrae[key] === true){
                    count++
                }
            }

        })

        return count;

    })*/
/*
    function changeC(){
        let keys = Object.keys(selectedVertebrae);
        let count = 0;
        keys.forEach(key => {
            if(key[0] === "C"){
                if(selectedVertebrae[key] === true){
                    count++
                }
            }

        })
        setSelectedCervicals(count)
        return;
    }*/

    return (
        <div className="Panel left">

            <div className="row card">

                <h4>New Plan</h4>

                {Object.keys(selectedVertebrae).filter(e => selectedVertebrae[e] === true).length === 0 && (
                    <p style={{fontSize: '14px'}}>
                        To start planning the procedure, select from the dropdown
                        the vertebrae you would like to work with:
                    </p>
                )}
                {Object.keys(selectedVertebrae).filter(e => selectedVertebrae[e] === true).length !== 0 && (
                    <>
                        <p style={{fontSize: '14px'}}>
                            Vertebrae Selected:
                        </p>
                        <div style={{textTransform: 'uppercase', maxWidth: '100%'}}>
                        {
                            Object.keys(selectedVertebrae).map(vertebrae => selectedVertebrae[vertebrae] === true &&
                                vertebrae + ", "
                            )
                        }
                        </div>
                    </>
                )}


            </div>
            <div className="row card vertebras">
                <details >
                    <summary>Cervical</summary>
                    <ul className="vertebrae">{cervicalVertebrae}</ul>
                </details>
                <details >
                    <summary>Thoracic</summary>
                    <ul className="vertebrae">{thoracicVertebrae}</ul>
                </details>
                <details >
                    <summary>Lumbar</summary>
                    <ul className="vertebrae">{lumbarVertebrae}</ul>
                </details>
                <details onClick={() => setSummary('sacrum')} open={selectedSummary === "sacrum" ? true : false}>
                    <summary>Sacrum</summary>
                    <ul className="vertebrae">
                        <li className="lists">
                            <label>
                                Sacrum
                                <input
                                    type="checkbox"
                                    name="sacrum"
                                    value="1"
                                    checked={selectedVertebrae.sacrum}
                                    onChange={() => {
                                        const newSelection = {
                                            ...selectedVertebrae,
                                            sacrum: !selectedVertebrae.sacrum,
                                        };
                                        setSelectedVertebrae(newSelection);
                                        if (props.onSelectVertebrae)
                                            props.onSelectVertebrae(
                                                newSelection
                                            );
                                    }}
                                />
                            </label>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
}