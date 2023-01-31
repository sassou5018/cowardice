'use client';

export default function SearchBar() {
    const searchEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Search")
    }
    return (
        <div className='ml-9 mr-10 sm:ml-28'>
            <form onSubmit={searchEvent}>
                <input
                    type='text'
                    placeholder='Search'
                    className='placeholder:text-center placeholder:text-white placeholder:opacity-80 bg-stone-700 text-white w-12 sm:w-auto'
                />
            </form>
        </div>
    )
}
