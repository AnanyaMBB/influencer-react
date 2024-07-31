import './ChatSearch.css';

export default function ChatSearch(props) {

    return (
        <>
            <div className="component-container">
                <div className="title">
                    <p>Chat Search</p>
                </div>
                <div className="chat-search">
                    <input
                        type="text"
                        placeholder="Describe your ideal influencer"
                        value={props.searchQuery}
                        onChange={(e) => props.setSearchQuery(e.target.value)}
                    />
                    <button type="button" onClick={props.filterResults}>
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </div>
            </div>
        </>
    );
}