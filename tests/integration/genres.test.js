const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('api/genres', () => {
  beforeEach(() => { server = require('../../server'); });
  afterEach(async () => { 
    server.close(); 
    await Genre.remove({});
  });

  // describe('GET', () => {
  //   it('should return all genres', async () => {
  //     const genres = [
  //       { name: 'genre1' },
  //       { name: 'genre2' },
  //     ];
      
  //     await Genre.collection.insertMany(genres);

  //     const res = await request(server).get('/api/genres');
  //     expect(res.status).toBe(200);
  //     expect(res.body.length).toBe(2);
  //     expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
  //   })
  // })
  
  describe('GET /:id', () => {
    it('should return genre if validId is passed', async () => {
      const genre = new Genre({name: 'genre1'});
      await genre.save();
      const res = await request(server).get('/api/genres/' + genre._id); 
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    })

    it('should return genre if invalidId is passed', async () => {
      const res = await request(server).get('/api/genres/1'); 
      
      expect(res.status).toBe(404);
    })
  })

  describe('POST/:id', async () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/genres/')
        .set('x-auth-token', token)
        .send({ name }); 
    }

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec(); 
      
      expect(res.status).toBe(401);
    })

    it('should return genre 400 if genre is less than 5 characters', async () => {
      name = '1234';
      const res = await exec();
      
      expect(res.status).toBe(400);
    })

    it('should return genre 400 if genre is more than 50 characters', async () => {
      name = new Array(52).join('a');
      const res = await exec();
      
      expect(res.status).toBe(400);
    })

    it('should save genre if it is valid', async () => {
      const res = await exec();
      
      const genre = await Genre.find({ name: '12345'});

      expect(genre).not.toBeNull();
      expect(res.status).toBe(200);
    })

    it('should return the genre if it is valid', async () => {
      const token = new User().generateAuthToken();
      const res = await exec();
      
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    })
  })
});