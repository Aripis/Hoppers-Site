const Message = props => (
    <>
        <style jsx>{`
            .message {
                display: flex;
                justify-content: center;
                flex-direction: column;
                padding: .875em 1.313em;
                border-radius: .4em;
                background-color: #f8ffff;
                box-shadow: 0 0 0 1px #a9d5de inset, 0 0 0 0 transparent;
            }

            .message > span.header {
                display: inline-block;
                font-size: 1.17em;
                font-weight: bold;
                color: #276f86;
            }

            .message > span.content {
                margin-top: .3em;
                color: #276f86;
                word-break: break-word;
                opacity: .85;
            }

            .message.success {
                background-color: #fcfff5;
                box-shadow: 0 0 0 1px #a3c293 inset, 0 0 0 0 transparent;
            }

            .message.success > span.header {
                color: #2c662d;
            }

            .message.success > span.content {
                color: #2c662d;
            }

            .message.error {
                background-color: #fff6f6;
                box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
            }

            .message.error > span.header {
                color: #9f3a38;
            }

            .message.error > span.content {
                color: #9f3a38;
            }
        `}</style>
        {props.visible &&
            <div className={`message ${props.success ? "success" : ""} ${props.error ? "error" : ""} ${props.className || ""}`}>
                <span className="header">{props.header}</span>
                <span className="content">{props.content}</span>
            </div>
        }
    </>
)

export default Message