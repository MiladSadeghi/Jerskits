function Setting() {
  return (
    <div className='space-y-7'>
      <h1 className='font-bold text-text-2xl text-primary-black leading-[48px]'>
        Account Setting
      </h1>
      <div className='space-y-7'>
        <div>
          <div className='flex items-center justify-between mb-2.5'>
            <h2 className='text-2xl font-bold leading-9 text-primary-black'>
              Email Notification
            </h2>
            <label className='relative inline-flex items-center'>
              <input type='checkbox' className='sr-only peer' />
              <div className="w-14 h-[30px] px-1 bg-white border border-neutral-soft-grey box-content rounded-full after:left-2 peer peer-checked:after:left-[39px] after:content-[''] after:absolute after:top-1.5 after:shadow-xl after:shadow-primary-black after:bg-neutral-soft-grey peer-checked:after:bg-primary-black after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
          <p className='leading-6 text-neutral-dark-grey'>
            We would like you to be first to get customized news, special
            offers, invites to events & exclusive competitions related to
            JERSKITS, our products and our collaboration with third parties.
          </p>
        </div>
      </div>
      <div className='border-t border-neutral-soft-grey' />
    </div>
  )
}

export default Setting
