'use client'
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

interface NavbarProps{
    user: any
}

const Navbar:React.FC<NavbarProps> =({user})=>{
    const [showBackground, setShowBackground] = useState(false);
    const [showMobileMenu,setShowMobileMenu] = useState(false);
    const [showAccount,setShowAccount] = useState(false);

    useEffect(()=>{
        const handleScroll =()=>{
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            }
            else{
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll',handleScroll);
        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);

    const toggleMobileMenu = useCallback(()=>{
         setShowMobileMenu((current)=>!current);
    },[])
    const toggleAccount = useCallback(()=>{
         setShowAccount((current)=>!current);
    },[])
    return (
        <div className="w-full fixed z-40">
            <div className={clsx(`px-4 md:px-16 py-6 flex flex-row item-center transition duration-500`,showBackground?'bg-zinc-900 bg-opacity-90':"")}>
              <Image className="lg:h-16 " width={60} height={50} src={'/images/download.jpeg'} alt={'logo'} />
              <div className="flex-row ml-8 gap-7 hidden lg:flex lg:mt-4">
                <NavItem label='Home' />
                <NavItem label='Series' />
           <NavItem label='Films' />
           <NavItem label='New & Popular' />
           <NavItem label='My List' />
           <NavItem label='Browse by languages' />
              </div>
              <div className="lg:hidden"></div>
              <div className="flex flex-row ml-auto gap-7 item-center">
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer mt-4">
                    <BsSearch />
              </div>
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer mt-4">
                    <BsBell />
              </div>
              <div onClick={toggleAccount} className="flex flex-row items-center gap-2 cursor-pointer relative">
                <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-md overflow-hidden ">
                    <Image src={'/images/default-blue.png'} alt={'img'} height={40} width={40} />
                </div>
                <BsChevronDown className={clsx('text-white transition mt-1',showAccount?'rotate-180':"rotate-0")} />
                <AccountMenu visible={showAccount} user={user} />
              </div>
              </div>
            </div>

        </div>
    )
};
export default Navbar