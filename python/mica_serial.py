import serial
import time
from mica_socket import sio
from threading import Thread
import time

conexaoSerial = None
entradasAnalogicas = []

def RotinaConexaoSerial():
  global conexaoSerial
  conectado = False
  while not conectado:
    try:
      conexao_serial = serial.Serial("COM7", 115200)
      conectado = conexao_serial.isOpen()
      conexaoSerial = conexao_serial
      print("CONEXÃO SERIAL ESTABELECIDA")
      rotinaLeitura.start()
    except Exception as e:
      time.sleep(1)

def RotinaLeituraDados():
  global entradasAnalogicas
  while True:
    if conexaoSerial.in_waiting > 0:
      leitura = conexaoSerial.read_until(b'\n').decode('iso-8859-1').replace("\n", "")
      campos = leitura.split(";")
      if campos[0] == "EA":
        entradasAnalogicas = [float(valor)/4095.0 for valor in campos[1:]]
        print(entradasAnalogicas)
    time.sleep(0.1)

def PedirLeituraDados():
  sio.emit("resultadoLeituraDados", entradasAnalogicas)

def EscreverSaida(saida, tipo, valor):
  print("enviando", tipo + ";" + saida + ";" + str(valor))
  conexaoSerial.write((tipo + ";" + saida + ";" + str(valor) + "\n").encode())

rotinaConexao = Thread(target=RotinaConexaoSerial)
rotinaLeitura = Thread(target=RotinaLeituraDados)
rotinaConexao.start()