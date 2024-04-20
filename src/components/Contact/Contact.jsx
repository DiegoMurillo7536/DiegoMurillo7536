const Contact = () => {
    return(
        <>
        <div className="flex flex-row  items-center justify-around bg-gradient-to-r from-cerulean-100 to-cerulean-300 shadow-2xl m-10 rounded p-10">
            <div className="flex flex-col w-1/3 h-1/3 shadow-2xl border border-cerulean-900 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
            <h2 className="text-3xl p-2 text-center font-bold text-cerulean-800 ">¿Te gusto lo que viste?</h2>
            <h3 className="text-1xl p-2 text-center font-semibold text-cerulean-700">Puedes contactarme por acá</h3>
            <form action="" className="m-8">
                <div className="flex flex-col items-center justify-center space-y-4 ">
                    <input type="text" placeholder="Nombre" className="appearance-none rounded w-3/4 h-8 border p-2 placeholder-cerulean-950 " />
                    <input type="email" placeholder="Correo" className="appearance-none rounded w-3/4 h-8 border p-2 placeholder-cerulean-950" />
                    <input type="text" placeholder="Asunto" className="appearance-none rounded w-3/4 h-8 border p-2 placeholder-cerulean-950" />
                    <textarea placeholder="Mensaje" className="appearance-none rounded w-3/4 h-16 border p-2 placeholder-cerulean-950" ></textarea>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 ">
                    <button type="submit" className="bg-gradient-to-r from-cerulean-100 to-cerulean-200 shadow-2xl rounded-lg p-2 border">¡Enviar!</button>
                </div>

            </form>
            </div>
            <div className="flex flex-col w-1/3 h-1/3 border border-black space-y-4 overflow-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105">
                <h1 className="text-3xl p-2 text-center font-bold text-cerulean-800"> Mis últimos artículos </h1>
                <div className="flex flex-row justify-around p-4">
                    <img src="https://media.licdn.com/dms/image/D4E12AQHLT7K8xGwweg/article-cover_image-shrink_720_1280/0/1711663101880?e=1718841600&v=beta&t=yQJmtziQCBqx5wvFeUX1ce08WcNQV7_u-T0RYDUktzg"
                     alt="" className="w-1/2 h-1/2 p-4"/>
                    <p className="p-4">La importancia de pensar como ingenieros</p>
                </div>
                 <div className="flex flex-row justify-around p-4">
                    <img src="https://media.licdn.com/dms/image/D4E12AQHLT7K8xGwweg/article-cover_image-shrink_720_1280/0/1711663101880?e=1718841600&v=beta&t=yQJmtziQCBqx5wvFeUX1ce08WcNQV7_u-T0RYDUktzg"
                     alt="" className="w-1/2 h-1/2 p-4"/>
                    <p className="p-4">La importancia de pensar como ingenieros</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;