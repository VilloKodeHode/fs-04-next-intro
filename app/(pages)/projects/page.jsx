// app/(pages)/projects/page.jsx
//
// This page fetches blog posts from a Sanity CMS backend and displays them with images.
// It demonstrates server-side data fetching, mapping over data, and rendering a custom section.
//
// Imports:
//   PageHeaderText: a styled header component
//   FancySection: a custom section component
//   client: Sanity client for fetching data
//   Image: Next.js optimized image component
import { PageHeaderText } from "@/base/text/PageHeaderText";
import { FancySection } from "./components/FancySection";
import { client } from "@/app/lib/sanity";
import Image from "next/image";

// The main Projects page component
export default async function AboutPage() {
  // Fetch all posts from the Sanity CMS backend
  const posts = await client.fetch(
    `*[_type == "post"]{
  title,
  slug,
  image {
  asset-> {
  url
  },
  },
    _id,
    body
  }`,
    {
      cache: "no-store",
    }
  );

  console.log(posts); // Log posts for debugging

  // Render the projects page, listing all posts with images and a custom section
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
        {/* Map over all posts and render each one with its image and body */}
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>slug: {post.slug.current}</p>
            <Image
              src={post.image.asset.url}
              alt={post.title}
              height={800}
              width={800}
            />
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {/* Render a custom section at the bottom */}
      <FancySection />
    </>
  );
}
