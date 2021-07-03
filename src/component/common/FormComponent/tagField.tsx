import { title } from 'process'
import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
interface Props {
	title: string
}
const TagButton: React.FC<Props> = () => {
	return <Button className='ButtonTagField'>{title}</Button>
}
export default TagButton
