#include <driver/dac.h>

long contadorRotinaChecar = 0;
long contadorRotinaLeitura = 0;

void checarEscritaAnalogica(){
  if(Serial.available() > 0){
    String tipo = Serial.readStringUntil(';');
    if(tipo == "SA"){
      String saida = Serial.readStringUntil(';');
      String valorString = Serial.readStringUntil('\n');
      double valor = atof(valorString.c_str());
      int valorMapeado = (int) (valor * 255);
      if(saida == "s0"){
        dac_output_voltage(DAC_CHANNEL_1, valorMapeado);
      }
    }
  }
}

void leituraEntradasAnalogicas(){
  int E0 = analogRead(32);
  int E1 = analogRead(33);
  int E2 = analogRead(34);
  int E3 = analogRead(35);
  String mensagem = "EA;"+String(E0)+";"+String(E1)+";"+String(E2)+";"+String(E3)+'\n';
  Serial.write(mensagem.c_str());
}

void setup() {
  Serial.begin(115200);
  dac_output_enable(DAC_CHANNEL_1);
  dac_output_enable(DAC_CHANNEL_2);
}

void loop() {
  if(++contadorRotinaChecar > 5){
    checarEscritaAnalogica();
    contadorRotinaChecar = 0;
  }
  if(++contadorRotinaLeitura > 15){
    leituraEntradasAnalogicas();
    contadorRotinaLeitura = 0;
  }
  delay(10);
}
