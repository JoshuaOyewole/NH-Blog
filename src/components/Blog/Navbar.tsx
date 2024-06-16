import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../public/assets/images/newLogo.png"

type Props = {}

function BlogNavbar({ }: Props) {
  return (
    <nav className='flex justify-between h-36 items-start w-4/5 mx-auto'>
      <Link href={"/"} className='flex items-center'>
        <Image src={logo} alt='Townhall logo' width={130} height={130} priority className='w-48 h-auto'/>
      </Link>
    </nav>
  )
}

export default BlogNavbar