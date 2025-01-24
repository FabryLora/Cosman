import { useState } from "react";
import DefaultCard from "../components/DefaultCard";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Mangueras() {
    const { categoryInfo, subCategoryInfo } = useStateContext();

    // Obtener la categoría principal "TERMINALES Y ACCESORIOS"
    const terminalesCategory = categoryInfo.find(
        (category) => category.name.toUpperCase() === "MANGUERAS"
    );

    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    // Obtener los productos de la subcategoría seleccionada
    const filteredProducts =
        subCategoryInfo.find((info) => info.name === selectedSubcategory)
            ?.products || [];

    return (
        <div className="flex flex-row w-full py-20 px-5 font-roboto-condensed">
            {/* Lista de subcategorías */}
            <div className="w-[20%]">
                {terminalesCategory?.subcategories.map((subcategory, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory.name)}
                        className="font-bold text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left"
                    >
                        {subcategory.name}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div className="flex flex-row justify-evenly w-[80%]">
                {filteredProducts.map((product, index) => (
                    <DefaultCard key={index} cardObject={product} />
                ))}
            </div>
        </div>
    );
}
