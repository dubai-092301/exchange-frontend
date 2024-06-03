import React from 'react';
import Navbar from './Navbar';

export default function Rules() {

    return (
        <>
            <Navbar/>
            <div className='container' style= {{backgroundColor: '#ffffcc', color : 'black'}}>
                <h1 className='my-2'>BTC Rules</h1>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item" style= {{backgroundColor: '#ffffcc', color : 'black'}}>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong> * Minimum of 100 BTC has to be purchased.</strong><br />
                            <strong> * Minimum of 100 BTC can be withdrawn.</strong><br />
                            <strong> * User can upload images less than 5 MB</strong><br />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    )
  }
  