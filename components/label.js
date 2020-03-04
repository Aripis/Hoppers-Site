const Label = props => (
    <>
        <style jsx>{`
            label {
                color: grey;
                position: absolute;
                margin: .81em 1.05em 0;
                font-size: 1em;
                user-select: none;
                transform: translateZ(0);
                transition: .2s;
                pointer-events: none;
            }

            :global(.${props.on}:not([value=""])) + label{
                margin: -1.5em 0 0 .3em;
                color: black;
                font-size: .75em;
            }

            
            :global(.${props.on}):focus + label {
                margin: -1.5em 0 0 .3em;
                color: #0089fa;
                font-size: .75em;
            }      

            :global(.${props.on}:not([value=""])) + label.error{
                color: #9f3a38;
            }
            
            :global(.${props.on}):focus + label.error {
                color: #9f3a38;
            }

            .required:after{
                content: '*';
                color: red;
                margin-left: .25em;
            }
            
            @media only screen and (max-width: 985px){
                label {
                    margin: 2.2em 1.05em 0;
                    font-size: 1em;
                }

                :global(.${props.on}:not([value=""])) + label{
                    margin: .2em 0 0 0;
                }

                :global(.${props.on}):focus + label {
                    margin: .2em 0 0 0;
                }
            }
        `}</style>
        <label className={`${props.required ? "required" : ""} ${props.error ? "error" : ""} ${props.className || ""}`} htmlFor={props.htmlFor}>{props.content}</label>

    </>
)

export default Label;