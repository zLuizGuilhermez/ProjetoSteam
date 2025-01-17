import React, { useState, useEffect } from 'react';
import './ShowInfo.css';
import axios from 'axios';

const ShowInfo = ({ id }) => {
    const [info, setInfo] = useState(null);
    const [status, setStatus] = useState(1); // 1 = Search Info, 2 = Sucesso, 3 = Erro
    const [HeaderType, setHeaderType] = useState(1); // Controle para a classe do cabeçalho

    const fetchInfo = async (id) => {
        if (id.length === 17 && !isNaN(id)) {
            try {
                const response = await axios.get(`http://localhost:8080/api/infoController/toInfoService/${id}`);
                setInfo(response.data);
                setStatus(2); // Sucesso
                setHeaderType(2); // Resultado encontrado
            } catch (error) {
                console.error("Erro ao buscar as informações:", error);
                setStatus(3); // Erro
                setHeaderType(3); // Cabeçalho de erro
            }
        }
    };

    useEffect(() => {
        if (id) {
            fetchInfo(id);
        }
    }, [id]);

    return (
        <div className={`real-container status-${status}`}> {/* Status adicionado dinamicamente */}

            <div className="InfoContainer">
                {status === 1 && (  /* Tela inicial */
                    <>
                        <div className={`InfoShow HeaderType-${HeaderType}`}> {/* HeaderType-1 */}
                            <div className="info-text-container">
                                <h1 className='TextShow'>Steam Info Finder</h1>
                            </div>
                        </div>
                        <h1 className='HelpInfo'>Search your Steam info is easy. Just put your SteamID or account URL.</h1>
                    </>
                )}

                {status === 2 && info && (  /* Resultado encontrado */
                    <>
                            <div className={`InfoShow HeaderType-${HeaderType}`}> {/* HeaderType-2 */}
                                <h1 className='TextShow'>Result</h1>
                                
                            </div>
                                <div className="ShowPerfilInfos">
                            <div className="InfoDetails">
                                <h2>Steam Info:</h2>
                                <p><strong>Username:</strong> {info.personaname}</p>
                                <pre>{JSON.stringify(info, null, 2)}</pre>
                            </div>
                        </div>
                    </>
                )}

                {status === 3 && (  /* Erro */
                    <h1 className='ErrorInfo'>❌ Erro ao buscar informações. Verifique o SteamID e tente novamente.</h1>
                )}

            </div>
        </div>
    );
};

export default ShowInfo;
