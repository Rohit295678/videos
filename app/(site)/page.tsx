import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
        <div className="w-full h-full lg:bg-opacity-50 bg-black">
          <nav className="px-12 py-5">
            <Image alt={'logo'} src='/images/download.jpeg' height={60} width={60}/>
          </nav>
          <AuthForm />
        </div>
      </div>
    )
  }
  