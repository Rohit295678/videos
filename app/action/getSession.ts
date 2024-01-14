import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/option";


export default async function getSession(){
    return await getServerSession(authOptions);
}