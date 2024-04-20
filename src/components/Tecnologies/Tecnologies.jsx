import python from "../../assets/tecnologies/python.png"
import django from "../../assets/tecnologies/django.png"
import fastapi from "../../assets/tecnologies/fastapi.svg"
import mysql from "../../assets/tecnologies/mysql.png"
import git from "../../assets/tecnologies/git.png"
import react from "../../assets/tecnologies/react.png"
import aws from "../../assets/tecnologies/aws.png"
import javascript from "../../assets/tecnologies/javascript.png"


const Tools = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-cerulean-100 to-cerulean-300 shadow-2xl m-10 rounded-lg p-14">
    <h1 className="text-3xl font-bold text-cerulean-800 text-center"> Las tecnologías que utilizo</h1>

    <div className="grid grid-cols-8 gap-20  mt-6">
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
        <img src={python}  alt="" />
        <p className="text-center">Python</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={django} width="100" alt="" />
      <p className="text-center">Django</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={fastapi} alt="" />
      <p>FastAPI</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={mysql} alt="" />
      <p>MySQL</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={javascript} alt="" />
      <p>JavaScript</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={react} alt="" />
      <p>React</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
        <img src={aws} alt="" />
        <p>AWS</p>
      </div>
      <div className="h-32 w-32   rounded-lg  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 text-center">
      <img src={git} alt="" />
      <p>Git</p>
      </div>

    </div>
    </div>
    </>
  );
};

export default Tools;
