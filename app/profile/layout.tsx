import getUser from "../action/getUser";
import UserCard from "../components/UserCard";

export default async function ProfileLayout({
    children
}:{
    children: React.ReactNode
}){
    const user = await getUser();
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
            {children}
            <UserCard name={user?.name} />
            </div>
        </div>
    )
}