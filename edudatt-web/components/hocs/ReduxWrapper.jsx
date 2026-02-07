"use client"

import store from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';


const ReduxWrapper = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeButton={true}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme='colored'
          transition={Bounce}
        />
    </Provider>
  )
}

export default ReduxWrapper