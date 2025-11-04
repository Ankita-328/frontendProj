import React from 'react'

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated, }) => {
    return (
        <div className='bg-white relative ml-5'>
            <div className='container mx-auto px-10 md:px-0'>
                <div className="h-[200px] flex flex-col justify-center relative z-10 ">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-medium">{role}</h2>
                                    <p className="font-sm text-gray-900 text-medium mt-1">
                                        {topicsToFocus}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Experience: {experience} {experience == 1 ? "Year" : "Years"}
                        </div>
                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            {questions} Q&A
                        </div>
                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Last Updated: {lastUpdated}
                        </div>
                    </div>
                </div>
                <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
                    <div className="w-16 h-16 blur-[65px] animate-blob1 bg-lime-400" />
                    <div className="w-16 h-16 blur-[65px] animate-blob2 bg-teal-400" />
                    <div className="w-16 h-16 blur-[45px] animate-blob3 bg-cyan-300" />
                    <div className="w-16 h-16 blur-[45px] animate-blob1 bg-fuchsia-200" />
                </div>
            </div>
        </div>
    )
}

export default RoleInfoHeader