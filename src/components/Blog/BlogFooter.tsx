import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/images/logo.png"

type Props = {}

function BlogFooter({ }: Props) {
    return (
        <footer className='bg-[#eff8ff]  lg:px-[7.6rem] py-8 '>
            <div className='w-[90%]  mx-auto lg:w-[90%] min-[1280px]:w-4/5 flex gap-x-5 lg:gap-x-0 lg:flex-col justify-between'>
                <div className="flex justify-between items-center">
                    <Link href={"/"}>
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
                <p className='text-center mb-4 mt-6 text-[#41505f]'>
                    Copyright © 2024{" "}| All Rights Reserved
                </p>
            </div>

        </footer>
    )
}

export default BlogFooter