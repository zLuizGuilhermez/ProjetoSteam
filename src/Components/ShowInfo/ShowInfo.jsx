import React, { useState, useEffect } from 'react';
import './ShowInfo.css';
import axios from 'axios';

const ShowInfo = ({ id }) => {
    const [info, setInfo] = useState(null);
    const [status, setStatus] = useState(1); // 1 = Aguardando busca, 2 = Sucesso, 3 = Erro

    useEffect(() => {
        if (id && id.length === 17 && !isNaN(id)) {
            fetchInfo(id);
        }
    }, [id]);

    const fetchInfo = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/infoController/toInfoService/${id}`);
            setInfo(response.data);
            setStatus(2); // Sucesso
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            setStatus(3); // Erro
        }
    };

    return (
        <div className={`real-container status-${status}`}>
            <div className="InfoContainer">
                {status === 1 && (
                    <>
                        <div className="InfoShow">
                            <h1>Steam Info Finder</h1>
                        </div>
                        <h2>Search your Steam info is easy. Just enter your SteamID or profile URL.</h2>
                    </>
                )}

                {status === 2 && info && (
                    <>
                        <div className="InfoShow">
                            <h1>Result</h1>
                        </div>
                        <div className="ShowPerfilInfos">
                            <div className="InfoDetails">
                                <div>
                                    <video src={info.Background} alt="Steam Avatar" />

                                    <div>
                                        <img src={info.avatarmedium} alt="Steam Avatar" />

                                    </div>

                                </div>
                                <p><strong>Username:</strong> {info.personaname}</p>
                                <pre>{JSON.stringify(info, null, 2)}</pre>
                            </div>
                        </div>
                    </>
                )}

                {status === 3 && (
                    <h1 className="ErrorInfo">❌ Erro ao buscar informações. Verifique o SteamID e tente novamente.</h1>
                )}
            </div>
        </div>
    );
};

export default ShowInfo;
