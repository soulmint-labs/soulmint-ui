import React from 'react'
import { AiFillApple, AiFillWindows } from 'react-icons/ai';
import { FiGlobe } from 'react-icons/fi';

const posts = [
    {
        id: 1,
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    },
    {
        id: 2,
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    },
    {
        id: 3,
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    },
    {
        id: 4,
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    },

]

const StoryCard = () => {
    return (
        <div className="px-10 mb-10 mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="relative cursor-pointer isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-4 h-64 "
                >
                    <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-700 via-gray-700/40" />
                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-700/10" />

                    <div className="flex items-center justify-between overflow-hidden text-gray-300">
                        <div className='flex items-center space-x-2 text-2xl'>
                            <FiGlobe />
                            <AiFillWindows />
                            <AiFillApple />
                        </div>
                        <p>Free to play</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default StoryCard