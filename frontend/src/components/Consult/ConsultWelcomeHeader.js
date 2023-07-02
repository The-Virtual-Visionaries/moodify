export function ConsultWelcomeHeader({toggleWelcome, scheduleConsult, setJoinMeetingTrue}) {
    function schedule() {
        toggleWelcome();
        scheduleConsult();
    }

    function joinMeeting() {
        toggleWelcome();
        setJoinMeetingTrue();
    }
    return (
        <>
            <div className="consult-welcome-header">
                <div className="quote-container">
                    <h1>
                        Just because no one else can heal or do your inner work for you doesn’t mean you can, should, or need to do it alone.
                    </h1>
                    <p>- Lisa Olivera</p>
                </div>
                <div className="buttons-container">
                    {/* Change the showWelcome value to false */}
                    <button className="btn btn-primary" onClick={ joinMeeting }>Join Meeting</button>
                    <button className="btn btn-secondary" onClick={ schedule }>Schedule a Meeting</button>
                </div>
            </div>
        </>
    );
};