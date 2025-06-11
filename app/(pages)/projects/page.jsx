import { PageHeaderText } from "@/base/text/PageHeaderText";
import { FancySection } from "./components/FancySection";
import client from "@/app/lib/sanity";

export default async function ProjectPage() {
const posts = await client.fetch(`*[_type == "post"]{
  title,
  slug,
  body,
  image {
    asset->{
      url
    }
  }
}`);

  console.log(posts);
  return (
    <>
      <section>
        <PageHeaderText>This is the about page...SPARTA!</PageHeaderText>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis velit
          veritatis, iusto voluptas nulla asperiores eligendi alias vitae
          possimus! Quod facilis ducimus accusamus dolore cumque, iste possimus
          sapiente recusandae laboriosam.
        </p>
      </section>
      <ul>
        {posts.map((post) => (
          <li key={post.slug.current}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {post.image && post.image.asset && (
              <img src={post.image.asset.url} alt={post.title} />
            )}
          </li>
        ))}
      </ul>
      <FancySection />
    </>
  );
}
