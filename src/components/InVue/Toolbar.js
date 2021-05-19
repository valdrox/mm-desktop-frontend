import React, { useState } from "react";
import Export from '../../icons/export.png';
import Label from '../../icons/label.png'
import Measure from '../../icons/measure.png'
import Angle from '../../icons/angle.png'
import Crosshair from '../../icons/crosshair.png'
import Layout from '../../icons/layout.png'

export default function Toolbar(props) {

	return (

		<div className="row no-gutters upload-navbar">

			<div className="col-md-10">
				<div className="row">

					<div className={`col-sm-1 disabled`}>
						<a className="translate">
							<img src={Label} /> <br />
							Label
						</a>
					</div>

					<div className={`col-sm-1 disabled`}>
						<a className="rotate">
							<img src={Measure} /> <br />
							Measure
						</a>
					</div>

					<div className={`col-sm-1 disabled`}>
						<a className="rotate">
							<img src={Angle} /> <br />
							Angle
						</a>
					</div>

					<div className={`col-sm-1 disabled`}>
						<a className="rotate">
							<img src={Crosshair} /> <br />
							Crosshair
						</a>
					</div>

					<div className={`col-sm-1 disabled`}>
						<a className="rotate">
							<img src={Layout} /> <br />
							Layout
						</a>
					</div>

				</div>
			</div>

		</div>

	);
}
