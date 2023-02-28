import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { BsGlobe } from 'react-icons/bs'


export default function PageHeader() {
    return (
        <div>
            <div>
                <img className="h-32 w-full object-cover lg:h-48" src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' alt="" />
            </div>
            <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 flex items-end space-x-5">
                    <div className="flex">
                        <img className="h-24 w-24 rounded-2xl ring-4 ring-gray-900 sm:h-32 sm:w-32" src='https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' alt="" />
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-end space-x-6 sm:mb-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0">
                                <a href="#">
                                    <span className="sr-only">Twitter</span>
                                    <AiOutlineTwitter className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                                </a>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#">
                                    <span className="sr-only">Instagram</span>
                                    <AiOutlineInstagram className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                                </a>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#">
                                    <span className="sr-only">Website</span>
                                    <BsGlobe className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
