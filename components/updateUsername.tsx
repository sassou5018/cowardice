'use client';
import pb from "@/pocketbase";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UpdateUserName(){
    const [username, setUsername] = useState<string>(pb.authStore.model.username || "");
    const router = useRouter();
    const onChange = (e: any) => {
        setUsername(e.target.value);
    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        try{
            await pb.collection("users").update(pb.authStore.model.id, {username: username});
        }catch(error){
            console.log(error);
            throw error;
        }
        alert("Username updated successfully");
        router.push("/settings");
    }
    return(
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3 p-3">
            <input className="input input-bordered w-full max-w-xs" type="text" onChange={e=>onChange(e)} value={username}/>
            <button type="submit" className="btn">Update Username</button>
        </form>
    )
}