const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    speak_language: {
        type: String,
        default: ''
    },
    learn_language: {
        type: String,
        default: ''
    },
    biography: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);