import React from "react";

// Skills are dimmed by proficiency; level "0" means "not shown at all".
// The ramp stops at gray-500 because every lighter shade falls below the 4.5:1
// contrast WCAG asks for on white — gray-100 and gray-200 rendered the lowest
// levels as near-invisible text.
const LEVEL_STYLES = {
    "5": "text-gray-900",
    "4": "text-gray-800",
    "3": "text-gray-700",
    "2": "text-gray-600",
    "1": "text-gray-500",
};

const Hero = (props) => {
    const skills = [...props.skills]
        .filter((skill) => LEVEL_STYLES[skill.level])
        .sort((a, b) => Number(b.level) - Number(a.level))
        .map((skill) => (
            <div className={LEVEL_STYLES[skill.level]} key={skill.name}>
                <span className="text-xs">#</span>{skill.name}
            </div>
        ));

    return (
        <div className="mx-auto max-w-7xl">
            <div className="container max-w-lg px-4 py-12 mx-auto text-center md:max-w-none md:text-center">
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center">
                    {/* width/height mirror the asset's intrinsic size so the browser
                        reserves the right box before the image loads. */}
                    <img className="inline w-1/2 h-auto mr-2 rounded-full grayscale border transition delay-150 hover:grayscale-0 duration-300"
                         src={props.avatar} width="512" height="512"
                         alt={`${props.name} ${props.surname}`}/>
                </div>
                <h1 className="text-3xl flex justify-center flex-nowrap gap-x-3 md:gap-x-5 font-extrabold leading-10 tracking-tight text-gray-900 md:text-center sm:leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="mt-2">{props.name}</span> <span
                    className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-gray-500 md:inline-block">{props.surname}</span>
                </h1>
                <div className="mx-auto mt-5 text-gray-600 md:mt-12 md:max-w-lg md:text-center lg:text-lg">{props.description}</div>
                <div className="mx-auto flex gap-2 justify-center flex-wrap mt-5 md:mt-12 md:max-w-lg md:text-center">{skills}</div>
            </div>
        </div>
    )
}

export default Hero;
