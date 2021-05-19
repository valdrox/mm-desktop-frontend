import React, { useState } from "react";

import PanelScan from "./PanelScan";

import "./Panel.css";

export default function Panel(props) {
	return (
		<div className="Panel">
			<div class="row">
				<button>CT Scans</button>
				<button>Implant Options</button>
			</div>

			<PanelScan image="/placeholder/ct-front.png" />
			<PanelScan image="/placeholder/ct-side.png" />
			<PanelScan image="/placeholder/ct-top.png" />
		</div>
	);
}
