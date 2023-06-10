'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {supabaseClient} from '../../utils/supabase'
import useStore from '../../store'

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    (async () => {
      const { data:{session} } = await supabaseClient.auth.getSession()
      if (session) {
        updateLoginUser({
          id: session?.user.id,
          email: session?.user.email!,
        })
      }
    })()

    // ユーザーのセッション情報を監視
    supabaseClient.auth.onAuthStateChange((_, session) => {
      // 最新のログインユーザーに更新する
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      // サーバーとクライアントのtokenが一致しない場合はサーバーコンポーネントを再実行する
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken])
  return null
}
