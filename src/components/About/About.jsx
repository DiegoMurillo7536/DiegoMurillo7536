import me from "../../assets/me.jpg";
import React from 'react';

import "./About.css" 
const About = () => {
  return (
    <div className="flex flex-row justify-evenly mt-5">
        <div className=" w-1/4 shadow-2xl">
      <img src={me} className="rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300" alt=""/>
        </div>
      <div className="w-1/2 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
        <p className={`text-lg bg-cerulean-100 to-cerulean-300 text-cerulean-900 shadow-2xl rounded-lg p-20`}>
          ¡Hola! Creo que si llegaste hasta aquí es porque quieres que te ayude a
          solucionar uno o varios problemas que tienes, y pienso que te puedo
          dar las mejores soluciones, no lo digo solamente por mis habilidades
          técnicas, sino también por mis habilidades blandas. Pienso que ir solo te hace llegar más
          rápido pero el ir con alguien te hace llegar más lejos, adicional el
          hecho de tener compañeros que te ayuden a mejorar es una gran manera
          de progresar teniendo una competencia sana. Considero que soy una
          persona resiliente, y si hay algún cambio, puedo adaptarme con
          facilidad al proceso, si te gustan los videojuegos o cosas relacionadas
          a la naturaleza lo podemos hablar. Capaz terminemos resolviendo más
          cosas de las que piensas.
        </p>
      </div>
    </div>
  );
};

export default About;
