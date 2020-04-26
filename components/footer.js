import Link from 'next/link';

const Footer = () => (
    <>
        <style jsx>{`
            .wrp-footer {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #F6F7F9;
            }

            .wrp-footer > .footer-one {
                padding: .65em 0;
                font-weight: bold;
            }
            
            .wrp-footer > .footer-one > :global(a) {
                color: #555;
                transition: .2s;
            }

            .wrp-footer > .footer-one > :global(a):hover {
                color: black;
            }

            .wrp-footer > .footer-two {
                padding-bottom: .65em;
                display: flex;
                align-items: center;
                font-size: 0.8em;
            }
            
            .wrp-footer > .footer-two > *{
                color: #555;
            }

            .wrp-footer > .footer-two > .two-links > a {
                cursor: pointer;
                transition: .2s;
            }

            .wrp-footer > .footer-two > .two-links > a:hover{
                color: black;
            }

            @media only screen and (max-width: 560px){
                .wrp-footer > .footer-two {
                    flex-direction: column;
                }
            }

        `}</style>
        <div className="wrp-footer">
            <div className="footer-one">
                <Link href="/"><a>Aripis.com</a></Link>
            </div>
            <div className="footer-two">
                <span>Copyright © 2020 Aripis Inc. All rights reserved.&nbsp;</span>
                <div className="two-links">
                    <a>FAQ |&nbsp;</a>
                    <a>Legal Terms |&nbsp;</a>
                    <a>Privacy Policy |&nbsp;</a>
                    <a>Cookie Policy</a>
                </div>
            </div>
        </div>
    </>
)

export default Footer;