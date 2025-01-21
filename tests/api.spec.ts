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

  test("GET /usuarios", async ({ request }) => {
    const response = await request.get(`${API_URL}/usuarios`);

    console.log(response)
    let responseStatus = await response.status();
    let responseBody = await response.json();

    console.log(responseStatus)
    console.log(responseBody)
    expect(responseStatus).toBe(200);

  });

  test("POST /usuarios", async ({ request }) => {
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

});
