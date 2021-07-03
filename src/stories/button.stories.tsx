import React, { useState } from 'react'
import { SingleProgress, MultiProgress } from '../component/admin/form/progress'
import TopAdminbutton from '../component/admin/form/button'
import LineGraph from '../component/admin/form/adminGraph'
import { AaaButtonForm } from '../component/common/buttons/switchNewButton'
import {
	CustomButton,
	CustomButtonTag,
	CustomButtonTagnotClick,
} from '../component/common/buttons/profileButton'
import {
	ButtonComponent,
	ButtonWhite,
	ButtonCustom,
} from '../component/common/buttons/buttonComponent'
// import Tag from './index'
export default {
	title: 'Buttons',
}

export const RangeComponentData = () => (
	<div>
		<LineGraph />
	</div>
)
export const CalenderData = () => (
	<div>
		<SingleProgress />
	</div>
)
export const Buttons = () => (
	<div>
		<ButtonComponent height={50} width={180} buttonTitle='Primary' />
		<ButtonWhite
			height={50}
			width={180}
			buttonTitle='Primary Color for the data '
		/>

		<ButtonCustom height={50} width={180} buttonTitle='White' />
	</div>
)
export const Basic = () => <div> Hello Testing</div>
export const Second = () => <div>Hello new data</div>
