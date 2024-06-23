import { Box, Card, Text } from "@radix-ui/themes";
import moment from "moment";
import { Clock, Users } from "lucide-react";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import BlogNavbar from "@/components/Blog/Navbar";
import { Metadata, ResolvingMetadata } from "next";
import { generateSlug, removeHtmlTags } from "@/lib/utils";

const sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IPost {
  id: number,
  title: string,
  blog_body: string,
  date_posted: string,
  postedby_name: string,
  postedby_id: number,
  posted_by_image: string,
  blog_media: {}[]
}
interface IPostt {
  post: {
    msg: string,
    data: {
      id: number,
      title: string,
      blog_body: string,
      date_posted: string,
      postedby_name: string,
      posted_by_about: string,
      postedby_id: number,
      posted_by_image: string,
      blog_media: {
        thumbnail: string
      }[]
    }
  }
}
export default function Post(post: IPostt) {
  return (
    <>
      <BlogNavbar />
      <div className={`flex flex-col lg:flex-row gap-x-10 w-full md:w-[95%] lg:w-[90%] min-[1280px]:w-4/5 mx-auto px-4 lg:px-8 ${sans.className} mb-20`}>

        <main className='basis-4/5 '>
          <h1 className='text-2xl font-semibold md:text-3xl lg:text-[2.1875rem] text-[#41505f] lg:font-medium leading-[2.5rem] lg:leading-[2.9rem] min-[2000px]:!text-7xl min-[2000px]:font-semibold'>{post.post.data.title}</h1>
          <div className="flex gap-x-2 lg:gap-x-4 mt-4 text-[#505050] text-[0.8125rem] min-[2000px]:!text-[1.5rem]">
            <span className="flex">
              <Link href={""} title="Sora Blogging Tips" target="_blank" className='flex items-center gap-x-1' >
                <Users size={16} /> {post.post.data.postedby_name}
              </Link>
            </span>
            <span className="flex items-center gap-x-1">
              <Clock size={16} /> {moment(post.post.data.date_posted).format("LLL")}
            </span>
          </div>
          <div className="article_img h-[20rem] lg:h-[25rem] min-[2000px]:h-[40rem] my-5 md:my-10 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${post.post.data.blog_media[0]?.thumbnail})` }}>
            <Image src={post.post.data.blog_media[0].thumbnail} alt={post.post.data.title} className='w-full h-[25rem] rounded-lg bg-center' width={200} height={100} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.post.data.blog_body }} className='mt-10 lg:text-lg min-[2000px]:text-[2rem] min-[2000px]:!leading-[4rem] !leading-[2.4rem] text-[#41505f]' />

          <Card className='bg-white py-3 lg:py-6 rounded-lg px-4 lg:px-8 mt-20 !flex gap-x-4 items-center border border-solid border-[#ebebf3] min-[1800px]:min-h-[20rem] min-[1800px]:px-8'>
            <Box as='div' >
              <Image src={post.post.data.posted_by_image} className='rounded-full h-[5rem] w-[5rem] lg:h-[9rem] lg:w-[9rem] object-cover' width={200} height={200} alt={`Author name is ${post.post.data.postedby_name}`} />
            </Box>

            <div className="author-info flex flex-col basis-[70%] min-[1800px]:gap-y-4 min-[1800px]:flex-1">
              <h3 className='text-[1.25rem] font-semibold min-[414px]:font-medium min-[414px]:text-2xl text-[#41505f] mb-2 min-[1800px]:text-4xl '>{post.post.data.postedby_name}</h3>
              <Text className='text-[#41505f] text-sm min-[1800px]:text-2xl'>{post.post.data.posted_by_about}</Text>
            </div>

          </Card>
        </main>
        <aside className='basis-[20%]'>

        </aside>
      </div>
    </>

  )

  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch('https://townhall.empl-dev.site/api/blog/list_writeups?currentPage=1&limit=10')
  const response = await res.json();
  const posts = response.data;


  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: IPost) => ({
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(`https://townhall.empl-dev.site/api/blog/writeup_details?id=${params.id}`).then((res) => res.json());

  console.log("Hello world");
  console.log(product);
  
  

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: "Hello world",
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://townhall.empl-dev.site/api/blog/writeup_details?id=${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

