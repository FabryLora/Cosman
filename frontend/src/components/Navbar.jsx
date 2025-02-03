import {
    faChevronCircleRight,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import barsIcon from "../assets/icons/bars-solid.svg";
import chevronDownWhite from "../assets/icons/chevron-down-white.svg";
import chevronDown from "../assets/icons/chevron-down.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import searchIcon from "../assets/icons/search.svg";
import letterIcon from "../assets/icons/sobre.svg";
import userIcon from "../assets/icons/user-icon.svg";
import xmark from "../assets/icons/xmark-solid.svg";
import conmanLogo from "../assets/logos/conman-logo.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import DropdownButton from "./DropdownButton";
import SearchCard from "./SearchCard";

export default function Navbar() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [userLoged, setUserLoged] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);

    const { setLinkInfo } = useStateContext();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setSearch(false); // Cierra el contenedor si se hace clic fuera
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { setUserToken, userToken, userInfo, contactInfo, productInfo } =
        useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/login", {
                name: user,
                password: password,
            })
            .then(({ data }) => {
                setUserToken(data.token);
            });
    };

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id ? { ...drop, open: !drop.open } : drop
            )
        );
    };

    const socials = [
        { logo: fbIcon, href: "#" },
        { logo: igIcon, href: "#" },
    ];

    const [dropdowns, setDropdowns] = useState([
        {
            id: "Nosotros",
            open: false,
            href: "/inicio/nosotros",
            chevron: false,
        },
        {
            id: "Terminales y accesorios",
            open: false,
            href: "/inicio/terminales-y-accesorios",
            chevron: true,
            subHref: [
                { title: "Terminales", href: "/inicio/terminales" },
                { title: "Accesorios", href: "/inicio/accesorios" },
            ],
        },
        {
            id: "Mangueras",
            open: false,
            href: "/inicio/mangueras",
            chevron: true,
            subHref: [
                { title: "SAE 100", href: "/inicio/mangueras-hidraulicas" },
                {
                    title: "Para combustible",
                    href: "/inicio/mangueras-industriales",
                },
                {
                    title: "20 bar / 300 lbs",
                    href: "/inicio/mangueras-de-aire",
                },
                {
                    title: "Multiproposito verde",
                    href: "/inicio/mangueras-de-agua",
                },
                {
                    title: "Aire acondicionado",
                    href: "/inicio/mangueras-de-combustible",
                },
                {
                    title: "Inoxidable con malla",
                    href: "/inicio/mangueras-de-vapor",
                },
            ],
        },
        {
            id: "Acoples rapidos",
            open: false,
            href: "/inicio/acoples-rapidos-hidraulicos",
            chevron: true,
            subHref: [
                {
                    title: "Acople rapido hidraulico",
                    href: "/inicio/mangueras-hidraulicas",
                },
                { title: "Bolita", href: "/inicio/mangueras-industriales" },
                { title: "Punta", href: "/inicio/mangueras-de-aire" },
                { title: "Frente plano", href: "/inicio/mangueras-de-agua" },
                { title: "Mariposa", href: "/inicio/mangueras-de-combustible" },
            ],
        },
        {
            id: "Productos",
            open: false,
            href: "/inicio/productos",
            chevron: true,
            subHref: [
                {
                    title: "Articulos de lubricacion",
                    href: "/inicio/mangueras-hidraulicas",
                },
                {
                    title: "Tratamientos de aire",
                    href: "/inicio/mangueras-industriales",
                },
                { title: "Abrazaderas", href: "/inicio/mangueras-de-aire" },
                { title: "Arandelas", href: "/inicio/mangueras-de-agua" },
                {
                    title: "Prensas / Manguera",
                    href: "/inicio/mangueras-de-combustible",
                },
            ],
        },
        {
            id: "Calidad",
            open: false,
            href: "/inicio/calidad",
            chevron: false,
        },
        {
            id: "Novedades",
            open: false,
            href: "/inicio/novedades",
            chevron: false,
        },
        {
            id: "Contacto",
            open: false,
            href: "/inicio/contacto",
            chevron: false,
        },
    ]);

    return (
        <div className="flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-10">
                <div className="flex gap-4 items-center text-[14px] text-white h-[16px] max-md:hidden">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                        <p>{contactInfo?.mail}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                        <p>{contactInfo?.phone}</p>
                    </div>
                </div>
                <div className="flex fle-row gap-4 h-full items-center">
                    <div
                        ref={containerRef}
                        className="relative flex flex-row items-center gap-3"
                    >
                        <AnimatePresence>
                            <div
                                className={`flex flex-row items-center gap-2 rounded-md ${
                                    search ? "border px-2" : ""
                                }`}
                            >
                                <motion.div
                                    className={`flex items-center rounded-md overflow-hidden w-fit text-white
                                }`}
                                    animate={{ width: search ? 250 : 40 }} // Controla la expansión
                                    initial={{ width: 40 }}
                                    exit={{ width: 40 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <input
                                        id="searchid"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className={`bg-transparent outline-none w-full transition-opacity duration-300 text-base ${
                                            search ? "opacity-100" : "opacity-0"
                                        }`}
                                        autoFocus={search}
                                    />
                                </motion.div>

                                <label
                                    className="cursor-pointer"
                                    htmlFor="searchid"
                                    onClick={() => {
                                        setSearch(!search);
                                        setSearchTerm("");
                                    }}
                                >
                                    <img
                                        src={searchIcon}
                                        alt="Buscar"
                                        className="h-[15px]"
                                    />
                                </label>
                            </div>
                        </AnimatePresence>
                        <AnimatePresence>
                            {search && searchTerm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute flex flex-col top-8 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40"
                                >
                                    <h2 className="font-bold text-[24px] py-5">
                                        Resultados de busqueda
                                    </h2>
                                    <div className="flex flex-col">
                                        {productInfo
                                            .filter((product) =>
                                                product.name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    )
                                            )
                                            .map((product, index) => (
                                                <SearchCard
                                                    key={index}
                                                    searchObject={product}
                                                />
                                            ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {socials.map((social, index) => (
                        <Link key={index} to={social.href}>
                            <img src={social.logo} alt="" />
                        </Link>
                    ))}
                    <div className="flex flex-row gap-4 h-[16px] items-center justify-center max-md:hidden">
                        {!userToken && (
                            <>
                                <button onClick={() => setUserMenu(!userMenu)}>
                                    <img
                                        className="h-[15px] w-[15px]"
                                        src={userIcon}
                                        alt=""
                                    />
                                </button>
                                {userMenu && (
                                    <div className="absolute flex flex-col top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40">
                                        <h2 className="font-bold text-[24px] py-5">
                                            Iniciar sesion
                                        </h2>
                                        <form
                                            onSubmit={onSubmit}
                                            className="w-full h-full flex flex-col justify-around gap-3"
                                            action=""
                                        >
                                            <div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="user">
                                                        Usuario
                                                    </label>
                                                    <input
                                                        value={user}
                                                        onChange={(ev) =>
                                                            setUser(
                                                                ev.target.value
                                                            )
                                                        }
                                                        className="w-[328px] h-[45px] border pl-2"
                                                        type="text"
                                                        name="user"
                                                        id="user"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="password">
                                                        Contraseña
                                                    </label>
                                                    <input
                                                        value={password}
                                                        onChange={(ev) =>
                                                            setPassword(
                                                                ev.target.value
                                                            )
                                                        }
                                                        className="w-[328px] h-[45px] border pl-2"
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                className="w-[325px] h-[47px] bg-primary-red text-white self-center"
                                                type="submit"
                                            >
                                                INICIAR SESION
                                            </button>
                                        </form>
                                        <div className="flex flex-col items-center">
                                            <p>¿No tenes usuario?</p>
                                            <Link
                                                className="text-primary-red"
                                                to={"/registro"}
                                            >
                                                REGISTRATE
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {userToken && (
                        <div className="h-full relative">
                            <button
                                onClick={() => setUserLoged(!userLoged)}
                                className="w-[139px] h-full flex justify-center items-center bg-white"
                            >
                                <h2 className="font-medium text-sm text-primary-blue">
                                    {userInfo?.name
                                        ? userInfo?.name.toUpperCase()
                                        : ""}
                                </h2>
                            </button>
                            <AnimatePresence>
                                {userLoged && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{
                                            duration: 0.1,
                                            ease: "linear",
                                        }}
                                        className="absolute flex flex-col top-10 right-0 border broder-gray bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-fit z-20"
                                    >
                                        <Link
                                            className="bg-primary-red text-white text-center p-4"
                                            to={"/privado"}
                                        >
                                            SECCION PRIVADA
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
            <nav className="flex relative flex-row items-center pl-10 gap-20 w-full h-[85px] shadow-sm max-lg:justify-center">
                <Link className="" to={"/"}>
                    <img
                        src={conmanLogo}
                        alt="Logo"
                        className="min-w-[218px] min-h-[47px] object-contain"
                    />
                </Link>

                <ul className="flex flex-row gap-5 w-full max-xl:hidden">
                    {dropdowns.map((drop) => (
                        <div
                            onMouseEnter={() => toggleDropdown(drop.id)}
                            onMouseLeave={() => toggleDropdown(drop.id)}
                            className="relative flex gap-1 max-xl:text-sm items-center hover:bg-[#CBCBCB] p-2"
                            key={drop.id}
                        >
                            <Link
                                onClick={() => setLinkInfo("")}
                                className="hover:text-gray-600 whitespace-nowrap"
                                to={drop.href}
                            >
                                {drop.id}
                            </Link>
                            {drop.chevron && (
                                <img src={chevronDown} alt="Chevron" />
                            )}
                            {drop.open && drop.subHref && (
                                <div className="absolute flex flex-col top-9 left-0 bg-[#CBCBCB] shadow-md font-roboto-condensed w-[200px] h-fit z-30">
                                    {drop.subHref.map((sub) => (
                                        <Link
                                            onClick={() =>
                                                setLinkInfo(sub.title)
                                            }
                                            className="flex flex-row items-center justify-between px-2 border-b border-white hover:text-gray-600"
                                            key={sub.title}
                                            to={
                                                "/inicio/terminales-y-accesorios"
                                            }
                                        >
                                            {sub.title}
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                color={"#000"}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </ul>
                <button
                    onClick={() => setTinyMenu(!tinyMenu)}
                    className="w-[24px] h-[24px] absolute left-10 lg:hidden"
                >
                    <img src={barsIcon} alt="" />
                </button>
            </nav>
            <AnimatePresence>
                {tinyMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col absolute top-0 left-0 h-screen w-1/2 bg-primary-blue"
                        >
                            <button
                                onClick={() => setTinyMenu(false)}
                                className="absolute h-[16px] w-[16px] right-4 top-2"
                            >
                                <img src={xmark} alt="" />
                            </button>
                            <ul className="flex flex-col gap-5 p-10 text-white w-full">
                                {links.map((link) => (
                                    <div
                                        className="flex gap-1 justify-between items-center"
                                        key={link.title}
                                    >
                                        <Link to={link.href}>{link.title}</Link>
                                        {link.chevron && (
                                            <img
                                                className="w-[16px] h-[16px]"
                                                src={chevronDownWhite}
                                                alt="Chevron"
                                            />
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
