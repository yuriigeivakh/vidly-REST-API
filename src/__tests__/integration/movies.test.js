const request = require('supertest');

const { Genre } = require('../../models/genre');

let server;
let token; 

describe('api/movies', () => {
    beforeEach(() => { 
        server = require('../../server');
    });
    afterEach(() => { 
        server.close(); 
        Genre.remove({});
    });

    describe('GET /', () => {
        it('should return all movies', async () => {
            const res = await request(server).get('/api/movies');
            expect(res.status).toBe(200);
        });
    });

    describe('POST /add_movie', () => {
        it('should add new movie', async () => {
            const genre = new Genre({name: 'genre'});
            await genre.save();
            const res = await request(server)
                .post('/api/movies/add_movie')
                .send({ title: 'genre1', numberInStock: 5, dailyRentalRate: 5, genreId: genre.id });
            expect(res.status).toBe(200);
        });
    });

    describe('POST /update_movie', () => {
        it('should add new movie', async () => {
            const genre = new Genre({name: 'genre'});
            await genre.save();
            const res = await request(server)
                .post('/api/movies/update_movie')
                .send({ id: genre.id, numberInStock: 105});
            expect(res.status).toBe(200);
        });
    });

    describe('DELETE /delete_movie', () => {
        it('should add new movie', async () => {
            const genre = new Genre({name: 'genre'});
            await genre.save();
            const res = await request(server)
                .delete('/api/movies/delete_movie')
                .send({ id: genre.id });
            expect(res.status).toBe(200);
        });
    });
});