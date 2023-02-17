const { methodsMap } = require('../constants');


exports.getPaymentMethodViewData = (paymentMehtod) => {
    const paymentMehtods = Object.keys(methodsMap).map(key => ({
        value: key,
        label: methodsMap[key],
        isSelected: paymentMehtod == key,
    }));

    return paymentMehtods
}