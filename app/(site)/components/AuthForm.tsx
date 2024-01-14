'use client';

import Input from "@/app/components/input/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthSocial from "./AuthSocial";
import { useRouter } from "next/navigation";


type Variant = 'Login' | 'Register';
const AuthForm =()=>{
    const session = useSession()
    const [variant,setVariant] = useState<Variant>('Login');
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const toggleVariant = useCallback(()=>{
        if(variant==='Login'){
            setVariant('Register');
        }
        else{
            setVariant('Login');
        }
    },[variant]);
    
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
          setLoading(true);
          if(variant==='Register'){
             axios.post('/api/register',data)
             .then(()=>signIn('credentials',{
                ...data,
                redirect: false,
             }))
             .then((callback)=>{
                if(callback?.error){
                    toast.error('Invalid Credentials')
                }
                if(callback?.ok){
                    toast.success("Login Successfully")
                    router.push('/profile');
                }
             })
             .catch(()=> toast.error('Something went wrong!'))
             .finally(()=>setLoading(false))
          }
          if(variant === "Login"){
            signIn('credentials',{
                ...data,
                redirect: false
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error('Invalid Credentials')
                }
                if(callback?.ok){
                    toast.success("Login Successfully")
                    router.push('/profile')
                }
             })
             .catch(()=> toast.error('Something went wrong!'))
             .finally(()=>setLoading(false))

          }
        }

          const socialAction = (action: string)=>{
            setLoading(true);

            signIn(action, {redirect: false})
            .then((callback)=>{
                if (callback?.error) {
                    toast.error('Invalid credentials!');
                  }
          
                  if (callback?.ok) {
                    toast.success('Login');
                    router.push('/profile')
                  }
            })
            .finally(()=> setLoading(false));
          }

          useEffect(()=>{
            if(session ?.status === 'authenticated' ){
              router.push('/profile');
            }
          },[session?.status,router])
          
    return(
        <div className="flex justify-center">
            <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-1 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-4xl mb-6 text-white font-semibold">{variant==='Login'?'SignIn': 'Register'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {variant ==='Register' &&(<Input 
              disabled={loading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name" />)}
              <Input 
              disabled={loading}
              register={register}
              errors={errors}
              required
              type="email"
              id="email"
              label="Email" />
              <Input 
              disabled={loading}
              register={register}
              errors={errors}
              required
              id="password"
              type="password"
              label="Password" />
            <button disabled={loading} type="submit" className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transation">{variant==='Login'?'Login': 'Sign Up'}</button>
            </form>
             <div className="flex flex-row items-center gap-4 mt-3 justify-center">
                <AuthSocial icon={FcGoogle} onClick={()=>socialAction('google')} />
                <AuthSocial icon={FaGithub} onClick={()=>socialAction('github')}/>
             </div>
             <p className="text-neutral-500 mt-3">
                {variant==='Login'?'First time using?':'Already have an account'}
                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant==='Login'?'Create Account':'Login'}</span>
             </p>
            </div>
        </div>
    )
}
export default AuthForm