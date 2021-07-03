import { post } from '../utils/http'

export const fileUpload = async (fileType: string, file: any) => {
	let formData = new FormData()

	formData.append('file_for', fileType)
	formData.append('files', file)

	const fileUploadURL = `${process.env.REACT_APP_API_BASE_URL}/upload-file`

	return await post(fileUploadURL, formData)
}
