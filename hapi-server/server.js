const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');

const mysql = require('mysql2');
const Joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');

const { validateJwt } = require("./auth");
const { createToken, deleteToken } = require('./utils/Token');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<CHANGE_ME>',
    database: 'todo_list'
});

const init = async () => {
    const server = Hapi.Server({
        host: 'localhost',
        port: '8000'
    });

    await server.register([
        {
            plugin: require('@hapi/inert'),
        },
        {
            plugin: require('@hapi/vision')
        },
        {
            plugin: require('hapi-auth-jwt2')
        }
    ]);

    server.auth.strategy('jwt', 'jwt', {
        key: 'topsecret', 
        validate: validateJwt, 
        verifyOptions: {
            algorithm: ['HS256'], 
        },
    });

    server.auth.default('jwt');

    server.state('token', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true
    });

    server.route([
        {
            method: 'POST',
            path: '/register',
            options: {
                auth: false
            },
            handler: (request, h) => {
                connection.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)', 
                    [request.payload.first_name, request.payload.last_name, request.payload.email, request.payload.password],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
                return h.redirect('/')
            }
        },
        {
            method: 'POST',
            path: '/newnote',
            handler: function (request, h) {
                const { noteTitle, note } = request.payload;
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                connection.query('INSERT INTO notes (user_id, noteTitle, note, createdAt, updatedAt) VALUES (?,?,?,?,?)', 
                    [request.auth.credentials.userId, noteTitle, note, new Date(), new Date()],
                    (error, results) => {
                        if (error) throw error;
                        console.log(results);
                    }
                );
                return h.redirect('/notes')
            }
        },
        {
            method: 'POST',
            path: '/signin',
            options: {
                auth: false,
                validate: {
                    
                }
            },
            handler: async function (request, h) {
                const { email, password } = request.payload;
                console.log(request.payload)
                const query = new Promise((resolve, reject) => {
                    connection.query('SELECT email, user_id FROM users WHERE email=? AND password=?', [email, password], (err, res) => {
                        if(err)
                            return reject("db", `${err.message}`);

                        console.log(res)
                        resolve(res[0]);
                    });
                })
                const user = await query
                console.log(user)
                if (user && user.email === email) {
                    console.log(user.email)
                    const data = {
                        token:  createToken(user.user_id, user.email)
                    }
                    console.log(data)
                    return h.response(data).code(200);
                } else {
                    console.log("??????")
                    return h.response({ message: 'Invalid Username or Password!' }).code(400)
                }
            }
        },
        {
            method: 'GET',
            path: '/account',
            handler: async function (request, h) {
                console.log(request.payload)
                console.log(request.auth)
                const query = new Promise((resolve, reject) => {
                    connection.query('SELECT first_name, last_name, email FROM users WHERE user_id=?', [[request.auth.credentials.userId]], (err, res) => {
                        if(err)
                            return reject("db", `${err.message}`);

                        console.log(res)
                        resolve(res[0]);
                    });
                })
                const user = await query
                console.log(user)
                if (user && user.email === request.auth.credentials.email) {
                    console.log(user)
                    return h.response(user).code(200);
                } else {
                    console.log("??????")
                    return h.response({ message: 'Invalid access!' }).code(400)
                }
            }
        },
        {
            method: 'POST',
            path: '/logout',
            handler: (request, h) => {
                deleteToken(request.token)
                return Boom.unauthorized();
            }
        },
        {
            method: 'GET',
            path: '/notes',
            handler: function (request, h) {
                let getData = connection.promise().query(
                    'SELECT * FROM notes WHERE user_id=? ORDER BY updatedAt DESC', [request.auth.credentials.userId],
                    function(err, results, fields) {
                        if (error) throw error;
                        console.log(results);
                    }
                );
                return getData
            }
        },
        {
            method: 'GET',
            path: '/{any*}',
            handler: (request, h) => {
                return `<h1>Oh you lost</h1>`
            }
        }
    ])

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
}


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();