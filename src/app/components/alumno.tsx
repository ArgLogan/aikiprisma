import Image from 'next/image';
import type {Alumno} from '../funcs/models'

interface AlumnoProps {
    // Define the expected props here, for example:
    // name: string;
    alumno:Alumno ;

}

const AlumnoCard = (props: AlumnoProps)=>{
    const {alumno} = props

    return (
        
        <main className='bg-gray-200 grid grid-cols-[15%_84%] gap-2 w-full min-h-[3rem] p-1 rounded-lg mb-1'>
            <section className='bg-gray-100 w-full h-11 p-1 rounded flex justify-center items-center'>
                <Image className='border-black rounded-lg' src={alumno.foto} alt={alumno.nombre} width={40} height={40} />
            </section>
            <section className='bg-gray-100 w-full h-11 px-4 flex items-center rounded' >
                <h1 className='text-lg font-semibold text-black  w-full'>{alumno.nombre}</h1>
            </section>

        </main>
    )
}

export default AlumnoCard