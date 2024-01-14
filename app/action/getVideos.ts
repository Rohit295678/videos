import getUser from "./getUser"
import prisma from "@/app/libs/prismadb"

const getVideos =async()=>{
    const currentUser = await getUser();

    if(!currentUser?.id){
        return [];
    }
    try {
        const videos = await prisma.movie.findMany();
        return videos
    } catch (error: any) {
        return [];
    }
};

export default getVideos