
import { Box, Heading, Separator, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from "moment";
import { removeHtmlTags } from '@/lib/utils';
import { IArticle } from '@/models/blog';

function BlogCard({ ...props }: IArticle) {
  const { title, postedby_name, date_posted, blog_body, id } = props;
  return (
    <Box as='div' className="flex flex-col">
      <Link href={`/${title}/${id}`} className='block rounded-3xl hover:transition-all' >
        <Image src={"https://imagedelivery.net/BgK_7WpdFl6ls9CBX3q89Q/24499ccb-b9ba-4c6f-bfe4-c965fb893700/public"} priority alt='blog img' width={500} height={350} className='rounded-xl w-full grayscale-0 hover:grayscale' />
        <Heading className='font-roboto-slab text-[#302f2f] text-2xl lg:text-4xl my-5 font-medium hover:text-[#506fd9ed] transition-all'> {title}</Heading>
        <Box as='div' className='text-[#505050]'>
          <Text className='font-semibold'>{postedby_name} | {" "}</Text> <Text className='font-semibold'>{moment(date_posted).format("LLL")}</Text>
        </Box>
      </Link>
      <Separator className="SeparatorRoot my-3" />
      <Text as='p' className='max-h-[6.7rem] truncate whitespace-normal font-worksans text-[#212529] leading-7 ...' dangerouslySetInnerHTML={{
        __html: `${removeHtmlTags(blog_body, 190)}...`,
      }} />
    </Box>


  )
}

export default BlogCard