'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UserCardProps{
    name: any;
}

const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
  ]

const UserCard: React.FC<UserCardProps> = ({name})=>{
    const imgSrc = images[Math.floor(Math.random() * 4)];
    const router = useRouter();
     const selectProfile = useCallback(()=>{
           router.push('/movies');
     },[router])
    return (
        <div onClick={selectProfile} className="group flex-row w-44 mx-auto mt-4">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image draggable={false} className="object-contain" height={400} width={400} src={imgSrc} alt={'profie'}/>
            </div>
          <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
        </div>
    )
};

export default UserCard