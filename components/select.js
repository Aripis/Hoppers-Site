import Label from '../components/label';

const Select = props => (
    <>
        <style jsx>{`
            select {
                position: relative;
                background: transparent;
                background-image: none;
                display: inline-block;
                outline: none;
                color: #888888;
                cursor: pointer;
                z-index: 2;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: .4em;
                padding: .7em 1.1em .7em .4em;
                text-overflow: "";
                text-indent: 5px;
                transition: .3s;
                width: 13rem;
            }

            select:hover{
                box-shadow: 0 0 .15em .03em #0089fa;
                border: 1px solid transparent;
            }

        `}</style>
        <select className="select" onChange={props.onChange}>
            {props.children}
        </select>
    </>
)

export default Select;