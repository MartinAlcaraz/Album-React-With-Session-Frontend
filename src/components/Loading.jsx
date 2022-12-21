
const Loading = ({ small= false }) => {
    let loaderClass="loader";
    if (small){
        loaderClass += " loader-sm";
    } 
    return(
        <div className={loaderClass} >Loading...</div>
    )
}

export default Loading;