const Projects = () => {
    return(
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-cerulean-100 to-cerulean-300 shadow-2xl m-10 rounded-lg p-10">
        <h1 className="text-3xl font-bold text-cerulean-800"> Mis proyectos</h1>
        <div className="flex flex-row justify-around w-full mt-6">
            <div className="h-96 w-96 border border-cerulean-800 rounded-lg bg-cerulean-100 to-cerulean-300 text-cerulean-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">Proyecto 1</div>
            <div className="h-96 w-96 border border-cerulean-800 rounded-lg bg-cerulean-100 to-cerulean-300 text-cerulean-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"> Proyecto 2</div>
            <div className="h-96 w-96 border border-cerulean-800 rounded-lg bg-cerulean-100 to-cerulean-300 text-cerulean-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">Proyecto 3</div>
            <div className="h-96 w-96 border border-cerulean-800 rounded-lg bg-cerulean-100 to-cerulean-300 text-cerulean-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">Proyecto 4</div>
        </div>
      </div>
        
    )
}
export default Projects