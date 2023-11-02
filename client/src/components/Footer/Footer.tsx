type TLinks = {
  title: string
  links: string[]
}

const footerContent: TLinks[] = [
  {
    title: 'Shop Online',
    links: ['New Collection', 'Categories', 'Gallery']
  },
  {
    title: 'Services',
    links: ['Interior Design', 'Product Design']
  },
  {
    title: 'About',
    links: ['Contact Us', 'Stores', 'FAQ']
  }
]

const footerSocialLinks: string[] = [
  '/images/youtube-icon.svg',
  '/images/instagram-icon.svg',
  '/images/twitter-icon.svg'
]

const Footer = () => {
  return (
    <div className='bg-primary-black'>
      <div className='container mx-auto pt-[70px] pb-[30px]'>
        <div className='flex flex-col justify-between'>
          <div className='grid grid-cols-1 gap-5 mb-20 lg:grid-cols-2 xl:grid-cols-7'>
            <img
              className='mb-20 justify-self-center xl:justify-self-start xl:col-span-2'
              src={'/images/jerskits-white.jpg'}
              alt='jerskits logo'
            />
            {footerContent.map((content, idx) => (
              <ul
                key={idx}
                className='flex flex-col items-center mb-6 xl:items-start'
              >
                <li className='mb-5 text-lg font-bold text-white'>
                  {content.title}
                </li>
                {content.links.map((links, idx) => (
                  <li key={idx} className='font-medium text-neutral-dark-grey'>
                    {links}
                  </li>
                ))}
              </ul>
            ))}
            <ul className='flex justify-center xl:justify-end gap-x-6 xl:col-span-2'>
              {footerSocialLinks.map((socialLink, idx) => (
                <li key={idx}>
                  <img src={socialLink} alt={socialLink.replace('.svg', '')} />
                </li>
              ))}
            </ul>
          </div>
          <p className='text-sm font-medium text-center md:text-lg text-neutral-dark-grey'>
            © 2022 pickolab. Jerskits All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
