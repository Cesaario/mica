import serial
import time
from threading import Thread

conexaoSerial = None

def RotinaConexaoSerial():
  global conexaoSerial
  conectado = False
  while not conectado:
    try:
      conexao_serial = serial.Serial("COM7", 115200)
      conectado = conexao_serial.isOpen()
      conexaoSerial = conexao_serial
      print("CONEXÃO SERIAL ESTABELECIDA")
    except Exception as e:
      time.sleep(1)

def EscreverSaida(saida, tipo, valor):
  print("enviando", tipo + ";" + saida + ";" + str(valor))
  conexaoSerial.write((tipo + ";" + saida + ";" + str(valor) + "\n").encode())

rotinaConexao = Thread(target=RotinaConexaoSerial)
rotinaConexao.start()