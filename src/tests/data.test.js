const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Item = require("../models/dataModel");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/adaca_database_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Item.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/data", () => {
  it("should create a new item", async () => {
    const newItem = { fname: "John", lname: "Doe" };

    const response = await request(app)
      .post("/api/data")
      .send(newItem)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.fname).toBe(newItem.fname);
    expect(response.body.lname).toBe(newItem.lname);
  });

  it("should return 400 if required fields are missing", async () => {
    const newItem = { fname: "Jane" }; //no lname

    const response = await request(app)
      .post("/api/data")
      .send(newItem)
      .expect(400);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("DataModel validation failed");
  });
});

describe("GET /api/data", () => {
  it("should get all items", async () => {
    await Item.create({ fname: "Alice", lname: "Smith" });
    await Item.create({ fname: "Bob", lname: "Johnson" });

    const response = await request(app).get("/api/data").expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("fname", "Alice");
    expect(response.body[0]).toHaveProperty("lname", "Smith");
    expect(response.body[1]).toHaveProperty("_id");
    expect(response.body[1]).toHaveProperty("fname", "Bob");
    expect(response.body[1]).toHaveProperty("lname", "Johnson");
  });
});
