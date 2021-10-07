import serial
import time
from threading import Thread

conexaoSerial = None

def RotinaConexaoSerial():
  conectado = False
  while not conectado:
    try:
      conexao_serial = serial.Serial("COM7", 115200)
      conectado = conexao_serial.isOpen()
    except Exception as e:
      time.sleep(1)

def EscreverSaida(saida, tipo, valor):
  conexaoSerial.write(tipo + ":" + saida + ":" + valor)


rotinaConexao = Thread(target=RotinaConexaoSerial)
rotinaConexao.start()