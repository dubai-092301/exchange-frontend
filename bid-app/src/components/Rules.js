import React, { useState } from 'react';
import Navbar from './Navbar';
import './Modal.css'; // Import the CSS file for the modal

export default function Rules() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ backgroundColor: '#ffffcc', color: 'black' }}>
        <h1 className="my-2">नियम और शर्ते</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{ backgroundColor: '#ffffcc', color: 'black' }}>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong> 1. न्यूनतम 100 USDT का लेन देन करना होगा।</strong><br /><br />
                <strong> 2. कोई भी एकाउंट में साइबर कंप्लेंट लगती हे उसकी जिम्मेदारी कम्पनी की होगी ।</strong><br /><br />
                <strong> 3. हमारी कंपनी से कोई भी लेनदेन भारत के बाहर से या धोखाधड़ी का नहीं होगा ।</strong><br /><br />
                <strong> 4. कोई भी अकाउंट में डेबिट फ्रीज लगता है तो उसकी जिम्मेदारी कंपनी की नहीं होगी।</strong><br /><br />
                <strong> 5. हमारे यहां USDT का रेट हमेशा चेंज होता है। इसिलिये USDT जमा करने से पहले वर्तमान दर की जांच करें।</strong><br /><br />
                <strong> 6. जब आप अपने खाते में लेन देन नही चाहते हे, तब आप बैंक विवरण की स्क्रीन से बटन बंद कर दें।</strong><br /><br />
                <strong> धन्यवाद</strong><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">नियम और शर्ते</h5>
                <button type="button" className="close-btn" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <strong> 1. न्यूनतम 100 USDT का लेन देन करना होगा।</strong><br /><br />
                <strong> 2. कोई भी एकाउंट में साइबर कंप्लेंट लगती हे उसकी जिम्मेदारी कम्पनी की होगी ।</strong><br /><br />
                <strong> 3. हमारी कंपनी से कोई भी लेनदेन भारत के बाहर से या धोखाधड़ी का नहीं होगा ।</strong><br /><br />
                <strong> 4. कोई भी अकाउंट में डेबिट फ्रीज लगता है तो उसकी जिम्मेदारी कंपनी की नहीं होगी।</strong><br /><br />
                <strong> 5. हमारे यहां USDT का रेट हमेशा चेंज होता है। इसिलिये USDT जमा करने से पहले वर्तमान दर की जांच करें।</strong><br /><br />
                <strong> 6. जब आप अपने खाते में लेन देन नही चाहते हे, तब आप बैंक विवरण की स्क्रीन से बटन बंद कर दें।</strong><br /><br />
                <strong> धन्यवाद</strong><br /><br />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                  I agree to the terms and conditions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
