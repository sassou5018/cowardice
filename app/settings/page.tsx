import UpdateUserName from "@/components/updateUsername";


export default async function Page(){
    return(
        <main className="bg-base-100 flex flex-col justify-center items-center p-3">
                <h1>Settings</h1>
                <UpdateUserName/>
        </main>
    )
}