import BlogNavbar from '@/components/Blog/Navbar';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Clock, Users } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';
import React from 'react';
import Head from 'next/head';
const API_URL = process.env.API_URL;
import { Open_Sans } from 'next/font/google'
import BlogFooter from '@/components/Blog/BlogFooter';
import { Box, Card, Text } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { removeHtmlTags } from '@/lib/utils';
import { url } from 'inspector';

const sans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
})



function Page() {
    const router = useRouter();

    const slug = router.query.slug??[];
   // if (!slug) return null;

    const post_id = slug[1];



    const { data, error, isLoading } = useQuery({
        queryKey: ["article", post_id],
        queryFn: () =>
            fetch(`${API_URL}/blog/writeup_details?id=${post_id}`).then((res) =>
                res.json(),
            ),
    })


    if (isLoading) {
        return (
            <div className="w-3/5 mx-auto grid gap-y-5 py-6">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>

        )
    }

    if (error) {
        return (
            <p>An Error Occured!</p>
        )
    }

    const { title, postedby_name, date_posted, posted_by_image, posted_by_about, id, blog_body, blog_media } = data.data;


    return (
        <React.Fragment>

            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <meta name="description" content={`${removeHtmlTags(blog_body, 120)}`} />
                <meta property="og:image" content={blog_media[0].thumbnail} />
                <meta property="og:url" content={blog_media[0].thumbnail} />
                <meta name="twitter:card" content={`${removeHtmlTags(blog_body, 160)}`} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={`${removeHtmlTags(blog_body, 160)}`} />
                <meta name="twitter:image" content={blog_media[0].thumbnail} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index,follow" />
                <link rel="canonical" href={window.location.href} />

            </Head>
            <div className="bg-townhall-background font-worksans -mt-5 h-full">
                <header className="mt-0 mx-auto mb-16 min-[2000px]:mb-[12rem]">
                    <BlogNavbar />
                </header>

                <div className={`flex flex-col lg:flex-row gap-x-10 w-full md:w-[95%] lg:w-[90%] min-[1280px]:w-4/5 mx-auto px-4 lg:px-8 ${sans.className} mb-20`}>
                    <main className='basis-4/5 '>
                        <h1 className='text-2xl font-semibold md:text-3xl lg:text-[2.1875rem] text-[#41505f] lg:font-medium leading-[2.5rem] lg:leading-[2.9rem] min-[2000px]:!text-7xl min-[2000px]:font-semibold'>{title}</h1>
                        <div className="flex gap-x-2 lg:gap-x-4 mt-4 text-[#505050] text-[0.8125rem] min-[2000px]:!text-[1.5rem]">
                            <span className="flex">
                                <Link href={""} title="Sora Blogging Tips" target="_blank" className='flex items-center gap-x-1' >
                                    <Users size={16} /> {postedby_name}
                                </Link>
                            </span>
                            <span className="flex items-center gap-x-1">
                                <Clock size={16} /> {moment(date_posted).format("LLL")}
                            </span>
                        </div>
                        <div className="article_img h-[20rem] lg:h-[25rem] min-[2000px]:h-[40rem] my-5 md:my-10 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${blog_media[0]?.thumbnail})` }}>
                            {/*  <Image src={blog_media[0].thumbnail} alt={title} className='w-full h-[25rem] rounded-lg bg-center' width={200} height={100} /> */}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: blog_body }} className='mt-10 lg:text-lg min-[2000px]:text-[2rem] min-[2000px]:!leading-[4rem] !leading-[2.4rem] text-[#41505f]' />

                        <Card className='bg-white py-3 lg:py-6 rounded-lg px-4 lg:px-8 mt-20 !flex gap-x-4 items-center border border-solid border-[#ebebf3] min-[1800px]:min-h-[20rem] min-[1800px]:px-8'>
                            <Box as='div' >
                                <Image src={posted_by_image} className='rounded-full h-[5rem] w-[5rem] lg:h-[9rem] lg:w-[9rem] object-cover' width={200} height={200} alt={`Author name is ${postedby_name}`} />
                            </Box>

                            <div className="author-info flex flex-col basis-[70%] min-[1800px]:gap-y-4 min-[1800px]:flex-1">
                                <h3 className='text-[1.25rem] font-semibold min-[414px]:font-medium min-[414px]:text-2xl text-[#41505f] mb-2 min-[1800px]:text-4xl '>{postedby_name}</h3>
                                <Text className='text-[#41505f] text-sm min-[1800px]:text-2xl'>{posted_by_about}</Text>
                            </div>

                        </Card>
                    </main>
                    <aside className='basis-[20%]'>

                    </aside>
                </div>
                <BlogFooter />
            </div>
        </React.Fragment>

    )
}


export default Page;