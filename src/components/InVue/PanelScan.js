import React from "react";

import "./PanelScan.css";

export default function PanelScan(props) {
	return (
		<div className="PanelScan col">
			<div className="row">

					<img src="/icons/view.svg" alt="Show" />

					<img src="/icons/display.svg"  alt="Full" />

					<img src="/icons/contrast.svg" alt="Contrast"  />

					<input type="range" min="1" max="100" defaultValue={50}  />

			</div>
			<div
				className="row scan"
				style={{ backgroundImage: `url(${props.image})` }}
			/>
		</div>
	);
}