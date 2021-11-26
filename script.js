class Calculator {
  constructor(){
    this.upperValue = document.querySelector('#result');
    this.history = document.querySelector('#history');
    this.reset = false;
  }

  sum(num1, num2){
    return parseFloat(num1) + parseFloat(num2)
  }

  sub(num1, num2){
    return parseFloat(num1) - parseFloat(num2)
  }

  div(num1, num2){
    return parseFloat(num1) / parseFloat(num2)
  }

  mult(num1, num2){
    return parseFloat(num1) * parseFloat(num2)
  }

  checkLastDigit(input, upperValue, reg){
    return !reg.test(input) && !reg.test(upperValue.substr(upperValue.length - 1))
  }

  clearDisplay(){
    this.upperValue.textContent = '0'
    this.history.textContent = '0'
  }

  refreshValues(total){
    this.history.textContent = this.upperValue.textContent
    this.upperValue.textContent = total;
  }

  resolution(){
    const arr = this.upperValue.textContent.split(' ')
    let operationResult = 0
    let operation = false
    for(let i=0; i<= arr.length; i+=1){
      operation = false;

      if(arr[i] == 'x') {
        operationResult = this.mult(arr[i-1], arr[i+1])
        operation = true
      }
      else if(arr[i] == '/'){
        operationResult = this.div(arr[i-1], arr[i+1])
        operation = true;
      }
      else if(!arr.includes('x') && !arr.includes('/')){
        if(arr[i] == '+'){
          operationResult = this.sum(arr[i-1], arr[i+1])
          operation = true;
        }
        else if(arr[i] == '-'){
          operationResult = this.sub(arr[i-1], arr[i+1])
          operation = true;
        }
      }
      // Atualiza os valores do array para a próxima iteração
      if(operation){
        // Atribui o resultado no índice anterior
        arr[i - 1] = operationResult
        // Remove os itens já utilizados para a operação
        arr.splice(i,2)
        // Atualiza o valor do índice
        i=0
      }
    }

    if(operationResult) this.reset = true

    this.refreshValues(operationResult)
  }

  btnPress(){
    let btnSelected = this.textContent
    let upperValue = calc.upperValue.textContent
    // verificar se existem só números
    const reg = new RegExp('^\\d+$')

    // Limpa o display para uma nova conta
    if(calc.reset && reg.test(btnSelected)) upperValue = '0'

    // Coloca o reset como false novamente
    calc.reset = false

    // Limpar o display
    if(btnSelected == 'AC'){
      calc.clearDisplay();
      return;
    }

    if(btnSelected == '='){
      calc.resolution();
      return;
    }

    // Verificar a existência de dois operadores seguidos
    if(calc.checkLastDigit(btnSelected, upperValue, reg))
      return false

    // adicionar espaços entre os operadores e números
    if(!reg.test(btnSelected))
      btnSelected = ` ${btnSelected} `

    // se for o primeiro dígito, limpa o 0 de default
    if(upperValue == '0'){
      if(reg.test(btnSelected))
        calc.upperValue.textContent = btnSelected
    }
    else
      calc.upperValue.textContent += btnSelected;
  
  }
}

// instanciando calculadora
const calc = new Calculator;

// pegando todos os botões
let buttons = document.querySelectorAll('#btn');

// adicionando evento de click
for(let i=0; i<buttons.length; i+=1)
  buttons[i].addEventListener('click', calc.btnPress)