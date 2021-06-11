import { API_URL } from "../src/constant/apiUrl";
import { gotResponseBody } from "../src/http/gotResponse";

beforeAll(() => {
    const config = require('dotenv').config()
})

beforeEach(() => {
    const config = require('dotenv').config()
})

test('got', async () => {
    const resp = await gotResponseBody(API_URL)
    expect(resp).toBeDefined()
    expect(resp.layers).not.toBeNull()
} )

test('should got error', async () => {
    await expect(gotResponseBody('incorrect url string')).rejects.toThrow();
});