'use client'

import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import pb from "@/pocketbase";

function sanitizeHTML(html: any){
    return{
        __html: DOMPurify.sanitize(html)
    }
}


export default function MyEditor(){
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      const [title, setTitle] = useState('');
      const onClick = async () => {
        const html = convertToHTML(editorState.getCurrentContent());
        const cleanHTML = sanitizeHTML(html);
        console.log(pb.authStore.model);
        console.log("cleanHTML", cleanHTML)
        let res;
        try{
            res = await pb.collection("articles").create({
                title: title,
                content: cleanHTML.__html,
                author: pb.authStore.model.id
            })
        }catch(err){
            console.log(err);
            alert("Error: Check Console For More");
        }
      }
    
      return (
        <div className="bg-white h-screen">
            <div className="flex flex-col justify-center items-center mb-5">
                <label className="font-serif font-semibold">Title:</label>
                <input type="text" className="shadow-lg border w-72 font-serif font-semibold" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
          <Editor
            //@ts-ignore
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="bg-white"
            toolbarClassName="flex justify-center bg-white"
            editorClassName="px-6 bg-gray-100 shadow-lg max-w-5xl mx-auto border h-96"
          />
          <div className="flex justify-center mt-5">
            <button onClick={onClick} className="rounded-md bg-black text-white p-1 w-36 sm:w-40  hover:bg-gray-800">Publish</button>
          </div>
        </div>
      )
}