'use client';
import pb from "@/pocketbase";
import { useState } from "react";
import ArticleCard from "../articleCard";
interface Props {
    page: number; //Has to be a state!!!!!!!!!
}
async function getList(page: number = 1) {
    let res
    try {
        res = await pb
            .collection('articles')
            //TODO: add pagination
            .getList(page, 4 ,{ sort: '-created', expand: 'author' })
    } catch (error) {
        console.log(error)
        return { error: true }
    }
    return res
}
export default function MorePages(){
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const onClick = async () => {
        setPage((prev)=>{
            return prev + 1;
        })
        const res = await getList(page);
        //@ts-ignore
        setArticles((prev)=>{
            return [...prev, ...res.items];
        })
    }
    const listElem = articles.map((article: any) => {
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
    if(page === 1){
        return(
            <button onClick={onClick} className="btn">Load More...</button>
        )
    }
    return(
        <div className="bg-base-100 p-3 grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-3">
            {listElem}
            <button onClick={onClick} className="btn">Load More...</button>
        </div>
    )
}