// import BlogListStatic from '../components/blog-list-static'
import RefreshBtn from '../components/refresh-btn'
import BlogList from "@/app/components/blog-list";
import Spinner from "@/app/components/spinner";

import { Suspense } from 'react'

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <section className="flex">
            <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200 p-2`}>
                <Suspense fallback={<Spinner color="border-green-500" />}>
                {/*@ts-ignore*/}
                <BlogList/>
                </Suspense>
                <div className="flex justify-center">
                    <RefreshBtn />
                </div>
            </aside>
            <Suspense fallback={<Spinner color="border-green-500" />}>
                <main className="flex flex-1 justify-center">{children}</main>
            </Suspense>
        </section>
    )
}
