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

  test("CT-01-GET /usuarios", async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios`);

    console.log(response)
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);
  });

  test("CT-02-POST /usuarios / campo nome vazio", async ({ request }) => {
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

  test("CT-03-POST /usuarios / campo Email vazio - Valida status code e mensagem de erro", async ({ request }) => {
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

  test("CT04-POST /usuarios / campo Password vazio - Valida status code e mensagem de erro", async ({ request }) => {
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

  test("CT-05-POST /usuarios / campo administrador vazio", async ({ request }) => {
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

   test("CT-06-POST /usuarios / Incluir Usuário" , async ({ request }) => {
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

  test("CT07-GET /usuarios/{_id} Invalido", async ({ request }) => {
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

   test("CT08-GET /usuarios/{_id} / Conulta Todos", async ({ request }) => {
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

   test("CT-09-PUT /usuarios/{_id}", async ({ request }) => {
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
   
   test("CT-10-DELETE /usuarios/{_id}", async ({ request }) => {
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