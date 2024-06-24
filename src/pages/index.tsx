import BlogCard from "@/components/Blog/BlogCard";
import BlogFooter from "@/components/Blog/BlogFooter";
import BlogNavbar from "@/components/Blog/Navbar";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import Pagination from "@/components/Pagination";
import { generateSlug } from "@/lib/utils";
import { IArticle } from "@/models/blog";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
const API_URL = process.env.API_URL;


interface IPost {
  id: number,
  title: string,
  blog_body: string,
  date_posted: string,
  postedby_name: string,
  postedby_id: number,
  posted_by_image: string,
  blog_media: {
    thumbnail:string,
    type:string
  }[]
}

function Index() {
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(50);

  const { data, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch(`${API_URL}/blog/list_writeups?currentPage=${currentPage}&limit=${limit}`).then((res) =>
        res.json(),
      ),
  })


  if (isLoading) {
    return (
      <div className="w-4/5 lg:w-3/5 mx-auto grid gap-y-5 py-6">
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
  const article = data?.data;
  const article_with_Slug = article.map((a:IPost)=>({
      ...a,
      slug: generateSlug(a.title)

  }))
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = article_with_Slug?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(article_with_Slug.length / postsPerPage);
  const isLastPage = currentPage === totalPages;


  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (

    <>
      <Head>
        <title>Townhall Blog - Team Updates</title>
        <meta
          name="description"
          content="Welcome to Townhall. Townhall is a community mobilization app that enables organizations, the public, and causes to create & efficiently manage localized assemblies, interaction, and momentum around common goals."
        />
        <meta property="og:image" content="https://townhall.mobi/assets/newLogo-644ec576.png" />
      </Head>
      <div className="bg-townhall-background font-worksans -mt-5">
        <header className="mt-0 mx-auto">
          <BlogNavbar />
          <h1 className="text-townhall-black100 font-roboto-slab leading-[3rem] text-4xl lg:text-6xl font-semibold w-4/5 mx-auto my-0 text-center mt-10">Townhall Team Updates</h1>
          <p className="text-center mt-4 text-townhall-black50 font-worksans text-[1.3125rem] font-medium">
            Here on our blog, we give regular progress updates to our Users.
          </p>
        </header>
        <main>
          <h2 className="text-townhall-black100 font-roboto-slab text-3xl lg:text-4xl font-semibold lg:w-[90%] min-[1280px]:w-4/5 mx-auto my-0 text-center mt-40 mb-20">Recent Posts</h2>
          <div className="grid md:grid-cols-2 my-5 w-[90%] lg:w-[90%] min-[1280px]:w-4/5 mx-auto justify-center md:gap-x-7 lg:gap-x-14 3xl:grid-cols-3 gap-y-20 mb-40">

            {
              Array.isArray(currentPosts) && currentPosts.length > 0 && currentPosts.map((a: IArticle) => <BlogCard {...a} key={a.id} />)
            }


          </div>
          <div className="mt-5 mb-20 d-flex justify-content-center  align-items-center">
            <Pagination
              totalPages={totalPages}
              onPageChange={paginate}
              currentPage={currentPage}
              isLastPage={isLastPage}
            />
          </div>
        </main>
        <BlogFooter />
      </div>
    </>

  );
}

export default Index;
