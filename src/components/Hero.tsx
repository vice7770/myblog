import react from 'react';
import Image from "next/image";
import Link from 'next/link';

const Hero = () => {
    const sideImage = "/hero/att.woPv_TnHtpckDhIgqNCyK6KWNJzbr9cd4Vtkv3E7FMU.jpg";
  return (
    <div className="flex items-center justify-center py-20">
      <section className="w-2/3 lg:h-[400px] rounded-xl border-4 border-blue-400 flex justify-center">
        <div className="hidden lg:flex lg:pl-xl lg:justify-center lg:items-center lg:gap-[64px] lg:flex-1 lg:w-full max-lg:flex-col p-6">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="flex-1 lg:pr-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to My Blog
            </h1>
            <p className="text-xl text-gray-700 mb-6">
            My name is Vicente Almeida a developer from Portugal. I am a full stack developer with a passion for web development and design.
            </p>
            <div className='flex w-1/3 justify-between items-center gap-4'>
              <Link
                  className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20"
                  href="https://github.com/vice7770"
                  target="_blank"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>                
              </Link>
              <Link
                  className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20"
                  href="https://www.linkedin.com/in/vicente-almeida-89a035148/"
                  target="_blank"
              >
                  <svg xmlns="" width="36" height="36" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>

              </Link>
              <a className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20" href="mailto:vicente.cra45@gmail.com">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                      <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/>
                  </svg>
              </a>
            </div>
          </div>

          <div className="flex-1 mt-8 lg:mt-0">
            <Image
              src={sideImage}
              alt="Picture of the author"
              objectFit="cover"
              className="w-full h-auto rounded-lg shadow-lg"
              layout="responsive"
              height={480}
              width={480}
            />
          </div>
        </div>
      </div>
      {/** MOBILE */}
        <div className="flex lg:hidden sm:items-center sm:justify-center sm:flex-col p-6">
          <div className="flex flex-col items-center justify-center gap-5 w-full">
            <h1 className="text-2xl sm:text-3xl text-gray-900 text-center">Welcome to My Website</h1>
            <p className="text-base sm:text-lg text-gray-700 text-center mb-6">
              My name is Vicente Almeida, a developer from Portugal. I am a full stack developer with a passion for web
              development and design.
            </p>
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={sideImage}
                  alt="Picture of Vicente Almeida"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <Link
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-3 text-black hover:bg-white/20 transition-colors"
                href="https://github.com/vice7770"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-3 text-black hover:bg-white/20 transition-colors"
                href="https://www.linkedin.com/in/vicente-almeida-89a035148/"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <a
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-3 text-black hover:bg-white/20 transition-colors"
                href="mailto:vicente.cra45@gmail.com"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                </svg>
              </a>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Hero;