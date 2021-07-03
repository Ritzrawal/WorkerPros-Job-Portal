interface Props {
	id: number
	title: string
	body: string
}

type newProps = {
	articles: Props[]
}

type PropsAction = {
	type: string
	article: IArticle
}

type DispatchType = (args: PropsAction) => PropsAction
