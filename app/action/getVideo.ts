
import prisma from '@/app/libs/prismadb'
import getUser from './getUser';
const getVideo = async ()=>{
    const currentUser = await getUser();
    if(!currentUser?.id){
        return []
    }
    try{
    const moviecnt = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random()*moviecnt);

    const randomMovie = await prisma.movie.findMany({
        take: 1,
        skip: randomIndex
    });
    return randomMovie;
}catch(error: any){
  return [];
}
};

export default getVideo