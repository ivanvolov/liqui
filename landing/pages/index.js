import Head from "next/head";

export default function Home() {
  return (
    <div className="App bg-black1">
      <header class="flex flex-wrap place-items-center bg-black1">
        <section class="relative mx-auto">
          <nav class="flex container justify-between text-white w-screen">
            <div class="px-5 lg:px-4 xl:px-8 py-6 flex w-full items-center">
              <a
                href="#"
                class="flex title-font font-sans items-center text-white md:mb-0"
              >
                <img
                  class="object-cover object-center rounded xl:mx-5 lg:mx-3"
                  alt="logo"
                  src="logo.svg"
                  width="33px"
                  height="33px"
                />
              </a>

              <nav class="hidden pb-1  md:flex  lg:pl-8 mx-auto  text-2xl lg:space-x-10 space-x-8 text-gray1-g75 font-sans font-semibold">
                <a
                  href="https://conditional.gitbook.io/docs/"
                  class="mr-5 hover:text-white"
                >
                  Build
                </a>
                <a class="mr-5 hover:text-white">Blog</a>
                <a class="mr-5 hover:text-white">Analytics</a>
                <a class="mr-5 hover:text-white">We're hiring</a>
              </nav>
              <a
                href="https://appconditional.netlify.app/"
                class="hidden md:block pb-2 bg-transparent text-white font-sans font-medium text-xl pt-2 pb-3 px-6 border-orange1 border-2 hover:border-transparent rounded-full "
              >
                App
              </a>
            </div>

            <a
              class="navbar-burger self-center mr-5 sm:mr-15 md:hidden"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </header>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex xl:px-10 lg:px-5 px-0 md:pr-0 md:pl-10  lg:py-24 py-6 sm:flex-row flex-col items-center">
          <div class="md:w-full lg:w-9/12 xl:w-8/12 lg:pr-12 md:pr-16 flex flex-col lg:items-start lg:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-6xl lg:text-7xl text-6xl mb-1 font-medium font-sans text-white">
            Modular DEX
            </h1>
            <div class="flex justify-center md:flex-row flex-col-reverse ">
              <a
                href="https://appconditional.netlify.app/"
                class="inline-flex items-center justify-center lg:px-20 md:px-12 px-20 my-10 md:my-6 xl:my-10 text-white bg-orange1 rounded-full sm:pt-2 sm:pb-3 py-2 sm:py-0  font-sans font-medium text-3xl xl:text-4xl focus:outline-none"
              >
                <div>Trade now </div>
              </a>

              <a
                href="https://conditional.gitbook.io/docs/"
                class="text-gray1-g75 text-3xl lg:text-4xl inline-flex items-center justify-center md:pl-12 pl-5 md:-mt-3 mt-8 font-sans font-semibold focus:outline-none"
              >
                Start building
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-8 h-8 sm:mt-2 mt-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div class="flex justify-center md:justify-start pt-3  md:pt-0">
              <button class=" rounded-full h-12 w-12 flex items-center justify-center">
                <img
                  class="object-cover object-center rounded"
                  alt="twitter"
                  src="twitter.svg"
                  width="40px"
                  height="40px"
                />
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center ">
                <img
                  class="object-cover object-center rounded"
                  alt="discord"
                  src="discord.svg"
                  width="40px"
                  height="40px"
                />
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center ">
                <img
                  class="object-cover object-center rounded"
                  alt="medium"
                  src="medium.svg"
                  width="40px"
                  height="40px"
                />
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center ">
                <img
                  class="object-cover object-center rounded"
                  alt="telegram"
                  src="telegram.svg"
                  width="40px"
                  height="40px"
                />
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center ">
                <img
                  class="object-cover object-center rounded"
                  alt="github"
                  src="github.svg"
                  width="40px"
                  height="40px"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 py-10 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              Don't limit yourself to just one curve, when there is an infinite
              number of them.
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-sans font-medium">
              Set any curve that you really would like to have (even as in the
              graph).{" "}
            </p>

            <div class="flex justify-center pl-3 sm:pl-0">
              <a
                href="https://conditional.gitbook.io/docs/"
                class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none"
              >
                <div>Read the docs </div>
                <img
                  class="object-cover object-center rounded pb-2"
                  alt="hero"
                  src="call_made.svg"
                  width="24px"
                  height="24px"
                />
              </a>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-fullbg - black1">
            <img
              class="object-cover object-center rounded"
              alt="Custom Curve"
              src="Section1.svg"
            />
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 sm:pt-10 lg:px-0 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              Regulate parameters to better control your risk.
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-xl md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-sans font-medium">
              Accept trades only when market conditions are met.{" "}
            </p>

            <div class="flex justify-center pl-3 sm:pl-0">
              <a
                href="https://conditional.gitbook.io/docs/"
                class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none"
              >
                <div>View all parameters </div>
                <img
                  class="object-cover object-center rounded pb-2"
                  alt="hero"
                  src="call_made.svg"
                  width="24px"
                  height="24px"
                />
              </a>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full pl-3 sm:pl-0">
            <img
              class="object-cover object-center rounded"
              alt="Point2"
              src="Section2.svg"
            />
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 py-10 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow  xl:w-1/4  lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white w-full xl:w-5/6">
              Apply 2-sided orders to create a variety of liquidity provisioning
              strategies.
            </h1>

            <div class="flex justify-center pl-3 sm:pl-0">
              <a
                href="https://conditional.gitbook.io/docs/"
                class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none"
              >
                <div>Read the docs</div>
                <img
                  class="object-cover object-center rounded pb-2"
                  alt="hero"
                  src="call_made.svg"
                  width="24px"
                  height="24px"
                />
              </a>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full md:pl-9 sm:pl-20 pl-3 pr-1  ">
            <img
              class="object-cover object-center rounded"
              alt="Point3"
              src="Point3.svg"
              width="452px"
              height="300px"
            />
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 pb-10  md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2  lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              ...And sell them to earn royalties!
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-sans font-medium">
              Decentralized liquidity fundraising.{" "}
            </p>

            <div class="flex justify-center pl-3 sm:pl-0">
              <a
                href="https://conditional.gitbook.io/docs/core-concepts/financial-nfts"
                class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none"
              >
                <div>Financial NFT's </div>
                <img
                  class="object-cover object-center rounded pb-2"
                  alt="hero"
                  src="call_made.svg"
                  width="24px"
                  height="24px"
                />
              </a>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full">
            <img
              class="object-cover object-center rounded"
              alt="Section3"
              src="Section3.svg"
            />
          </div>
        </div>
      </section>

      <footer class="text-gray-400 bg-black1 body-font pt-8 ">
        <div class="container md:px-2 px-12 xl:px-10 lg:px-0 mx-auto flex items-center md:flex-row flex-col">
          <img
            class="object-cover object-center rounded lg:pb-0 pb-3"
            alt="logo"
            src="logo.svg"
            width="40px"
            height="40px"
          />

          <div class="form-control py-8 md:py-0 md:pb-5 lg:pb-0 lg:px-6 md:px-3">
            <div class="relative pb-1 md:w-11/12 lg:w-full w-full">
              <input
                type="text"
                placeholder="Email"
                class="w-full text-lg md:text-md pb-1 font-sans font-semibold pr-32 bg-black1 border-b-2"
              />
              <button class="absolute top-0 right-0 rounded-full bg-gray1-g00 px-4 text-white text-lg font-sans font-normal md:font-medium">
                Subscribe
              </button>
            </div>
            <label class="label">
              <span class="label-text font-sans text-gray1-g50 font-semibold text-sm lg:text-md -mx-1 -my-2 sm:-my-4">
                Subscribe to our blog for project updates.
              </span>
            </label>
          </div>

          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start flex-col sm:flex-row sm:text-left text-center">
            <div class="lg:w-2/4 md:w-3/4 w-full sm:ml-0 md:mx-2 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                Products
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white ">
                    Spot market
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Analytics
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Options
                  </a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full sm:mx-6  md:mx-3 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3 ">
                Developers
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">Docs</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Github
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">SDK</a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full sm:mx-5 md:mx-1 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                About
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">About</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">Team</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Careers
                  </a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full lg:mx-2 md:mx-5 sm:ml-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                Community
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Discord
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Telegram
                  </a>
                </li>
              </nav>
            </div>
          </span>
        </div>
      </footer>
    </div>
  );
}
