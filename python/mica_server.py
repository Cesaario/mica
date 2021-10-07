# -*- coding: utf-8 -*-
import eventlet
import mica_socket
import mica_simulador
import mica_serial

####################################################################################
#                            DEFINIÇÃO SERIAL

#ser = serial.Serial("COM6", 115200)

####################################################################################
#                        COMUNICAÇÃO SERIAL
'''
@sio.on('escreverSaida')
def escreverSaida(sid, saida, valor):
	#Monta a string JSON que será enviada pela porta serial.
	data = {
		"tipo" : "dac",
		"pino" : saida,
		"valor" : valor
	}
	#Envia via porta serial os valores a serem escritos no DAC.
	#ser.write((json.dumps(data)+"$").encode())

@sio.on('pedirValorEntrada')
def pedirValorEntrada(sid, entrada):
	pass
	#leitura_dados()

def leitura_dados():
	if(ser.in_waiting > 0):
		a = 1
		#Faz a leitura de uma string JSON da porta serial.
		#leitura = ser.read_until(b'}').decode('ascii')
		#handleData(leitura)
	a = 2

def handleData(leitura):
	obj = json.loads(leitura)
	if(obj['tipo'] == 'adc'):
		#Trata a string JSON
		valorFinal = obj['valor'] / 4095.0
		print(obj['valor'])
		#Envia a leitura do ADC para a interface via socket.
		sio.emit('leituraADC', {'pino':obj['pino'], 'valor':valorFinal})

####################################################################################

'''
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

###############################################################

if __name__ == '__main__':
	print('Inicnando...')
	eventlet.wsgi.server(eventlet.listen(('', 2003)), mica_socket.app)