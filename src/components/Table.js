import React from 'react'
import './Table.css'

const Table = () => {
    const data = JSON.parse(localStorage.getItem('data'))
    if(data==null){return <></>}
    return (
        <div className="table">
            <h2>{data.date}</h2>
            <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                    <tr>
                        <th>Session Type</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.timestamps.map( (ts, sno) => (
                    <tr key={sno} className={(sno%2!==0) ? "gray" : ""}>
                        <td>{ts.stype}</td>
                        <td>{ts.in}</td>
                        <td>{ts.out}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
