"""
Módulo para generar códigos QR para las visitas registradas por los residentes.

Este script permite crear códigos QR que contienen información de la visita 
y guardarlos como imágenes que pueden ser compartidas con los visitantes.
"""

import qrcode
from PIL import Image, ImageDraw, ImageFont
import json
import os
import base64
from io import BytesIO
from datetime import datetime

# Directorio para guardar los códigos QR generados
QR_DIRECTORY = "static/qr_codes"

def ensure_qr_directory():
    """
    Asegura que el directorio para guardar los códigos QR exista.
    """
    os.makedirs(QR_DIRECTORY, exist_ok=True)

def generate_qr_code_for_visit(visit_data):
    """
    Genera un código QR para una visita.
    
    Args:
        visit_data (dict): Diccionario con la información de la visita:
            - visitor_name: Nombre del visitante
            - resident_name: Nombre del residente
            - apartment: Número de departamento
            - visit_date: Fecha de la visita
            - visit_time: Hora de la visita
            - notes: Notas adicionales (opcional)
            
    Returns:
        tuple: (qr_image_path, qr_base64) Ruta del archivo y representación en base64 del QR
    """
    # Asegurar que el directorio existe
    ensure_qr_directory()
    
    # Generar un identificador único para la visita
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    visit_id = f"{visit_data['apartment'].replace(' ', '')}-{timestamp}"
    
    # Añadir el ID a los datos de la visita
    visit_data['visit_id'] = visit_id
    
    # Convertir los datos a JSON
    qr_data = json.dumps(visit_data)
    
    # Crear el código QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    # Crear la imagen del QR
    qr_img = qr.make_image(fill_color="black", back_color="white")
    
    # Agregar información adicional en la parte inferior de la imagen
    # Crear una imagen más grande para incluir texto
    width, height = qr_img.size
    bottom_text_height = 100  # Altura para el texto
    new_img = Image.new('RGB', (width, height + bottom_text_height), color='white')
    new_img.paste(qr_img, (0, 0))
    
    # Añadir el texto con información de la visita
    draw = ImageDraw.Draw(new_img)
    try:
        # Intentar cargar una fuente, si no está disponible, usar la predeterminada
        font = ImageFont.truetype("arial.ttf", 16)
    except IOError:
        font = ImageFont.load_default()
    
    # Texto a mostrar
    info_text = [
        f"Visitante: {visit_data['visitor_name']}",
        f"Residente: {visit_data['resident_name']}",
        f"Depto: {visit_data['apartment']}",
        f"Fecha: {visit_data['visit_date']} - {visit_data['visit_time']}"
    ]
    
    # Dibujar el texto
    y_position = height + 10
    for line in info_text:
        draw.text((10, y_position), line, fill="black", font=font)
        y_position += 20
    
    # Guardar la imagen
    qr_image_path = os.path.join(QR_DIRECTORY, f"visit_qr_{visit_id}.png")
    new_img.save(qr_image_path)
    
    # Generar representación en base64 para enviar al frontend
    buffered = BytesIO()
    new_img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode()
    
    return qr_image_path, qr_base64

def validate_qr_code(qr_data):
    """
    Valida un código QR escaneado.
    
    Args:
        qr_data (str): Datos del QR escaneado (JSON string)
        
    Returns:
        tuple: (is_valid, visit_data) Booleano indicando si es válido y los datos de la visita
    """
    try:
        # Intentar decodificar el JSON
        visit_data = json.loads(qr_data)
        
        # Verificar que contiene los campos requeridos
        required_fields = ['visit_id', 'visitor_name', 'resident_name', 'apartment', 
                          'visit_date', 'visit_time']
        
        if all(field in visit_data for field in required_fields):
            return True, visit_data
        else:
            return False, {"error": "Datos de visita incompletos en el QR"}
            
    except json.JSONDecodeError:
        return False, {"error": "Formato de QR inválido"}
    except Exception as e:
        return False, {"error": f"Error al validar QR: {str(e)}"}

# Ejemplo de uso:
if __name__ == "__main__":
    # Datos de ejemplo
    visit = {
        "visitor_name": "Juan Pérez",
        "resident_name": "María García",
        "apartment": "5B",
        "visit_date": "2025-04-20",
        "visit_time": "15:30",
        "notes": "Reunión familiar"
    }
    
    # Generar QR
    path, base64_data = generate_qr_code_for_visit(visit)
    print(f"QR generado en: {path}")
    print(f"QR base64 (primeros 50 caracteres): {base64_data[:50]}...")