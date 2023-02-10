import ArticleCard from '@/components/articleCard'
import AuthGuard from '@/components/authGuard'
import MorePages from '@/components/morePages'
import pb from '@/pocketbase'
async function getList(page: number = 1) {
    let res
    try {
        res = await pb
            .collection('articles')
            .getList(1, 4 ,{ sort: '-created', expand: 'author' })
    } catch (error) {
        console.log(error)
        return { error: true }
    }
    return res
}
export default async function Home() {
    const articles = await getList();
    const listElem = articles.items.map((article: any) => {
        return (
            <ArticleCard
                key={article.id}
                title={article.title}
                author={article.expand.author}
                content={article.content}
                date={article.updated}
                id={article.id}
            />
        )
    })
    return (
        <main className='flex flex-col justify-center items-center bg-base-100'>
            <AuthGuard />
            <div className='bg-base-100 p-3 grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-3'>
            {listElem}
            </div>
            <MorePages/>
        </main>
    )
}
