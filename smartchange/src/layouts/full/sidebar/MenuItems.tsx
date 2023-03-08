import {
  IconAperture, IconArrowAutofitUp, IconCopy, IconLayoutDashboard, IconLogin, IconMessage, IconMoodHappy, IconSettings, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  
  {
    id: uniqueId(),
    title: 'Swap',
    icon: IconArrowAutofitUp,
    href: '/utilities/swap',
  },
  {
    id: uniqueId(),
    title: 'Chat',
    icon: IconMessage,
    href: '/utilities/chats',
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: IconSettings,
    href: '#',
  },
];

export default Menuitems;
