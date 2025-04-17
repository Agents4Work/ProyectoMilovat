"""
API Flask para la generación de códigos QR para visitas.

Este módulo proporciona endpoints para generar códigos QR para las visitas
registradas por los residentes y devolverlos al frontend.
"""

from flask import Flask, request, jsonify, send_file
import os
from datetime import datetime
from qr_generator import generate_qr_code_for_visit, validate_qr_code

# Inicializar la aplicación Flask
app = Flask(__name__)

@app.route('/api/visits/generate-qr', methods=['POST'])
def generate_visit_qr():
    """
    Endpoint para generar un código QR para una visita.
    
    Espera un JSON con la información de la visita.
    Devuelve la URL del QR generado y su representación en base64.
    """
    try:
        # Obtener los datos de la visita del cuerpo de la petición
        visit_data = request.json
        
        # Validar que contenga los campos necesarios
        required_fields = ['visitor_name', 'resident_name', 'apartment', 'visit_date', 'visit_time']
        for field in required_fields:
            if field not in visit_data:
                return jsonify({
                    "success": False,
                    "error": f"Campo requerido faltante: {field}"
                }), 400
        
        # Generar el código QR
        qr_path, qr_base64 = generate_qr_code_for_visit(visit_data)
        
        # Obtener la URL relativa del archivo
        qr_url = f"/api/visits/qr-image/{os.path.basename(qr_path)}"
        
        # Devolver respuesta exitosa
        return jsonify({
            "success": True,
            "qr_url": qr_url,
            "qr_base64": f"data:image/png;base64,{qr_base64}",
            "visit_id": visit_data.get('visit_id')
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/visits/qr-image/<filename>', methods=['GET'])
def get_qr_image(filename):
    """
    Endpoint para obtener una imagen de QR generada previamente.
    
    Args:
        filename: Nombre del archivo QR
    
    Returns:
        Archivo de imagen del QR
    """
    try:
        qr_directory = "static/qr_codes"
        return send_file(os.path.join(qr_directory, filename), mimetype='image/png')
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"No se pudo obtener la imagen: {str(e)}"
        }), 404

@app.route('/api/visits/validate-qr', methods=['POST'])
def validate_visit_qr():
    """
    Endpoint para validar un código QR escaneado.
    
    Espera un JSON con el contenido del QR escaneado.
    Devuelve si el QR es válido y la información de la visita.
    """
    try:
        # Obtener los datos del cuerpo de la petición
        qr_data = request.json.get('qr_data')
        
        if not qr_data:
            return jsonify({
                "success": False,
                "error": "Datos QR no proporcionados"
            }), 400
        
        # Validar el QR
        is_valid, visit_data = validate_qr_code(qr_data)
        
        # Devolver el resultado
        return jsonify({
            "success": True,
            "is_valid": is_valid,
            "visit_data": visit_data
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Ejecutar la aplicación si este archivo es el principal
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))  # Puerto diferente al de la app principal
    app.run(host='0.0.0.0', port=port, debug=True)