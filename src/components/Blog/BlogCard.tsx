import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'

type Props = {}

function BlogCard({ }: Props) {
  return (
    <div className='blog_card rounded-3xl' >
      <Image src={"https://imagedelivery.net/BgK_7WpdFl6ls9CBX3q89Q/24499ccb-b9ba-4c6f-bfe4-c965fb893700/public"} priority alt='blog img' width={500} height={350} className='rounded-xl w-full'/>
      <Heading>Hello World</Heading>
    </div>
  )
}

export default BlogCard