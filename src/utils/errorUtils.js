exports.getFirstMongooseError= (err) => {
    const errors = Object.keys(err.errors).map(key => err.errors[key].message);

    return errors[0]
}

exports.getErrorMessage = (err) => {
    switch (err.name) {
        case 'Error':
            return err.message;
        case 'Mongoose Error':
            return this.getFirstMongooseError(err);
        default:
            return err.message;
    }
}