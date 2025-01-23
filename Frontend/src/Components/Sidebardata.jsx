import { IoHome, IoSettingsSharp, IoLogOut } from "react-icons/io5";

export const Sidebardata = [
  {
    id: 'home',
    title: 'HOME',
    icon: <IoHome />,
    link: '/home',
  },
  {
    id: 'settings',
    title: 'SETTINGS',
    icon: <IoSettingsSharp />,
    link: '/settings',
  },
  {
    id: 'logout',
    title: 'LOGOUT',
    icon: <IoLogOut />,
    link: '/logout',
  },
];