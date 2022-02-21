import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ChakraProvider, useDisclosure } from "@chakra-ui/react"

import logo from "@assets/logo.svg"
import AccountModal from "./AccountModal"
import ConnectButton from "./ConnectButton"

const Header = () => {
    const routeName = useLocation().pathname.slice(1)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <header className="flex flex-wrap place-items-center">
            <section className="relative mx-auto">
                <nav className="flex container justify-between text-white w-screen">
                    <div className=" py-6 flex w-full items-center ">
                        <button className="flex title-font font-sans items-center text-white md:mb-0">
                            <img
                                className="object-cover object-center rounded"
                                src={logo}
                                alt={"logo"}
                                width="33px"
                                height="33px"
                            />
                        </button>
                        <nav className="hidden lg:flex mx-auto text-2xl space-x-6 font-sans font-medium">
                            <div className="w-4/6 mx-auto">
                                <ul
                                    id="tabs"
                                    className="inline-flex w-full font-semibold text-gray1-g75"
                                >
                                    <NavLink
                                        to="/swap"
                                        style={{
                                            textDecoration: "none",
                                            color: "unset"
                                        }}
                                    >
                                        <li
                                            className={`px-4 py-2 ${
                                                routeName === "swap"
                                                    ? " -mb-px text-white border-b-2 border-white"
                                                    : ""
                                            }`}
                                        >
                                            Trade
                                        </li>
                                    </NavLink>
                                    <NavLink
                                        to="/mint"
                                        style={{
                                            textDecoration: "none",
                                            color: "unset"
                                        }}
                                    >
                                        <li
                                            className={`px-4 py-2 ${
                                                routeName === "mint"
                                                    ? " -mb-px text-white border-b-2 border-white"
                                                    : ""
                                            }`}
                                        >
                                            Portfolio
                                        </li>
                                    </NavLink>
                                    <li className="px-4 py-2">Charts</li>
                                    <li className="px-4 py-2">Docs</li>
                                </ul>
                            </div>
                        </nav>
                        <ChakraProvider>
                            <ConnectButton handleOpenModal={onOpen} />
                            <AccountModal isOpen={isOpen} onClose={onClose} />
                        </ChakraProvider>
                        {/* <button
                            className="flex-shrink-0 inline-flex bg-transparent text-white font-sans font-medium text-xl py-1.5 px-10 ml-3 border-orange1 border-2 hover:border-transparent rounded-full "
                            onClick={() => true}
                        >
                            account here
                        </button> */}
                    </div>
                </nav>
            </section>
        </header>
    )
}
export default Header
