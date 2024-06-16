import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/images/logo.png"

type Props = {}

function BlogFooter({ }: Props) {
    return (
        <div className='bg-[#eff8ff] px-[7.6rem] py-8 flex flex-col'>
            <div className="flex justify-between items-center">
                <Link href={"https://townhall.mobi"}>
                    <Image src={logo} alt='Townhall Logo' height={40} width={40} />
                </Link>
                <ul className='w-1/3 gap-x-4 flex justify-between items-center' >
                    <li>
                        <Link href={"#"}>
                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            <p className='text-center mb-4 mt-6'>
                Copyright © 2024| All Rights Reserved
            </p>
        </div>
    )
}

export default BlogFooter