import ArticleCard from '@/components/articleCard'
import FullArticle from '@/components/fullArticle/fullArticle'
import pb from '@/pocketbase'
import Link from 'next/link'

async function getArticle(id: string) {
    let article
    try {
        article = await pb
            .collection('articles')
            .getOne(id, { expand: 'author' })
    } catch (error) {
        console.log('EEEEEEEEEEEEEEEEEROOOOOOOOOOOOOOOOOOOOR')
        return { error: true }
    }
    return article
}

export default async function Page({ params }: any) {
    const { id } = params;
    const article = await getArticle(id);
    if (article.error === true) {
        return (
            <main className='bg-base-100 flex flex-col justify-center items-center p-3'>
                <div className='alert alert-error shadow-lg max-w-md'>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>Error! Article Not Found.</span>
                    </div>
                </div>
                <span>Go Back <Link className='link' href="/">home</Link></span>
            </main>
        )
    }
    return (
        <main className='flex justify-center bg-base-100'>
            <FullArticle
                title={article.title}
                author={article.expand.author}
                content={article.content}
                date={article.updated}
            />
        </main>
    )
}
