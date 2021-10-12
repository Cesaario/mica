import socketio
import numpy as np

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

@sio.on('connect')
def connect(sid, env):
    print('conectado ', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('desconectado ', sid)