# MICA

Esse repositório contém os programas necessário para execução do simulador do MICA.
Os três prograsmas são:
  - Interface (Javascript)
  - Ponte de comunicação entre ESP32 e interface (Python)
  - Software do ESP32 (C++/Arduino)
  
### Passo a passo da interface
  - Instale o NodeJS no seu computador. https://nodejs.org/en/
  - Acesse a pasta raiz do repositório.
  - Abra um novo terminal nessa pasta e execute o comando ```npm install``` e em seguida execute ```npm run start```.
  - Aguarde a tela do navegador ser exibida.

### Passo a passo da ponte de comunicação
  - Instale o Python em seu computador. https://www.python.org/
  - Acesse a pasta ```/python``` do repositório.
  - Abre um novo terminal nessa pasta e execute o comando ```pip install -r requirements.txt```.
  - Execute o arquivo ```run.bat``` para iniciar o programa.
  
### Passo a passo do software do ESP32
  - Instale o Arduino IDE no seu computador. https://www.arduino.cc/en/software
  - Abra a pasta ```/esp32``` como um projeto do arduino.
  - Faça upload do código para a sua placa ESP32.
  
  OBS: Siga o tutorial de montagem do circuito descrito logo abaixo.
  
### Tutorial de montagem no ESP32
Como o circuito será montado no ESP32 não têm muita importância. É necessário apenas que os componentes corretos estejam ligados aos pinos corretos. A relação entre pinos e componentes é:
- LED no GPIO 32.
- LED no GPIO 33.
- LED no GPIO 34.
- LED no GPIO 35.
- Potenciômetro no DAC_CHANNEL_1 (GPIO 25)
- Potenciômetro no DAC_CHANNEL_2 (GPIO 26) 
 
### Passo a passo da execução integrada
  - Faça upload do código no ESP32 e espere que ele se inicie.
  - Execute o arquivo ```run.bat``` na pasta ```/esp32``` e aguarda que ele seja iniciado corretamente.
  - Abra o site da interface.
  - Se tudo estiver funcionando corretamente, será exibido ```ONLINE``` no canto da tela.
  
  
### Observações
- O endereço do socket de comunicação entre a interface e a ponte é ```http://localhost:2003```. A porta serial utilizada entre o ESP32 e a ponte é a ```COM7```. Talvez seja necessário alterar essas variáveis no código. 
- Caso tenha alguma dúvida sinta-se a vontade para entrar em contato comigo.
