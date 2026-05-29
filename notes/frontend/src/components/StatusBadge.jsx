import React from 'react'
const config={
    InProgress:{
        lebel:"In Progress",
         className: "bg-amber-50 text-amber-800 border border-amber-200",
    },
    Done:{
        lebel:"Done",
        className: "bg-green-50 text-green-800 border border-green-200",
    },
    Pending:{
        lebel:"Pending",
        className: "bg-red-50 text-red-800 border border-red-200",
    }
}

const StatusBadge = ({status}) => {
    const {lebel,className}=config[status] || config["Pending"];
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${className}`}>{lebel}</span>
  )
}

export default StatusBadge