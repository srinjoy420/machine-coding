import { useUrlStore } from '../store/Urlstore.js'  // ✅ updated import
import { useState } from 'react'

export const HomePage = () => {
    const [originalUrl, setOriginalUrl] = useState("")
    const { isLoading, currentLink, handleShortUrl } = useUrlStore()  // ✅ updated

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleShortUrl({ OriginalUrl: originalUrl })
        setOriginalUrl("")
    }

    return (
        <div className='h-screen grid lg:grid-cols-2 place-items-center'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12 w-full'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-bold mt-2'>Url Shortener</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={originalUrl}
                        placeholder='enter your link'
                        onChange={(e) => setOriginalUrl(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Generating..." : "Shorten"}
                    </button>
                </form>
                {currentLink && (
                    <div>
                        <p>Your Short URL:</p>
                        <a href={currentLink} target='_blank' rel="noreferrer">
                            {currentLink}
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}