import Image from 'next/image'
import NotesList from "@/app/components/notes-list";
import Spinner from "@/app/components/spinner";
import {Suspense,ReactNode} from "react";
import RefreshBtn from "@/app/components/refresh-btn";
import TimerCounter from "@/app/components/timer-counter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>Hello, world</p>
        <Suspense fallback={<Spinner color="border-green-500" />}>
            {/* @ts-expect-error Async Server Component */}
            <NotesList />
        </Suspense>
        <TimerCounter/>
        <RefreshBtn/>
    </main>
  )
}
