
import { Homepage } from '@/Components/homepage'
import { SignIn } from '@/app/SignIn/page'
import { SignUp } from '@/app/signup/page'
import Loading from './loading'
import Image from 'next/image'

// className="flex min-h-screen flex-col items-center justify-between p-24"
export default function Home() {
  return (
    <main className=''>
      <div className=''>
        <Homepage></Homepage>
      </div>
    </main>
  )
}
