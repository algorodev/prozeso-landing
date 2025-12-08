import prozesoLogoWhite from '@/assets/prozeso-logo-white.svg'
import Image from 'next/image'

export default function Logo() {
	return (
		<div className='flex items-center gap-2'>
			<Image width={25} height={25} src={prozesoLogoWhite} alt="Prozeso logo" />
			<p className='font-inter text-base font-bold mt-[-3px]'>
				prozeso
			</p>
		</div>
	)
}
