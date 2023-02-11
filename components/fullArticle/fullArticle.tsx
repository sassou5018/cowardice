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
        <div id='article' className='prose mockup-window border border-base-300 bg-white text-black p-5'>
            <div id='header' className='text-white'>
                <h1 className='font-serif text-3xl text-black'>{title}</h1>
                <h3 className='text-sm font-serif text-black'>by <Link className="link" target="_blank" href={`/author/${author.username}`}>{author.username}</Link></h3>
                <p className='text-xs font-semibold text-black'>
                    Published in <span className='font-light text-black'>{date}</span>
                </p>
            </div>
            <div id='content' className='text-black'>
                <article
                    id='content text-black'
                    className='prose'
                    dangerouslySetInnerHTML={html}
                />
            </div>
        </div>
    )
}
