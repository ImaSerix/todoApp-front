import MiniProfile from "./MiniProfile.tsx";

interface iNavigationProps{
    username: string | null,
    logoutHandler: () => void,
}

const Navigation = ({username, logoutHandler}:iNavigationProps) =>{
    return <nav className="app__nav">
        <MiniProfile username = {username} logoutHandler={logoutHandler}/>
    </nav>
}

export default Navigation;