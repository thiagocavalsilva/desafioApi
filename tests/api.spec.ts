import { test, expect } from "@playwright/test";

let authorization: any;
let id: any;
const API_URL = process.env.API_URL;

test.describe("Suite de testes API ServRest", async () => {
  
  test.beforeEach("Before Each Hook - POST /login", async ({ request }) => {
    console.log(API_URL);
    const response = await request.post(`${API_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: "fulano@qa.com",
        password: "teste",
      },
    });
    expect(response.status()).toBe(200);
    let responseBody = await response.json();
    authorization = responseBody.authorization;
    console.log(responseBody)
    return authorization;
  });

  test("CT-01-GET-Deve poder consultar todos os cadastros", async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios`);

    console.log(response)
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);
  });

  test("CT-02-POST-Deve validar obrigatoriedade do campo nome sem preenchimento", async ({ request }) => {
    const response = await request.post(`${API_URL}/usuarios`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "",
        email: Math.random() + "fulanoPOST@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    });
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    let responseBody = await response.json();
    id = responseBody._id;
    console.log(responseBody)
  });

  test("CT-03-POST-Deve validar obrigatoriedade de preenchimento do campo Email, Status Code e Mensagem de erro", async ({ request }) => {
    const response = await request.post(`${API_URL}/usuarios`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva",
        email: "",
        password: "teste",
        administrador: "true",
      },
    });
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    console.log(response)
    console.log(response.body);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("email", "email não pode ficar em branco");
    id = responseBody._id;
    console.log(responseBody)
  });

  test("CT04-POST-Deve validar obrigatoriedade de preenchimento do campo Password, Status Code e Mensagem de erro", async ({ request }) => {
    const response = await request.post(`${API_URL}/usuarios`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Thiago Silva",
        email: Math.random() + "fulanoPOST@qa.com.br",
        password: "",
        administrador: "true",
      },
    });
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("password", "password não pode ficar em branco");
    id = responseBody._id;
    console.log(responseBody)
  });

  test("CT-05-POST-Deve validar obrigatoriedade de preenchimento do campo administrador, Status Code e Mensagem de erro", async ({ request }) => {
    const response = await request.post(`${API_URL}/usuarios`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Thiago Silva",
        email: Math.random() + "fulanoPOST@qa.com.br",
        password: "teste",
        administrador: "",
      },
    });
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    let responseBody = await response.json();
    id = responseBody._id;
    console.log(responseBody)
  });

   test("CT-06-POST-Deve poder incluir um usuário" , async ({ request }) => {
    const response = await request.post(`${API_URL}/usuarios`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva POST",
        email: Math.random() + "fulanoPOST@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    });
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(201);
    let responseBody = await response.json();
    id = responseBody._id;
    console.log(responseBody)
  });

  test("CT07-GET-Deve validar Código ID Invalido", async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);
   });

   test("CT08-GET-Deve Consultar Todos", async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });

    const responseStatus = response.status(); 
    const responseBody = await response.json();

    console.log(responseStatus);
    console.log(responseBody);
    expect(responseStatus).toBe(200);
});



   test("CT-09-PUT-Deve poder alterar Usuário", async ({ request }) => {
    const response = await request.put(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva PUT",
        email: Math.random() + "fulanoPUT@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    });

    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);
   });
   
   test("CT-10-PUT-Deve retornar erro - obrigatoriedade de preenchimento do campo nome", async ({ request }) => {
    const response = await request.put(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "",
        email: Math.random() + "fulanoPUT@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    });
  
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    console.log(response)
    console.log(response.body);
    expect(responseBody).toHaveProperty("nome", "nome não pode ficar em branco");
    id = responseBody._id;
    console.log(responseBody)
   });

   test("CT-11-PUT-Deve retornar erro - obrigatoriedade de preenchimento do campo Email e status code 400", async ({ request }) => {
    const response = await request.put(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva PUT",
        email: "",
        password: "teste",
        administrador: "true",
      },
    });
  
    let responseStatus = await response.status();
    let responseBody = await response.json();
  
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    console.log(response)
    console.log(response.body);
    expect(responseBody).toHaveProperty("email", "email não pode ficar em branco");
    id = responseBody._id;
    console.log(responseBody)
   });

   test("CT-12-PUT-Deve retornar erro - obrigatoriedade de preenchimento do campo Password e status code 400", async ({ request }) => {
    const response = await request.put(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva PUT",
        email: Math.random() + "fulanoPUT@qa.com.br",
        password: "",
        administrador: "true",
      },
    });
  
    let responseStatus = await response.status();
    let responseBody = await response.json();
  
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    console.log(response)
    console.log(response.body);
    expect(responseBody).toHaveProperty("password", "password não pode ficar em branco");
    id = responseBody._id;
    console.log(responseBody)
   });

   test("CT-13-PUT-Deve retornar erro - obrigatoriedade de preenchimento do campo Administrador e status code 400", async ({ request }) => {
    const response = await request.put(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: {
        nome: "Fulano da Silva PUT",
        email: Math.random() + "fulanoPUT@qa.com.br",
        password: "teste",
        administrador: "",
      },
    });
  
    let responseStatus = await response.status();
    let responseBody = await response.json();
  
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(400);
    console.log(response)
    console.log(response.body);
    expect(responseBody).toHaveProperty("administrador", "administrador deve ser 'true' ou 'false'");
    id = responseBody._id;
    console.log(responseBody)
 
   });

   test("CT-14-DELETE-Validação de Id invalido mensagem e status code", async ({ request }) => {
    const response = await request.delete(`${API_URL}/usuarios/${99999999}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
            },
         });
      let responseStatus = await response.status();
    let responseBody = await response.json();
  
    console.log(response)
    console.log(response.status());
    expect(response.status()).toBe(200);
    console.log(response)
    console.log(response.body);
    expect(responseBody).toHaveProperty("message", "Nenhum registro excluído");
    id = responseBody._id;
    console.log(responseBody)
 
   });

   test("CT-15-DELETE-Deve poder Deletar", async ({ request }) => {
    const response = await request.delete(`${API_URL}/usuarios/${id}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);
   });
});