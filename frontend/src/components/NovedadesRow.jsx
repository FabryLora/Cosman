import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NovedadesRow({ novedadesObject }) {
    const { fetchNovedades } = useStateContext();
    const [editable, setEditable] = useState(false);

    // Precio
    const [image, setImage] = useState();
    const [title, setTitle] = useState(novedadesObject.title);
    const [text, setText] = useState(novedadesObject.text);
    const [featured, setFeatured] = useState(novedadesObject.featured ? 1 : 0);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("featured", featured);
        if (image) {
            formData.append("image", image);
        }

        try {
            // 1. Crear el producto
            const productResponse = await axiosClient.post(
                `/novedades/${novedadesObject.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // ID del producto recién creado

            // 2. Subir imágenes

            console.log("Producto e imágenes creadas:", productResponse);

            fetchNovedades();

            alert("Novedad creado con éxito.");
            setEditable(false);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto.");
        }
    };

    const deleteGroup = async () => {
        try {
            await axiosClient.delete(`/novedades/${novedadesObject.id}`);
            fetchNovedades();
        } catch (error) {
            console.error("Error al eliminar la novcedad:", error);
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto">
                {editable ? (
                    <div className="text-center items-center h-fit self-center flex flex-col justify-start gap-3">
                        <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        />
                        <div className=" flex text-sm/6 text-gray-600">
                            <label
                                className="text-white cursor-pointer bg-blue-500 py-2 px-4 rounded"
                                htmlFor="fileInput"
                            >
                                Cambiar imagen
                            </label>
                            <input
                                accept="image/*"
                                id="fileInput"
                                name="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row gap-2">
                        <div className="relative flex justify-between items-center h-[100px]">
                            <img
                                className="w-full h-full object-cover"
                                src={novedadesObject.image_url}
                                alt=""
                            />
                        </div>
                    </div>
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    novedadesObject?.title
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                ) : (
                    <p className="overflow-hidden max-w-[200px]">
                        {novedadesObject?.text}...
                    </p>
                )}
            </td>

            <td className="px-6 py-4 text-center">
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                />
            </td>

            <td>
                {editable ? (
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-blue-500 rounded-md text-white py-2"
                            onClick={() => setEditable(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-green-500 rounded-md text-white py-2"
                            onClick={handleSubmit}
                        >
                            Guardar
                        </button>
                        <button
                            className="bg-red-500 rounded-md text-white py-2"
                            onClick={deleteGroup}
                        >
                            Eliminar
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-blue-500 rounded-md text-white py-2 px-6"
                        onClick={() => setEditable(true)}
                    >
                        Editar
                    </button>
                )}
            </td>
        </tr>
    );
}
