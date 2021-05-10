import "./Preloader.css";

export function Preloader(){
    return (
    <div className="preloader">
        <div id="square-loader" style={{width: 60}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <h5>Loading...</h5>
        </div>
    </div>
    );
}