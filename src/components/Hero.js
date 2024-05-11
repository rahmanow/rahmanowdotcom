import React from "react";

const Hero = (props) => {
    const ordered = props.skills.sort((a, b) => b.level - a.level);
    let skills = ordered.map(skill => {
        const level = skill.level;
        return (
                <div className={
                        level === "5" ? "text-gray-800"
                        : level === "4" ? "text-gray-500"
                            : level === "3" ? "text-gray-400"
                                : level === "2" ? "text-gray-200"
                                    : level === "1" ? "text-gray-100"
                                        : "hidden"} key={skill.id}><span className={"text-xs"}>#</span>{skill.name}</div>
        );
    })

    return (
        <div className="mx-auto max-w-7xl">
            <div className="container max-w-lg px-4 py-12 mx-auto text-center md:max-w-none md:text-center">
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center">
                    <img className="inline object-cover w-1/2 h-1/2 mr-2 rounded-full grayscale border transition delay-150 hover:grayscale-0 duration-300" src={props.avatar} alt="Profile"/>
                </div>
                <h1 className="text-3xl flex justify-center flex-nowrap font-extrabold leading-10 tracking-tight text-gray-900 md:text-center sm:leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="mt-2">{props.name}</span> <span
                    className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-gray-500 md:inline-block">{props.surname}</span>
                </h1>
                <div className="mx-auto mt-5 text-gray-600 md:mt-12 md:max-w-lg md:text-center lg:text-lg">{props.description}</div>
                <div className="mx-auto flex gap-2 justify-center flex-wrap mt-5 md:mt-12 md:max-w-lg md:text-center lg:text-md">{skills}</div>
            </div>
        </div>
    )
}

export default Hero;

