'use client';

import Link from "next/link";
import { useState } from "react";

export default function Logo(){
    const [hover, setHover] = useState(false);
    const onMouseEnter = () => {
        setHover(true);
    }
    const onMouseLeave = () => {
        setHover(false);
    }
    return(
        <Link href="/" className="font-serif font-bold" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Coward{hover ? null :<span className="font-extralight">_</span>}ice</Link>
    )
}