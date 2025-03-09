import Image from 'next/image'

export default function Home() {
  
  return (
    <main className='w-full h-full flex items-center justify-center'>
            <Image src={'/uploads/shoshin.jpg' } alt='Shoshin dojo' width={300} height={300}/>
          </main>
  );
}
