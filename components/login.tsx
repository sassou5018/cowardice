'use client'
import pb from '@/pocketbase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const login = async (e: any) => {
        e.preventDefault();
        //@ts-ignore
        const username = e.target.username.value;
        //@ts-ignore
        const password = e.target.password.value;
        try{
            await pb.collection('users').authWithPassword(username, password);
        } catch(err){
            alert("Error!!")
            return;
        }
        router.push('/');
    }
    if(pb.authStore.isValid){
        router.push('/');
    }
    
    return (
        
        <form className=' bg-opacity-50 bg-gray-400 p-6 w-max h-screen flex flex-col justify-center mr-0 sm:mr-96'>
                <h2 className='text-center text-white text-2xl cursor-default'>Log in</h2>
                <br />
                <input type='text' className='rounded-md px-3 py-2 focus:bg-gray-100 text-black focus:outline-none invalid:outline invalid:outline-red-500' placeholder='Enter Your Username'/>
                <br />
                <input type='password' className='rounded-md px-3 py-2 focus:bg-gray-100 text-black focus:outline-none invalid:outline invalid:outline-red-500' placeholder='********' />
                <br />
                <button className='rounded-md bg-white p-1 w-80 sm:w-96 hover:bg-gray-200'>Log in</button>
                <br />
                <Link href='#' className='text-white text-xs hover:underline'>Forgot Password</Link>
        </form>
        
    )
}
