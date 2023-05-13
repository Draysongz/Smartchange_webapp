import React from 'react'
import  Styles from './logosearch.module.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className={Styles.LogoSearch}>
    <div className={Styles.Search}>
        <input type="text" placeholder="#Explore"/>
        <div className={Styles.sIcon}>
              <UilSearch/>
        </div>
    </div>
  </div>
  )
}

export default LogoSearch
