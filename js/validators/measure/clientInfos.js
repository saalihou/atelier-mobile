const nameValidator = {
  presence: {
    message: 'Nom du client obligatoire',
  },
  length: {
    minimum: 2,
    message: 'Au moins 2 caractères',
  },
};

const phoneValidator = {
  presence: {
    message: 'Numéro du client obligatoire',
  },
};

export { nameValidator, phoneValidator };
