'use client'

import { useState, useCallback } from "react";
import pb from "@/pocketbase";
import RichTextEditor from './richTextEditor';
import { useRouter } from "next/navigation";



export default function MyEditor(){
  const router = useRouter();
  const initialValue =
  '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
  const [value, onChange] = useState<string>(initialValue);
  const [title, setTitle] = useState<string>("");
  const [posted, setPosted] = useState<boolean>(false);
  const [loading , setLoading] = useState<boolean>(false);
  async function onClick(){
    let res:any;
    setLoading(true);
    try{
      res = await pb.collection("articles").create({title, content: value, author: pb.authStore.model.id})
    } catch(err){
      alert("Error posting article");
      console.log(err);
      throw err;
    }
    setPosted(true);
    setTimeout(()=>router.push(`/article/${res.id}`), 5000);
  }

  const handleImageUpload = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        pb.collection("images").create(formData)
          .then((result:any) => {
            console.log("heeeeey we're here")
            console.log(result)
            resolve(`${process.env.NEXT_PUBLIC_API_URL}/api/files/images/${result.id}/${result.file}`)
        })
          .catch(() => {
            console.log("i've errored out duuuuude bonkers")
            reject(new Error('Upload failed'))
          });
      }),
    []
  );




  return (
    <div className="bg-stone-700 flex flex-col justify-start items-center h-screen">
      <label htmlFor="title" className="text-white font-serif">Title:</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} type="text" className="mb-3 bg-stone-700 border border-slate-300 rounded-md placeholder:px-3 placeholder:font-serif" placeholder="Enter A Title"/>
    <RichTextEditor value={value} onChange={onChange} onImageUpload={handleImageUpload}/>
    <button onClick={onClick} className="bg-white text-black font-serif mt-6 rounded-md w-24 hover:bg-slate-300" disabled={loading ? true : false}>{loading ? "Loading..." :"Publish"}</button>
    {posted ? <p className="bg-green-500 rounded-md text-white font-serif mt-3 p-1">Article Posted! Redirecting...</p> : null}
    </div>
  );
}