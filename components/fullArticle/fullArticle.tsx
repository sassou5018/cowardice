import Link from "next/link";

interface FullArticleProps {
    title: string
    author: {
        username: string
    },
    date: string,
    content: string,
}

export default function FullArticle({title, author, date, content}: FullArticleProps) {
    const updated = new Date(date).toLocaleDateString();
    const html = {
        __html: content
    }
    return (
        <div id='article' className='prose mockup-window border border-base-300 bg-neutral text-primary-content p-5'>
            <div id='header' className='text-white'>
                <h1 className='font-serif text-3xl'>{title}</h1>
                <h3 className='text-sm font-serif'>by <Link className="link" target="_blank" href={`/author/${author.username}`}>{author.username}</Link></h3>
                <p className='text-xs font-semibold'>
                    Published in <span className='font-light'>{date}</span>
                </p>
            </div>
            <div id='content' className=''>
                <article
                    id='content'
                    className='prose text-white'
                    dangerouslySetInnerHTML={html}
                />
            </div>
        </div>
    )
}
