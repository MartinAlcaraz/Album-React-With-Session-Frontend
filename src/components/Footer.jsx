import gitHubImg from '../icons/GitHub.svg'
import linkedInImg from '../icons/LinkedIn.svg'

const Footer = () => {
    return (
        <footer className='flex flex-row bg-primary-md  h-20 items-center m-1 md:m-2 border-primary sticky top-[100vh]'>
            <p className='mx-2 text-sm md:text-base font-semibold min-w-fit'>Desarrollado por A. Martin Alcaraz &copy; </p>
            <div className='flex flex-row justify-evenly w-full'>
                <a href='https://github.com/MartinAlcaraz' target="_blank"><img className='h-8' src={gitHubImg} alt='GitHub' title='GitHub' /></a>
                <a href='https://www.linkedin.com/in/angel-martin-alcaraz/' target="_blank"><img className='h-8' src={linkedInImg} alt='LinkedIn' title='LinkedIn' /></a>
            </div>
        </footer>
    )
}

export default Footer;