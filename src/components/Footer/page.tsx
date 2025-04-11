
import { CA } from "../CALogo/Calogo"


export const Footer = () => {
    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 my-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div>
                        <CA />
                    </div>
                    <div className="mt-4 sm:mt-6 font-bold text-base sm:text-lg">
                        Where Developers Get Coding Jobs
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 w-full md:w-3/4">
                        Find your dream coding job with ease! Our platform connects developers to top companies, offering tailored job matchers for fast, hassle-free firing. Whether you&apos;re just starting or an experienced pro, we help you land the perfect role and advance your career.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between md:justify-end gap-6 md:gap-x-10 text-sm/6 mt-4 md:mt-13 px-4 md:pr-13">
                    <div className="flex flex-col gap-2">
                        <a href={'/'} className="hover:underline">Home</a>
                        <a href={'/about-us'} className="hover:underline">About Us</a>
                        <a href={'/our-team'} className="hover:underline">Our Team</a>
                        <a href={'/blogs'} className="hover:underline">Blogs</a>
                        <a href={'#faq'} className="hover:underline">FAQs</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href={'/privacy-policy'} className="hover:underline">Privacy Policy</a>
                        <a href={'/terms-conditions'} className="hover:underline">Terms & Conditions</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href={'/search-for-jobs'} className="hover:underline">Explore Jobs</a>
                        <a href={'/start-hiring'} className="hover:underline">Start Hiring Developers</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 p-3 sm:p-5 mx-4 sm:mx-10">
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                    <div className="text-xs sm:text-sm text-center sm:text-left">
                        © 2025 Careeraccelerator. All rights reserved.
                    </div>
                    <div className="flex gap-x-2 justify-center sm:justify-start">
                        <a href={"https://www.linkedin.com/company/persist-ventures/"}>
                            <div className="border rounded-full bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 hover:bg-purple-400">
                                <text fontSize="small" className="mb-0.5 text-gray-500 hover:text-white">
                                <img className="w-8 h-8" src="/linkedin.png"/></text>    
                            </div>
                        </a>
                        <a href={"https://www.linkedin.com/company/persist-ventures/"}>
                            <div className="border rounded-full bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 hover:bg-purple-400">
                                <text fontSize="small" className="mb-0.5 text-gray-500 hover:text-white">
                                    <img className="w-8 h-8" src="/discord.png"/>
                                    </text>    
                            </div>
                        </a>
                        <a href={"https://x.com/PersistVentures"}>
                            <div className="border rounded-full bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 hover:bg-purple-400">
                                <text fontSize="small" className="mb-0.5 !text-gray-500 hover:text-white">
                                <img className="w-8 h-8" src="/twitter.png"/></text>    
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}