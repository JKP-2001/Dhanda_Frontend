
const Page = (props)=>{
    return (
        <div className={`w-[2rem] h-[2rem] border-2 cursor-pointer
         border-gray-700 bg-gray-100 rounded-md 
         flex items-center justify-center ${props.highlight && 'bg-gray-700 text-white'}`}
         onClick={()=>{
            props.onClick(props.page)
         }}
         >
            {props.page}
        </div>
    ) 
}

const Pager = (props) => {
    const components = []
    for(let i=1;i<=props.totalPage; i++){
        if (props.currentPage === i){
            components.push(<Page page={i} highlight={true} onClick = {props.onClick}/>)
        }
        else 
            components.push(<Page page={i} onClick = {props.onClick}/>)
    }
  return (
    <div
    className={`flex flex-row justify-center items-center gap-2 ${props.className}`}
    >
     {components}
    </div>
  )
}

export default Pager