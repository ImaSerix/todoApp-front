
interface iMiniProfileProps{
    username: string | null,
    logoutHandler: () => void,
}

const MiniProfile = ({ username, logoutHandler}:iMiniProfileProps) => {

    if (!username) return <div className="mini-profile">
        <p className={'mini-profile__username'}>Guest</p>
    </div>

    return <div className="mini-profile">
        <p className={'mini-profile__username'}>{username}</p>
        <button className={'mini-profile__button-logout'} onClick={logoutHandler}>Logout</button>
    </div>
}

export default MiniProfile;