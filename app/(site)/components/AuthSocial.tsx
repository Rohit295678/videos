'use client';

import { IconType } from "react-icons";

interface AuthSocialProps{
    icon: IconType,
    onClick: ()=>void
}

const AuthSocial:React.FC<AuthSocialProps> = ({
    icon: Icon,onClick,
}) =>{
    return(
        <div onClick={onClick} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
            <Icon size={32}/>
        </div>
    )
}

export default AuthSocial;