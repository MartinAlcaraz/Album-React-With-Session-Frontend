
const ResultList = ({ users, text, setInputValue }) => {

    // click en un item de la lista
    const onClick = (e)=> {
        setInputValue(e.target.innerHTML);
    }
    
    if(text == ""){
        return <></>
    }

    return (
        <ul className="absolute z-10 bg-blue-400/50 rounded-md" >
            {
                users.map((u, index) => {
                    if (u.userName.toLowerCase().includes(text.toLowerCase())) {
                        return <li onClick={onClick} className="hover:bg-blue-500 p-2 rounded-md cursor-pointer" key={index}>
                            {u.userName}
                        </li>
                    }
                })
            }
        </ul>
    )
}

export default ResultList;