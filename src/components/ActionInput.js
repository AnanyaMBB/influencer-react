import './ChatSearch.css';

export default function ChatSearch(props) {

    return (
        <>
            <div className="component-container">
                <div className="title">
                    <p>Action Input</p>
                </div>
                <div className="chat-search">
                    <input
                        type="text"
                        placeholder={props.placeholder}
                        value={props.searchQuery}
                        onChange={(e) => props.setSearchQuery(e.target.value)}
                    />                    
                </div>
            </div>
        </>
    );
}