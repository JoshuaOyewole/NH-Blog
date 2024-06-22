interface IPost {
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

export async function getAllPostSlugs() {
    const response = await fetch('https://townhall.empl-dev.site/api/blog/list_writeups?currentPage=1&limit=10');
    const data = await response.json();


    const product = await fetch(`https://townhall.empl-dev.site/api/blog/writeup_details?id=51`).then((res) => res.json())

    console.log(product);

    // Assuming your API response returns an array of objects with 'slug' property
    const slugs = data.data.map((post: IPost) => ({ slug: post.data.id.toString() }));

    return slugs;
}

export async function getPostData(slug: String) {
    // Fetch the post data based on the slug
    const postData = await fetch(`https://townhall.empl-dev.site/api/blog/writeup_details?id=${slug}`).then(res => res.json());

    console.log(postData);

    return postData;
}
