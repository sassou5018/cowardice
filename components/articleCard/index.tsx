import Link from 'next/link'
export default function ArticleCard({ author, title, date, id }: any) {
    return (
        <div className='mockup-window border border-base-300 w-144 bg-neutral text-primary-content p-3 px-4'>
            <div id='header' className='text-white'>
                <Link href={`/article/${id}`} className="no-underline hover:underline">
                    <h1 className='font-serif text-3xl text-neutral-content '>{title}</h1>
                </Link>
                <h3 className='text-sm font-serif neutral-content'>
                    by{' '}
                    <Link
                        className='link'
                        target='_blank'
                        href={`/author/${author.username}`}
                    >
                        {author.username}
                    </Link>
                </h3>
                <p className='text-xs font-semibold'>
                    Published in <span className='font-light'>{date}</span>
                </p>
            </div>
        </div>
    )
}
