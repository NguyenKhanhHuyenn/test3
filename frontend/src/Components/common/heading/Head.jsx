import React from 'react'

const Head = () => {
  return (
    <>
         <section className='head'>
             <div className="container flexSB head-content">
                 <div className="logo">
                   
                    <div className='logo-img-wrapper'>
                        
                     <img className='logo-img' src="./images/logo-hus.jpg" alt='logo-hus'/>
                    </div>
                   
                     <div>
                         <h2 className='school-name'>HUS - VNU</h2>
                         <div className='page-name'>STUDENT INTERNSHIP MANAGEMENT SYSTEM</div>
                     </div>
                    
                 </div>
                 <div className="social">
                     <i className='fab fa-facebook-f icon'></i>
                     <i className='fab fa-instagram icon'></i>
                     <i className='fab fa-twitter icon'></i>
                     <i className='fab fa-youtube icon'></i>
                 </div>
             </div>

         </section>
    </>
  )
}

export default Head
