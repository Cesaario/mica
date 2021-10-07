#include <driver/dac.h>

void setup() {
  Serial.begin(115200);
  dac_output_enable(DAC_CHANNEL_1);
}

void loop() {
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
