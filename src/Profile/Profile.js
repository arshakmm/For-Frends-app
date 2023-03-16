import { useLocation } from "react-router-dom"
import calculateAge from "../utils/calculateAges";
import style from "./profile.module.css"
import defaultAvatar from '../assets/defaultAvatar.jpg'



const Profile = () => {
    const { userData } = useLocation().state;
    console.log("🚀 ~ file: Profile.js:5 ~ Profile ~ userData:", userData)
    console.log('dsfsefs', userData.firstName)

    return <div className={style.profile}>
        <div className={style.profileContainer}>
            <div className={style.userProfilrWrapper}>
                <div className={style.userProfilePhoto}>
                    <img className={style.profileImg} src={userData.avatarPhoto ? userData.avatarPhoto : defaultAvatar} alrt="avatar" />
                </div>
                <div className={style.userProfileInformation}>
                    <div className={style.userProfileName}>
                        <div className={style.userProfileFirstname}>{userData.firstName}</div>
                        <div className={style.userProfileLastname}>{userData.lastName}</div>
                    </div>
                    <div className={style.userProfileAgeGender}>
                        <div className={style.userProfileAge}>{calculateAge(userData.day, userData.month, userData.year)} {''}|</div>
                        <div className={style.userProfileGender}>{userData.gender}</div>
                    </div><hr style={{ width: '100%' }} />
                    <div className={style.userProfileEmail}>
                        Email: {userData.email}
                    </div>
                    <div className={style.userProfileLanguages}>
                        Language:
                        {
                            userData.languages.map((item) => {
                                return <ul key={item}>
                                    <li>
                                        {item}
                                    </li>
                                </ul>
                            })
                        }
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className={style.userProfileBio}>
                        Bio:{' '}
                        {userData.bio}
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default Profile