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
  format: {
    pattern: /(70|76|77|78)[\d]{7}/,
    message: 'Format du numéro invalide',
  },
};

export { nameValidator, phoneValidator };
