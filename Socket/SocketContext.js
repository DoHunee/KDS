// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import connectToServer from './Socket';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = connectToServer("0093", "001", "user01"); // 예시 파라미터
        // const newSocket = connectToServer(storedNumberExample, storedCategoryNumberExample, storedEmployeeIDExample);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};