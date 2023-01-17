import React, { useEffect, useState } from 'react';
import crudApi from '../../api/crudApi';

export const List = () => {

    const [dataValue, setDataValue] = useState([]);

    useEffect(() => {
        
        getData();

    }, [dataValue]);

    const getData = async() => {

        try {
            const {data} = await crudApi.get('/events');
            setDataValue( data );
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async(id) => {
        try {
            const data = await crudApi.delete(`/events/${id}`)

        } catch (error) {
            console.log(error);
        }
    }

  return (
      <>
      {
          dataValue.eventos?.map(value => (
                <div className='card' key={value.id}>
                    <div className="card-body">
                    <h5 className="card-title"> {value.title}</h5>
                        <p className="card-text">{value.notes}</p>
                        <a 
                            className="btn btn-danger"
                            onClick={() => handleDelete(value.id)}
                        >
                            Eliminar
                        </a>
                    </div>
                </div>
            ))
        }

    </>
  )
}
