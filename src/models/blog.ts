interface IBlogMedia {
    link: string,
    thumbnail: string,
    type: string
  }
  export interface IArticle {
    blog_body: string,
    blog_media: IBlogMedia[]
    date_posted: Date,
    id: number,
    posted_by_image: string,
    postedby_id: number,
    postedby_name: string,
    title: string
  }