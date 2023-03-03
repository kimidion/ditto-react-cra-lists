

const ListItem = ({ skeleton, toggleIsCompleted, id, isCompleted, body, removeTask }) => {
    return (
        <div className={`py-4 border-b flex ${skeleton ? 'animate-pulse' : ''}`}>
          <label className="grow">
            <input
              className="align-middle border-slate-300 border-1 checked:bg-green-600 focus:checked:bg-green-600 focus:outline-blue-600 checked:hover:bg-green-600 rounded-sm"
              type="checkbox"
              checked={isCompleted}
              onChange={toggleIsCompleted(id)}
              disabled={skeleton}
            />
            <div className={`inline px-2 ${skeleton ? 'bg-gray-200 pr-10 m-1 rounded-sm' : ''} ${!skeleton && isCompleted ? 'line-through opacity-40' : ''}`}>
              {body}
            </div>
          </label>
          <button disabled={skeleton} className="ml-auto flex-shrink-0 align-middle rounded-full relative w-[30px] h-[30px] border border-white hover:shadow-lg hover:border-slate-400" type="button" onClick={removeTask(id)} aria-label="remove item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-[24px] h-[24px] stroke-red-800 m-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
    )
}

export default ListItem