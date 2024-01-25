import { pageStrings } from '../../assets/text/pageStrings'

export const Footer = () => {
  return (
    <footer className='text-primary flex justify-end mb-[10px]'>
      <p>{pageStrings.copyright}</p>
    </footer>
  )
}
