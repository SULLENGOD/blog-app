import ProfileInfo from "./ProfileInfo"
import ProfileSettings from "./ProfileSettings"
import UsersPosts from "./UsersPosts"


const SectionHandler = ({section}: {section: string}) => {
  return (
    <div>
      {
        section == 'profile' ? (
          <ProfileInfo />
        ) : section == 'posts' ?(
          <UsersPosts />
        ) : (
          <ProfileSettings />
        )
      }
    </div>
  )
}

export default SectionHandler