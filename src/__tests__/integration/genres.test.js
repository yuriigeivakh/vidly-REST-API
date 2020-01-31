const request = require('supertest');
const mongoose = require('mongoose');

const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');

let server;
let token; 

describe('api/genres', () => {
    beforeEach(async () => { 
        server = require('../../server');
        token = new User().generateAuthToken({isAdmin: true});
        await Genre.remove({})
    });
    afterEach(() => { 
        server.close(); 
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });

    describe('POST /add_genre', () => {
        let name;
        const exec = async () => {
            return await request(server)
                .post('/api/genres/add_genre')
                .set('x-auth-token', token)
                .send({ name });
        };

        beforeEach(async () => { 
            name = 'genre1';
        });

        it('should return a 401 if client is not logged in', async () => {
            token = '';
            name = 'genre1';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return a 400 if genre is less than 5 characters', async () => {
            name = 'gen';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should add new genre', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('genreId');
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({name: 'genre'});
            await genre.save();
            const res = await request(server)
                .get(`/api/genres/${genre._id}`)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server)
                .get('/api/genres/1')
            expect(res.status).toBe(404);
        });

        it('should return 404 if genre with the given id exist', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server)
                .get(`/api/genres/${id}`)
            expect(res.status).toBe(404);
        });
    });

    describe('POST /update_genre', () => {
        it('should return new updated genre', async () => {
            const genre = new Genre({name: 'genre'});
            await genre.save();
            const res = await request(server)
                .post('/api/genres/update_genre')
                .set('x-auth-token', token)
                .send({id: genre.id, name: 'new-name'})
            expect(res.status).toBe(200);
            expect(res.body.doc).toHaveProperty('name', 'new-name');
        });
    });
});