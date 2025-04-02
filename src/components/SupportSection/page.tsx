import Accordion from "../Accordion/accordion"

export const SupportSection = () => {
    const emailAddress = "team@devscareeraccelerator.com";
    const handleMailto = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const emailAddress = "team@devscareeraccelerator.com";
      const mailto = `mailto:${emailAddress}`;
      window.location.href = mailto;
    };
    
    return (
        <>
            <div id="faq" className="w-full max-w-full px-4 sm:px-6 mx-auto py-10 overflow-hidden">
                <div className="flex justify-center">
                    <h1 className="text-center text-3xl md:text-4xl font-semibold max-w-lg">
                        Curious? We&apos;ve Got Answers!
                    </h1>
                </div>
                <Accordion />
            </div>
            <div className="px-4 sm:px-6 mx-auto py-10 md:py-14 overflow-hidden">
                <div className="relative overflow-hidden text-white">
                    <div 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            filter: "brightness(0.4) blur(1px)",
                            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 20%), url('/abstract.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    ></div>
                    <div className="absolute inset-0 shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"></div>
                    <div className="flex flex-col items-center relative z-10 p-4 sm:p-6 md:p-10 lg:p-20">
                        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-center">
                            Need Help? We&apos;re Here for You!
                        </h1>
                        <div className="text-gray-300 mt-4 md:mt-6 font-semibold text-center md:max-w-2xl text-sm sm:text-base">
                            Got questions or need assistance with the program? Our team is just an email away. Reach out anytime, and we&apos;ll be happy to support you on your journey!
                        </div>
                        <div className="w-full flex justify-center mt-4 md:mt-6">
                                <button className="p-2 sm:p-3 md:p-4 text-xs rounded-full !bg-[rgb(149,126,234)] text-white hover:text-black shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] max-w-xs sm:max-w-sm md:max-w-md truncate" onClick={handleMailto}>
                                    {emailAddress}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}