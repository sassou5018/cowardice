
import AuthGuard from "@/components/authGuard"
export default function Home() {
  return (
    <main>
      <AuthGuard />
      <h1 className="text-center text text-white">New PocketBase Thingy</h1>
    </main>
  )
}
