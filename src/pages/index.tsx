import BlogCard from "@/components/Blog/BlogCard";
import BlogFooter from "@/components/Blog/BlogFooter";
import BlogNavbar from "@/components/Blog/Navbar";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import Pagination from "@/components/Pagination";
import { IArticle } from "@/models/blog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const API_URL = process.env.API_URL;



function index() {
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
  const article = data?.data;
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = article?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(article.length / postsPerPage);
  const isLastPage = currentPage === totalPages;


  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="bg-townhall-background font-worksans -mt-5">
      <header className="mt-0 mx-auto">
        <BlogNavbar />
        <h1 className="text-townhall-black100 font-roboto-slab text-6xl font-semibold w-4/5 mx-auto my-0 text-center mt-10">Townhall Team Updates</h1>
        <p className="text-center mt-4 text-townhall-black50 font-worksans text-[1.3125rem] font-medium">
          Here on our blog, we give regular progress updates to our Users.
        </p>
      </header>
      <main>
        <h2 className="text-townhall-black100 font-roboto-slab text-4xl font-semibold w-4/5 mx-auto my-0 text-center mt-40 mb-20">Recent Posts</h2>
        <div className="grid lg:grid-cols-2 my-5 w-4/5 mx-auto justify-center gap-x-14 3xl:grid-cols-3 gap-y-20 mb-40">

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
  );
}

export default index;
