import React from "react";

import "./Overlay.css";

export default function Overlay(props) {
	return <div className={`Overlay ${props.position}`}>{props.children}</div>;
}
