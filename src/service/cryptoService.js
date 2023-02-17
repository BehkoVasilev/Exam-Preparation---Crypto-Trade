const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.createOne = (ownerId, data) => Crypto.create({ ...data, owner: ownerId });

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.buy = (userId, cryptoId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } });

exports.editOne = (cryptoId, data) => Crypto.findByIdAndUpdate(cryptoId, data);

exports.deleteOne = (cryptoId) => Crypto.findByIdAndDelete({ _id: cryptoId });


// exports.getOneAndPopulate = (cubeId) => Cube.findById(cubeId)
// .populate('accessories')
// .lean();

// exports.updateOne = (cubeId, data) => Cube.findByIdAndUpdate({_id: cubeId}, {...data});

// exports.deleteOne = (cubeId) => Cube.deleteOne({_id: cubeId});