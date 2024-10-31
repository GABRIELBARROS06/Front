import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from '../CSS/Perfil.module.css';
import imagem from '../../img/image.png';
import imagem_Voltar from '../../img/Voltar.png';
import configurar from '../../img/image 33.png';
import bolinha from '../../img/Ellipse 1.png';
import pessoinha from '../../img/pessoinha.png'

function Perfil() {
    const BASE_URL = 'http://localhost:8080/';
    const navigate = useNavigate();
    const { setDados } = useContext(AppContext);

    // Estados para dados do perfil
    const [nome, setNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [atividades, setAtividades] = useState([]);
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    // Carregar os dados do perfil ao montar o componente
    useEffect(() => {
        async function fetchProfile() {
            if (nome === null || nome === undefined || nome === '' ||
            tipoUsuario === null || tipoUsuario === undefined || tipoUsuario === '' ||
                tipoUsuario === null || tipoUsuario === undefined || tipoUsuario === '' ||
                atividades === null || atividades === undefined || atividades === ''
                ) {
                    setErro(false)
                    setMensagemErro('Todos os campos devem ser preenchidos, favor verificar')
                }
    
                else{
                    try {
                        const response = await fetch(`${BASE_URL}v1/sinalibras/usuario`);
                        const data = await response.json();
                        
                        if (data.status) {
                            setNome(data.usuario.nome);
                            setTipoUsuario(data.usuario.tipo);
                        } else {
                            setErro(true);
                            setMensagemErro('Erro ao carregar dados do perfil.');
                        }
                    } catch (error) {
                        console.error('Erro ao buscar perfil:', error);
                        setErro(true);
                        setMensagemErro('Erro ao buscar dados do servidor.');
                    }
                }
           
        }

        async function fetchAtividades() {
            try {
                const response = await fetch(`${BASE_URL}v1/sinalibras/atividades`);
                const data = await response.json();
                
                if (data.status) {
                    setAtividades(data.atividades);
                } else {
                    setErro(true);
                    setMensagemErro('Erro ao carregar atividades.');
                }
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
                setErro(true);
                setMensagemErro('Erro ao buscar atividades do servidor.');
            }
        }

        fetchProfile();
        fetchAtividades();
    }, []);

    // Função para testar o nível do usuário
    async function testarNivel() {
        try {
            const response = await fetch(`${BASE_URL}v1/sinalibras/teste-nivel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status) {
                navigate('/TesteNivel'); // Redireciona para a tela do teste de nível
            } else {
                setErro(true);
                setMensagemErro('Erro ao iniciar teste de nível.');
            }
        } catch (error) {
            console.error('Erro ao iniciar teste de nível:', error);
            setErro(true);
            setMensagemErro('Erro ao iniciar o teste de nível.');
        }
    }

    return (
        <div className='App'>

  
        <div className={styles.Appheader1}>
          <header className={styles.Appheader}>
            <div className={styles.voltar}>
              <img src={imagem_Voltar} alt="voltar" />
            </div>
            <h1 className={styles.h1}>Perfil</h1>
            <div className={styles.configurar}>
              <img src={configurar} alt="configurar" />
            </div>
          </header>
    
    
          <main className={styles.main}>
            <div className={styles.perfil}>
              <img src={imagem} alt="perfil" />
              <div className={styles.info_perfil}>
                <span>Pedro Maia</span>
                <div className={styles.identificacao}>
                  <img src={bolinha} alt="bolinha" />
                  <span>Professor</span>
                </div>
              </div>
            </div>
    
    
         
         <div className={styles.inputsection}>
               <input className={styles.texto} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." />
               <input className={styles.input} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit ..." />
            </div>
        
          </main>
           
          <div className={styles.quadradinho}>
             <span className={styles.span1}>Editar Perfil</span>
          </div>
       
           <div className={styles.p}>Postagens</div>
       
          <div className={styles.quadradinho2}>
             <span className={styles.span2}>Testar Nível</span>
          </div>
           
           <div className={styles.p1}> Aulas </div>
    
          <div>
           <div className={styles.pessoinha} alt="pessoinha">
           <img src={pessoinha}></img>
           <div className={styles.nome}>José Silva </div> 
         
              </div>
         
           <div className={styles.pessoinha2} alt="pessoinha2">
           <img src={pessoinha}></img>
           <div className={styles.nome2}>José Silva </div> 
         
           </div>
           <div className={styles.info} alt="info"></div>
        
        </div>
        <div class={styles.quadrado_pequeno}></div>
    
        </div>
     </div>
       
    );
}

export default Perfil;
