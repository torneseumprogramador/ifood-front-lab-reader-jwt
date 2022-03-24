/*!
* Start Bootstrap - One Page Wonder v6.0.5 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const API_URI = "https://api-ifood-lab.herokuapp.com";

const login = async () => {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  let url = `${API_URI}/login`;
  try {
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          senha: senha
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      });

      let administradorToken = await res.json();
      if(administradorToken.erro != null){
        document.getElementById("erro").style = "display:block"
        document.getElementById("erro").innerHTML = administradorToken.erro;
        return;
      }
      
      document.getElementById("erro").style = "display:none"
      localStorage.setItem("token", administradorToken.token);
      mostrarClientes();
    
    } catch (error) {
  }
}

const mostrarClientes = async () => {
  let token = localStorage.getItem("token");

  let url = `${API_URI}/clientes`;
  try {
      let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      });

      let clientes = await res.json();
      document.getElementById("tabela").style = "display:block"
      let html = "";
      for(var i=0; i<clientes.length;i++){
        let cliente = clientes[i];
        html += `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.status}</td>
          </tr>
        `
      }
      document.getElementById("linhasTabelaClientes").innerHTML = html;
    
    } catch (error) {
  }
}