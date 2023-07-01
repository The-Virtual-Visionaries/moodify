export const HeaderCards = () => {
    return (
        <div className="container">
            <h1 className="mt-4">Hi there!</h1>
            <div className="row">
                <div className="col">
                    <div className="card mb-4" style={{
                        width: "300px",
                        height: "300px",
                    }}>
                        <div className="card-body" style={{ backgroundColor: "#e0e5ff" }}>
                            <h5 className="card-title">let's talk about feelings</h5>
                            <div className="card-footer d-flex justify-content-center align-items-center">
                                <button type="button" className="btn btn-primary" style={{ backgroundColor: "#9cadfe" }}>
                                    <a href="https://youtu.be/cKEHQ8T7UDU">Click here</a>
                                </button>
                            </div>
                    </div>
                </div>
                </div>
                    <div className="col" >
                        <div className="card mb-4" style={{
                            width: "300px",
                            height: "300px"
                        }}>
                            <div className="card-body" style={{ backgroundColor: "#daf6eb" }}>
                                <h5 className="card-title">Having a rough day?</h5>
                                <p className="card-footer">Feel better now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
