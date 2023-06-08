import React from 'react';
import {fetchSupabase} from "../../utils/supabase"
import Link from "next/link";

const fetchBlogs = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000))
    const res = await fetchSupabase({cache:"no-store",     next: { revalidate: 30 }},"/rest/v1/blogs?select=*")
    const blogs = await res.json()
    return blogs;
}

export default async function BlogList() {
    const blogs = await fetchBlogs();
    return (
        <div className="p-4 ">
            <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
                Blogs
            </p>
            <ul>
                {blogs?.map((blog) => (
                    <li key={blog.id} className="my-1 text-base">
                        <Link prefetch={false} href={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

