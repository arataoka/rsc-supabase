import React from 'react';
import { headers, cookies } from 'next/headers'
import createBrowserSupabaseClient, {fetchSupabase} from "@/utils/supabase";
import Link from "next/link";
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

const fetchBlog = async (blogId) => {
    const res = await fetchSupabase({cache:"no-store"},"/rest/v1/blogs?select=*");
    const blogs = await res.json();
    const blog = blogs.find(blog => blog.id === blogId);
    return blog
}

async function generateStaticParams() {
    const res = await fetchSupabase({cache:"no-store"},"/rest/v1/blogs?select=id");
    const ids = await res.json();
    return ids;
}

export default async function BlogDetailPage ({params: {blogId}}){
    const blog = await fetchBlog(blogId);
    return (
        <div className="mt-16 p-8">
            <p>
                <strong className="mr-3">Task ID:</strong> {blog.id}
            </p>
            <p>
                <strong className="mr-3">Title:</strong> {blog.title}
            </p>
            <p>
                <strong className="mr-3">Content:</strong> {blog.content}
            </p>
            <p>
                <strong className="mr-3">Created at:</strong>
                {blog && format(new Date(blog.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
            <Link href={`/blogs`}>
                <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-500" />
            </Link>
        </div>
    )
};