import AuthGuard from "@/components/authGuard"
import MyEditor from "@/components/editor"
export default function Page(){
    return(
        <main>
            <AuthGuard/>
            <h1 className="text-center p-3 text-2xl text-black font-serif bg-white">Write A New Cowardly Opinion</h1>
            <MyEditor />
        </main>
    )
}