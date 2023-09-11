export type TProfileLink = {
  title: string
  link: string
}

const ProfileLinks: TProfileLink[] = [
  { title: 'Edit Account', link: '/profile/edit' },
  { title: 'Orders', link: '/profile/orders' },
  { title: 'Favorites', link: '/profile/favorites' },
  { title: 'Setting', link: '/profile/setting' }
]

export default ProfileLinks
