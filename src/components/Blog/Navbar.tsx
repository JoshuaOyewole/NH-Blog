import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../public/assets/images/newLogo.png"
import { Avatar } from '@radix-ui/themes'

type Props = {}

function BlogNavbar({ }: Props) {
  return (
    <nav className='flex w-full justify-between h-36 items-start lg:w-[90%] min-[1280px]:w-4/5 mx-auto'>
      <Link href={"/"} className='flex items-center'>
        <Image src={logo} alt='Townhall logo' width={130} height={130} priority className='w-[10rem] h-auto min-[2000px]:w-[20rem]' />
      </Link>
    </nav>
  )
}

export default BlogNavbar