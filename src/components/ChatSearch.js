import './ChatSearch.css';

export default function ChatSearch() {

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
                    />
                    <button>
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </div>
            </div>
        </>
    );
}