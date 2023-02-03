'use client';
import AuthGuard from "@/components/authGuard"
import MyEditor from "@/components/editor"
export default function Page(){
    return(
        <main>
            <AuthGuard />
            <h1 className="text-center p-3 text-2xl text-white font-serif bg-stone-700">Write A New Cowardly Opinion</h1>
            <MyEditor />
        </main>
    )
}