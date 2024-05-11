import React from "react";

const Footer = (props) => {
    let currentYear = new Date().getFullYear()
  return (
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
              {props.copyright}
          </p>
      </div>
  )
}

export default Footer;