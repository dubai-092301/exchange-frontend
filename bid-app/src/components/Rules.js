import React from 'react';
import Navbar from './Navbar';

export default function Rules() {
  return (
    <>
      <Navbar />
      <div className='container rules-container'>
        <h1 className='my-2'>नियम और शर्ते</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{ backgroundColor: '#ffffcc', color: 'black' }}>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>1. न्यूनतम 100 USDT का लेन देन करना होगा।</strong><br /><br />
                <strong>2. कोई भी एकाउंट में साइबर कंप्लेंट लगती है उसकी जिम्मेदारी कम्पनी की होगी।</strong><br /><br />
                <strong>3. हमारी कंपनी से कोई भी लेनदेन भारत के बाहर से या धोखाधड़ी का नहीं होगा।</strong><br /><br />
                <strong>4. कोई भी अकाउंट में डेबिट फ्रीज लगता है तो उसकी जिम्मेदारी कंपनी की नहीं होगी।</strong><br /><br />
                <strong>5. हमारे यहां USDT का रेट हमेशा चेंज होता है। इसलिए USDT जमा करने से पहले वर्तमान दर की जांच करें।</strong><br /><br />
                <strong>6. जब आप अपने खाते में लेन देन नहीं चाहते हैं, तब आप बैंक विवरण की स्क्रीन से बटन बंद कर दें।</strong><br /><br />
                <strong>7. रेफरल करने पर 0.5 प्रतिशत बोनस दिया जाएगा</strong><br /><br />
                
                <strong>धन्यवाद</strong><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
