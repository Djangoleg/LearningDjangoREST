import React from 'react'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerText">
                ©{(new Date().getFullYear())} by OK
            </div>
        </div>
    )
}

export default Footer
