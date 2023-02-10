import SearchBar from "./searchBar"
import AccountMenu from "./accountMenu"
import MobileMenu from "./mobileMenu"
import Link from "next/link"
import Logo from "./Logo"

export default function Navbar() {
    

    return(
        <nav className=" bg-stone-700 flex flex-row justify-between px-5 py-2 text-white">
            <div>
                <Logo/>
            </div>
            <SearchBar />
            <ul className="invisible sm:visible grid grid-cols-3 gap-3">
                <div className="visible sm:invisible">
                <MobileMenu />
                </div>
                <div className="">
                <li><Link href="/write">Write</Link></li>
                </div>
                <div>
                <AccountMenu />
                </div>
            </ul>
        </nav>
    )
}