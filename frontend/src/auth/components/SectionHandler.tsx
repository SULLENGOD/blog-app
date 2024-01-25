import ProfileInfo from "./ProfileInfo"
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
          <h1>{section}</h1>
        )
      }
    </div>
  )
}

export default SectionHandler