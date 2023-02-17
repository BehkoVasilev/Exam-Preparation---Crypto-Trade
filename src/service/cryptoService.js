const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.createOne = (ownerId, data) => Crypto.create({ ...data, owner: ownerId });

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.search = async (name, method) => {
    let crypto = await this.getAll();

    if (name) {
        crypto = crypto.filter(x => x.name.toString().toLowerCase() == name.toLowerCase());
    }

    if (method) {
        crypto = crypto.filter(x => x.method == method);
    }
    return crypto
}

exports.buy = (userId, cryptoId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } });

exports.editOne = (cryptoId, data) => Crypto.findByIdAndUpdate(cryptoId, data, { runValidators: true });

exports.deleteOne = (cryptoId) => Crypto.findByIdAndDelete({ _id: cryptoId });
