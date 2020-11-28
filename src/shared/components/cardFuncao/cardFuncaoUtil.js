export const getTermo = (vet) => {
  var termo = '';
  for (var i = 0; i < vet.length; i++) {
    if (vet[i] === 0) continue;
    if (vet[i] > 0 && i !== 0) termo += '+';
    if (i === vet.length - 1) {
      termo += vet[i]
    } else if (i === vet.length - 2) {
      if (vet[i] !== 1) termo += vet[i]
      termo += 's'
    } else {
      if (vet[i] !== 1) termo += vet[i]
      termo += 's^' + (vet.length - 1 - i)
    }
  }
  return termo;
}

export const gerarTf = ({num, den}) => {
  return `G(s)=\\frac{${getTermo(num)}}{${getTermo(den)}}`
}