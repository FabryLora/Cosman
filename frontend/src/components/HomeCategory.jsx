import {Link} from "react-router-dom"
export default function HomeCategory({bgImage, categoryTitle}) {
  return (
    <Link to={"#"} className="flex relative justify-center items-center bg-cover bg-no-repeat bg-center w-full h-[365px]" style={{backgroundImage: `url(${bgImage})`}}>
        <div className="absolute w-full h-full bg-black opacity-50"></div>
        <h2 className="absolute z-10 text-[28px] text-white font-roboto-condensed font-semibold">{categoryTitle.toUpperCase()}</h2>
    </Link>
  )
}
