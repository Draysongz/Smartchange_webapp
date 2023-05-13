import React, {useState} from 'react'
import Styles from '../../../pages/utilities/chats/chat.module.scss'
import img1 from "../../../public/images/profile/user.svg"
import Image from 'next/image'

const Search = () => {
  const [username, setUsername] = useState("")
  const [merchant, setMerchant]= useState(null)
  const [err, setErr]= useState(false)

  const handleSearch = ()=>{

  }

  const handleKey=(e)=>{
    e.code === 'Enter' && handleSearch();
  }
  return (
    <div className={Styles.search}>
      <div className={Styles.searchForm}>
        <input type="text" placeholder='find a merchant'   onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username} />
      </div>
      {err && <span>User not found!</span>}
      {merchant && (
      <div className={Styles.userChat}>
        <Image src={img1} alt="alt" width='50' className={Styles.userImg} />
        <div className={Styles.userChatInfo}>
        <span>Jane</span>
      </div>
      </div>
      )}
    </div>
  )
}

export default Search
