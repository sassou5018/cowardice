'use client';

import Link from 'next/link'
import pb from '@/pocketbase';
import { useState } from 'react';
import { FormEvent } from 'react';
import {useRouter} from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [pwValid, setPwValid] = useState<boolean | null>(true);
    const [pwLength, setPwLength] = useState<boolean | null>(true);
    
    function onPwConfirmChange(value: string){
        setPasswordConfirm(value);
        setPwValid(null);
    }
    function onPwChange(value: string){
        setPassword(value);
        setPwLength(null);
    }
    const register = async (e: any) => {
        e.preventDefault();
        //@ts-ignore
        const username = e.target.username.value;
        if(password !== passwordConfirm){
            setPwValid(false);
            return;
        }
        if(password.length < 8){
            setPwLength(false);
            return;
        }
        let result
        try{
            result = await pb.collection('users').create({username, password, passwordConfirm});
        }catch(err){
            alert("Error!!")
            return;
        }
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
        <form onSubmit={register} className=' bg-opacity-50 bg-gray-400 p-6 w-max h-screen flex flex-col justify-center mr-0 sm:mr-96'  >
                <h2 className='text-center text-white text-2xl cursor-default'>
                    Register
                </h2>
                <br />
                <input
                    type='text'
                    name='username'
                    className='rounded-md px-3 py-2 focus:bg-gray-100 text-black focus:outline-none invalid:outline invalid:outline-red-500'
                    placeholder='Coward01'
                />
                <br />
                <input
                    type='password'
                    name='password'
                    className={`rounded-md px-3 py-2 focus:bg-gray-100 text-black focus:outline-none invalid:outline invalid:outline-red-500 ${pwLength ? '' : 'outline outline-red-500'}`}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => onPwChange(e.target.value)}
                />
                {pwLength===false ? '' : <p className='text-red-500 text-xs'>Password must be at least 8 characters long</p>}
                <br />
                <input
                    type='password'
                    name='passwordConfirm'
                    className={`rounded-md px-3 py-2 focus:bg-gray-100 text-black focus:outline-none invalid:outline invalid:outline-red-500 ${pwValid ? '' : 'outline outline-red-500'}`}
                    placeholder='Confirm Password'
                    value={passwordConfirm}
                    onChange={(e) => onPwConfirmChange(e.target.value)}
                />
                {pwValid===false ? '' : <p className='text-red-500 text-xs'>Passwords do not match</p>}
                <br />
                <button className='rounded-md bg-white p-1 w-80 sm:w-96 hover:bg-gray-200'>
                    Register
                </button>
        </form>
    )
}
