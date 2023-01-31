'use client';
import pb from '@/pocketbase';
import { useRouter } from 'next/navigation';
import useSwr from 'swr';

const fetcher = (url: string) =>{
    return pb.authStore.isValid
}

export default function AuthGuard() {
    const router = useRouter();
    const {data, error} = useSwr('authChecker', fetcher);
    console.log("data", data);
    if(error){
        router.push('/login');
    }
    if(data===false){
        router.push('/login');
    }
    return null;

}