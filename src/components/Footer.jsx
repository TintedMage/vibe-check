'use client'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-4">
            <div className="container text-center">
                {/* Footer note */}
                <p className="text-muted small">
                    Made with ❤️ by Khushal Naik — aka <i>TintedMage</i>&nbsp;&nbsp;|&nbsp;&nbsp;© {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}

export default Footer;  