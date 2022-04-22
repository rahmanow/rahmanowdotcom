import React from "react";

const SocialLinks = (props) => {
    const links = props.links.map((social, index) => {
        return (
            <div>
                <a key={index} href={social.url} className="text-gray-400 hover:text-gray-500" target="_blank"
                   rel="noopener noreferrer">
                    <span className="sr-only">{social.name}</span>
                    <img className="w-6 opacity-40 hover:opacity-80 transition duration-300" src={social.icon} alt={social.name}/>
                </a>
            </div>
        );
    });
  return (
      <div className="flex justify-center mt-8 space-x-6">
          {links}
      </div>
  )
}

export default SocialLinks