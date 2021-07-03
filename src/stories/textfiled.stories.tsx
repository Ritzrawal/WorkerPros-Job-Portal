import React from 'react'
import {
	TextFieldDropDown,
	InputCheckBox,
} from '../component/common/FormComponent/form'
interface Props {
	Data: {
		option: string
	}
}

export default {
	title: 'Text Field',
}

export const TextField: React.FC<Props> = (
	props: Props
): React.ReactElement => (
	<div>
		<TextFieldDropDown title='Hello data' Data={props.Data} />
	</div>
)
// export const CheckboX = () => (
// 	<div>
// 		<InputCheckBox title='Hello button' />
// 	</div>
// )
