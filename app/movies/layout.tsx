import getUser from "../action/getUser"
import getVideo from "../action/getVideo";
import getVideos from "../action/getVideos";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";

export default async function ProfileLayout({
    children
}:{
    children: React.ReactNode
}){
    const user = await getUser();
    const Movie = await getVideo();
    const movies = await getVideos();
    return(
        <div><Navbar user={user?.name} /><Billboard Movie={Movie} />
        <div className="pb-40">
          <MovieList title='Trending Now' data={movies} />
          <MovieList title='Trending Now' data={movies} />
        </div>
        {children}</div>
    )
}