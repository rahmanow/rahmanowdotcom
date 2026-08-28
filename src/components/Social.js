import React from "react";

const SocialLinks = (props) => {
    const links = props.links.map((social) => {
        return (
            <div key={social.name}>
                <a href={social.url} className="text-gray-400 hover:text-gray-500" target="_blank"
                   rel="noopener noreferrer">
                    {/* The sr-only span names the link; the icon is decorative so it
                        is not announced a second time. */}
                    <span className="sr-only">{social.name}</span>
                    <img className="w-6 opacity-40 hover:opacity-80 transition duration-300" src={social.icon} alt=""/>
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
