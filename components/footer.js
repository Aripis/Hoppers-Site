
const Footer = () => (
    <>
        <style jsx>{`
            .wrp-footer {
                height: 60px;
                align-items: center;
                display: flex;
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 0;
                background-color: #fff;
                text-align: center;
                display: flex;
                flex-direction: column;
            }

            .wrp-footer > .footer-one > p,
            .wrp-footer > .footer-two > * {
                margin: .1em 0;
                padding: 0;
            }

            .wrp-footer > .footer-one > p {
                margin: .1em 0;
                padding: 0;
            }

            .footer-two {
                display: flex;
            }

        `}</style>
        <div className="wrp-footer">
            <div className="footer-one">
                <p>Aripis.com</p>
            </div>
            <div className="footer-two">
                <p>Copyright © 2020 Aripis Inc. All rights reserved.</p>
                <a>FAQ</a>
                <a>Legal Terms</a>
                <a>Privacy Policy</a>
                <a>Cookie Policy</a>
            </div>
            
        </div>
    </>
)

export default Footer;