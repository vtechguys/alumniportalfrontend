
const env = 'prod'

let config = {
    HIGHER_ROLES: ['superadmin', 'admin', 'moderator'],
    VALID_ASSIGN_ROLE: ['admin', 'moderator', 'user', 'guest'],
};
if(env === 'dev'){
    config.BASE_URL = 'http://localhost:5000';
}

if(env === 'prod'){
    config.BASE_URL = 'https://calm-retreat-93373.herokuapp.com';
}

export default config