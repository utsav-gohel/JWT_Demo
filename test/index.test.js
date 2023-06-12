const request = require("supertest");
const app = require("../index");
const axios = require("axios");
async function generateAuthToken() {
  try {
    const response = await axios.post(
      process.env.MONGO_URI,
      {
        username: "utsav",
        password: "utsav2002",
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Assuming the token is returned in the response data
    const authToken = response.data.token;

    // Use the token for subsequent requests or return it as needed
    return authToken;
  } catch (error) {
    console.log(error);
  }
}

describe("Notes Apis", () => {
  it("GET Hello Msg --> specific user by ID", () => {
    return request(app)
      .get("/hello")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            msg: expect.any(String),
          })
        );
      });
  });
  it("GET user/signup/:id --> specific user by ID", () => {
    return request(app)
      .get("/user/signup/64193bb50b017d72b14c9e18")
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            password: expect.any(String),
            email: expect.any(String),
            _id: expect.any(String),
          })
        );
      });
  });
  it("POST user/signup --> Create new user", () => {
    return request(app)
      .post("/user/signup")
      .send({
        username: "utsv",
        email: "utsav0111@gmail.com",
        password: "utsav123",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          })
        );
      });
  });
  it("POST user/signin --> Signin new user", () => {
    return request(app)
      .post("/user/signin")
      .set({
        Authorization: "abc123",
      })
      .send({
        email: "utsav0111@gmail.com",
        password: "utsav123",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.user).toEqual(
          expect.objectContaining({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          })
        );
      });
  });
  it("GET  note --> Get a notes of user", async () => {
    const token = await generateAuthToken();

    return request(app)
      .get("/notes/")
      .expect(token)
      .set({
        Authorization: token,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
          })
        );
      });
  });
});
