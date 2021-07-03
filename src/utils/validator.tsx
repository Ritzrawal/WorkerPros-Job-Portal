export const mobileValidation = (mobile: string) => {
	const mobileRegex = /^[0-9]{1,10}$/
	if (!mobile) return false

	return mobileRegex.test(mobile)
}

export const emailValidation = (email: string) => {
	const emailRegex = /\S+@\S+\.\S+/
	if (!email) return false

	return emailRegex.test(email)
}

export const websiteValidation = (website: string) => {
	const websiteRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
	if (!website) return false

	return websiteRegex.test(website)
}

export const fileExtensionValidation = (fileName: string) => {
	const allowedExtension: any = ['jpeg', 'png', 'jpg']

	const fileExtension = fileName.split('.').pop()

	return allowedExtension.includes(fileExtension)
}
