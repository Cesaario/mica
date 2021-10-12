# -*- coding: utf-8 -*-
import eventlet
import mica_socket
import mica_simulador
import mica_serial

############################################################### 
#                   DEFINICAO EVENTOS 

@mica_socket.sio.on('valoresIniciais')
def valoresIniciais(sid, NumString, DenString):
	mica_simulador.valoresIniciais(sid, NumString, DenString)
	
@mica_socket.sio.on('calculoODE')
def calculoODE(sid, entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend):
	mica_simulador.calculoODE(sid, entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend)

@mica_socket.sio.on('escreverSaida')
def escreverSaidaSerial(sid, saida, tipo, valor):
	mica_serial.EscreverSaida(saida, tipo, valor)

@mica_socket.sio.on('pedirLeituraEntradas')
def escreverSaidaSerial(sid):
	mica_serial.PedirLeituraDados()

###############################################################

if __name__ == '__main__':
	print('Inicnando...')
	eventlet.wsgi.server(eventlet.listen(('', 2003)), mica_socket.app)