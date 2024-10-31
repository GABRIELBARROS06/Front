
import styles from '../CSS/Login.module.css'
import logo from '../../img/Logo.png';
// import logoGrande from '../img/LogoGrande.png';

import { useState } from 'react'
import { useEffect } from 'react';

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


import React from 'react';


function Login() {
    const { setDados } = useContext(AppContext);

    const BASE_URL = 'http://localhost:8080/'

    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const [erroNull, setErroNull] = useState(true)
    const [textoErro,setTextoErro]=useState('')


    const navigate = useNavigate();
    async function ValidarEntrada(e) {
        if (
            email == null || email == undefined || email == '' ||
            senha == null || senha == undefined || senha == ''
        ) {
            setErroNull(false)
            setTextoErro('Todos os campos devem ser preenchidos, favor verificar')
                }
        else{
            
//         const url = `${BASE_URL}v1/sinalibras/aluno/validacao`
//         const response = await fetch(url)
//         const data = await response.json()
// console.log(data);
const alunoDados = {
    email: email,
    senha: senha
}
await fetch(`${BASE_URL}v1/sinalibras/aluno/validacao`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(alunoDados),
})
.then(response => response.json())
.then(data => {
console.log(data);
if(data.status){
    const dadosParaEnviar = {
                        id: data.aluno[0].id_aluno,
                    };
    
                    setDados(dadosParaEnviar)
                    navigate('/Home');
}
else{
    setErroNull(false)
    setTextoErro('Seus dados não conferem')
}

})
        //         const url = `${BASE_URL}v1/sinalibras/alunosemail/${email}`
    // const response=await fetch(url)
    // const data=await response.json()
    // console.log(data);
    // const dadoEmail=data.alunos
    // if (dadoEmail.senha==senha) {
    //             const dadosParaEnviar = {
    //                 // id: dadoEmail.id_aluno,
    //                                     id: 1,
    //             };

    //             setDados(dadosParaEnviar)
    //             navigate('/Home');

    // }
    // else{
    //     setErroNull(false)
    //     setTextoErro('Seus dados não conferem')
    // }    
        }
    }



    return (
            <div className={styles.body}>
                <div className={styles.esquerda}>
                    <img src={logo}></img>
                    <h3 className={styles.slogan}>Conectando Pessoas</h3>
                    <h3 className={styles.slogan}>Transformando Sinais</h3>
                    <h1 className={styles.nome_aplicacao}>SinaLibras</h1>
                </div>
                <div className={styles.direita}>
                <h1 className={styles.texto_acesse}>Acesse a sua conta</h1>
                    <form className={styles.formulario} >
                        <div>
                            <h4 className={styles.texto_input} >Email</h4>
                            <input type='email' className={styles.input} id="input_email" name="input_email" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <h4 className={styles.texto_input} >Senha</h4>
                            <input type='senha' className={styles.input} id="input_senha" name="input_senha" onChange={(e) => setSenha(e.target.value)}></input>
                        </div>
                    </form>
                    <h3 className={styles.esqueciASenha}>Esqueci a senha</h3>
                    <h4 className={styles.erro_null} hidden={erroNull}>{textoErro}</h4>
                    <button className={styles.botao} onClick={ValidarEntrada}>Entrar</button>
                    <h3 className={styles.texto}>Não tem uma conta? </h3>
                    <h2 className={styles.texto} onClick={()=>navigate('/Cadastro')}>Criar Conta</h2>

                </div>
            </div>
    )
}

export default Login;