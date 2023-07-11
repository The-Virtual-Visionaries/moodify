import '../../styles/Resources/HeaderCard.css'

export const HeaderCards = (props) => {

    return (
        <div className="header-card" style={{backgroundColor: props.bgColor}}>
            <div className="card-title">{props.description}</div>
            <div className='card-subtext'>{props.subtext}</div>
            <div className='resource-button-container mt-auto'>
                <button type="button" className="resource-button">
                <a href={props.link} target="_blank">{props.buttonText}</a>
            </button>
            </div>
        </div>
    );
};
