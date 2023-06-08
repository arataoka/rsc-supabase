import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../database.types'
import {createClient} from "@supabase/supabase-js";

const BASE_URL = process.env.url;
const API_KEY =  process.env.apikey

export const fetchSupabase = (option:object, url:string) => fetch(`${process.env.url}${url}`, {
    headers: new Headers({
        apikey: process.env.apikey as string,
    }),
    ...option
})
